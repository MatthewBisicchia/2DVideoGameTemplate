/**
 * Organizes the information for a Pumpkin, which is a GameObject. It has a sprite that represents its appearance on the game screen
 * as well as x and y coordinates that represent its location on the game screen.
 *
 * @author Matthew Bisicchia
 * @version 5.17.2020
 */
class Pumpkin extends GameObject{

    constructor(currentSprite, x, y)
    {
        super(currentSprite);
        this.x = x;
        this.y = y;
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
}