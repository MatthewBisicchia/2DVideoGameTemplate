/**
 * Organizes the information for a player that exists during the game's runtime, who has x and y coordinates
 * on the game screen and a sprite as its appearance on the game screen.
 *
 * @author Matthew Bisicchia
 * @version 5.17.2020
 */
class Player extends GameObject {

    constructor(currentSprite)
    {
        super(currentSprite);
        this.x = 100;
        this.y = 100;
        this.numberOfCollectedPumpkins = 0;
    }

    setX(x)
    {
        this.x = x;
    }

    getX()
    {
        return this.x;
    }

    setY(y)
    {
        this.y = y;
    }

    getY()
    {
        return this.y;
    }

    pickUpPumpkin()
    {
        ++this.numberOfCollectedPumpkins;
    }

    getNumberOfCollectedPumpkins()
    {
        return this.numberOfCollectedPumpkins;
    }


}