/**
 * Organizes the information for an object that exists during the game's runtime, which has a sprite as its appearance on the game screen.
 *
 * @author Matthew Bisicchia
 * @version 5.17.2020
 */
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