/**
 * This file acts as the engine for the game (setting up of the screen, rendering and ticking objects).
 * This is meant to be completely abstracted from the game's logic, story, style, etc.
 * This is just the technical set up.
 * The abstraction away from the game itself is meant so that this engine can be used for other
 * games that can be created in the future.
 *
 * @author Matthew Bisicchia
 * @version 5.17.2020
 */


let game;
let started;
let clock = 0;
let otherFrameTime = true;
let restPosition = "down";


/**
 * The game assets. This is the only place (except for the instantiation of the specific game object) that is
 * not abstracted from the details of the game, because all resources should always be pre loaded
 * in this preload function.
 */

let playerSpriteSheet;
let playerSpriteData;
let groundSprite;
let pumpkinSprite;

/**
 * Preloads the game assets.
 */
function preload()
{

    playerSpriteSheet = loadImage('assets/imagery/playerSpriteSheet.png');
    playerSpriteData = loadJSON('assets/imagery/playerSprite.json');
    groundSprite = loadImage('assets/imagery/groundDark.png');
    pumpkinSprite = loadImage('assets/imagery/pumpkinNew.png');

}


/**
 * Sets up the game screen.
 */
function setup()
{
    createCanvas(1270, 550);
    frameRate(100);
}

/**
 * The "main method" of the program; the method that the HTML file invokes to start the game at the HTML button press.
 */
function start()
{
    game = new TwoDVideoGameTemplate(playerSpriteSheet, playerSpriteData, groundSprite, pumpkinSprite);
    started = true;
}

/**
 * The following acts as the game engine. Does not begin unless allowed to start (user pressing play game button).
 */
function draw()
{

    clock = (clock + 1) % 15;
    //toggle otherFrameTime, in order to allow the other frame in walking animation to render at the appropriate time:
    if(clock == 0) {
        otherFrameTime = !otherFrameTime;
    }

    if(started) {
        game.operationsToCallThroughOutProgram();
        drawBackground();
        drawGameObjects();
        controls();
    }
}

/**
 * Fills the background of the canvas with this game's ground sprite:
 */
function drawBackground()
{
    //drawing grass:

    let x = 0;
    let y = 0;

    for (y = 0; y < 550; y += 120)
    {
        x = 0;

        while (x < 1270)
        {
            image(game.getGroundSprite(), x, y);

            x += 120;
        }
    }

}

/**
 * Draws the objects in this game; to be called constantly, so that when the game logic (which is completely
 * separated from this engine) impacts the objects, the objects will be rendered accordingly.
 */
function drawGameObjects() {

    game.getGameObjects().forEach(draw);

    function draw(gameObject)
    {
        //we're looping through all the gameObjects (do this in only this one location in the entire program)
        //so let's alert the Game that is currently being run if the player of the game is close to one of the game objects.
        if(Math.abs(gameObject.getX() - game.getPlayer().getX()) < 30  && Math.abs(gameObject.getY() - game.getPlayer().getY()) < 30) {
            //player is close to a gameObject; send this information back to the Game
            game.alertPlayerProximityToGameObject(gameObject);
        }
        image(gameObject.getCurrentSprite(), gameObject.getX(), gameObject.getY());
    }

}

/**
 * Defines the key controls that dictate the player's movement.
 */
function controls()
{


    if (keyIsDown(LEFT_ARROW)) {
        if (otherFrameTime) {
            game.getPlayer().setX(game.getPlayer().getX() - 5);
            game.getPlayer().setCurrentSprite(game.getPlayerSprites()[11]);
        } else {
            game.getPlayer().setX(game.getPlayer().getX() - 5);
            game.getPlayer().setCurrentSprite(game.getPlayerSprites()[9]);
        }

        restPosition = "left";

    } else if (keyIsDown(RIGHT_ARROW)) {
        if (otherFrameTime) {
            game.getPlayer().setX(game.getPlayer().getX() + 5);
            game.getPlayer().setCurrentSprite(game.getPlayerSprites()[12]);
        } else {
            game.getPlayer().setX(game.getPlayer().getX() + 5);
            game.getPlayer().setCurrentSprite(game.getPlayerSprites()[14]);
        }

        restPosition = "right";

    } else if (keyIsDown(UP_ARROW)) {
        if (otherFrameTime) {
            game.getPlayer().setY(game.getPlayer().getY() - 5);
            game.getPlayer().setCurrentSprite(game.getPlayerSprites()[5]);
        } else {
            game.getPlayer().setY(game.getPlayer().getY() - 5);
            game.getPlayer().setCurrentSprite(game.getPlayerSprites()[7]);
        }

        restPosition = "up";

    } else if (keyIsDown(DOWN_ARROW)) {
        if (otherFrameTime) {
            game.getPlayer().setY(game.getPlayer().getY() + 5);
            game.getPlayer().setCurrentSprite(game.getPlayerSprites()[1]);
        } else {
            game.getPlayer().setY(game.getPlayer().getY() + 5);
            game.getPlayer().setCurrentSprite(game.getPlayerSprites()[3]);
        }

        restPosition = "down";
    } else {
        switch (restPosition) {

            case "down":
                game.getPlayer().setCurrentSprite(game.getPlayerSprites()[0]);
                break;
            case "up":
                game.getPlayer().setCurrentSprite(game.getPlayerSprites()[4]);
                break;
            case "right":
                game.getPlayer().setCurrentSprite(game.getPlayerSprites()[15]);
                break;
            case "left":
                game.getPlayer().setCurrentSprite(game.getPlayerSprites()[8]);
                break;
        }


    }

}

