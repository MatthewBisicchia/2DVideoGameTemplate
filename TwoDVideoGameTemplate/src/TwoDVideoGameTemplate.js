class TwoDVideoGameTemplate
{
    textArea;
    textNode;

    constructor(music, playerSpriteSheet, playerSpriteData, groundSprite, pumpkinSprite)
    {
        //the game's resources (which are pre loaded in the game engine):
        this.music = music;
        this.playerSpriteSheet = playerSpriteSheet;
        this.playerSpriteData = playerSpriteData;
        this.playerSprites = [];
        this.loadPlayerSprites();
        this.groundSprite = groundSprite;
        this.pumpkinSprite = pumpkinSprite;



        //The game objects in this game:
        this.gameObjects = [];

        //Creation of the game objects in this game:
        this.player = new Player(this.playerSprites[0]);
        this.gameObjects.push(this.player);
        this.generatePumpkins();

        this.createUI();

    }

    loadPlayerSprites()
    {
        //get individual sprites from the sprite sheet and load it into the animation array:
        let frames = this.playerSpriteData.frames;
        for(let i = 0; i < frames.length; i++)
        {
            let pos = frames[i].position;
            let img = this.playerSpriteSheet.get(pos.x, pos.y, pos.w, pos.h);
            this.playerSprites.push(img);
        }
    }

    generatePumpkins()
    {
        for(let i = 0; i < 7; i++)
        {
            this.gameObjects.push(new Pumpkin(this.pumpkinSprite, this.generateRandomInRange(0, 1200), this.generateRandomInRange(0, 500)));
        }
    }

    createUI()
    {
        this.textArea  = document.createElement("TEXTAREA");
        this.textNode = document.createTextNode("Pumpkins Collected:");
        this.textArea.appendChild(this.textNode);
        document.body.appendChild(this.textArea);
    }

    updateUI()
    {
        this.textArea.value = this.player.getNumberOfCollectedPumpkins().toString();
    }

    generateRandomInRange(min, max)
    {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    alertPlayerProximityToGameObject(gameObject)
    {
        if(gameObject instanceof Pumpkin) {
            this.player.pickUpPumpkin();
            let indexOfPumpkin = this.gameObjects.indexOf(gameObject);
            this.gameObjects.splice(indexOfPumpkin, 1)
        }
    }


    //getters (allow for the GameEngine to access all of this data and do stuff with it):
    getMusic()
    {
        return this.music;
    }

    getGameObjects()
    {
        return this.gameObjects;
    }

    getGroundSprite()
    {
        return this.groundSprite;
    }

    getPlayer()
    {
        return this.player;
    }

    getPlayerSprites()
    {
        return this.playerSprites;
    }

    operationsToCallThroughOutProgram()
    {
        this.updateUI();
    }
}
