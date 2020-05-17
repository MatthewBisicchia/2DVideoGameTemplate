/**
 * Organizes the information for the 2D Video game template.
 *
 * @author Matthew Bisicchia
 * @version 5.17.2020
 */
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

    /**
     * Creates the array of sprites- the frames- for the player of the game that will be used by the Game Engine when rendering.
     */
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

    /**
     * For the rather crude example of the player collecting pumpkins: this method instantiates the pumpkins of the game.
     */
    generatePumpkins()
    {
        for(let i = 0; i < 7; i++)
        {
            this.gameObjects.push(new Pumpkin(this.pumpkinSprite, this.generateRandomInRange(0, 1200), this.generateRandomInRange(0, 500)));
        }
    }

    /**
     * Also for the rather crude example of the player collecting pumpkins: this method creates the basic UI to track the number of pumpkins collected by the player.
     */
    createUI()
    {
        this.textArea  = document.createElement("TEXTAREA");
        this.textNode = document.createTextNode("Pumpkins Collected:");
        this.textArea.appendChild(this.textNode);
        document.body.appendChild(this.textArea);
    }

    /**
     * Also for the rather crude example of the player collecting pumpkins: this method updates the basic UI to track the number of pumpkins collected by the player.
     */
    updateUI()
    {
        this.textArea.value = this.player.getNumberOfCollectedPumpkins().toString();
    }

    /**
     * Utility method to randomly generate an integer in a specified range.
     *
     * @param min The minimum value of the range
     * @param max The maximum value of the range
     *
     * @return A random integer in the specified range.
     */
    generateRandomInRange(min, max)
    {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    /**
     * In the main game loop of the Game Engine, when a developer-specified object is accessed and its coordinates are close to those of the player, this method can be invoked in order to alert this game that the
     * object is close to the player. Operations inside of this method dictate what might happen based on what type of object it is.
     *
     * For example, for the rathr crude example of the player colleclting pumpkins, if the object is of type pumpkin, then the playr will "pick up" the pumpkin and the necessary operations of the pumpkin disappearing
     * and the player's count of pumpkins increasing by 1 can occur.
     *
     * @param gameObject The developer-specifid object thta is accessed by the Game Engine and is found at coordinates close to those of the player.
     */
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

    /**
     * This method is invoked by the GameEngine by the draw() method that constantly loops throughout the game. Therefore, this method will also be constantly called throughout the game, and any operations
     * that need to be called constantly can be included here.
     */
    operationsToCallThroughOutProgram()
    {
        this.updateUI();
    }
}
