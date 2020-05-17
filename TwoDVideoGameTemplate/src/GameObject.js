class GameObject {

    constructor(currentSprite) {
        this.currentSprite = currentSprite;
    }

    getCurrentSprite() {

        return this.currentSprite;
    }

    setCurrentSprite(newSprite)
    {
        this.currentSprite = newSprite;
    }
}