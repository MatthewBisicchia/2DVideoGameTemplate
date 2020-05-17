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