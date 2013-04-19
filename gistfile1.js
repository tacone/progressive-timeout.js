
/**
 * Will execute the callback with a (factor) increasing delay
 * @param function callback
 * @param integer min
 * @param integer max
 * @param float incrementFactor
 * @returns {ProgressiveTimeout}
 */

var ProgressiveTimeout = function(callback, min, max, incrementFactor)
{
    this.callback = callback;
    this.min = min;
    this.currentDelay = 0;
    this.max = max;
    this.incrementFactor = incrementFactor;
    this.timeout = null;

    var self = this;
    /**
     * Starts looping automatically
     * @returns {ProgressiveTimeout}
     */
    this.start = function()
    {
        this.reset();
        this.next(true);
        return this;
    }
    /**
     * resets timeout to 0 (immediate)
     * @returns {ProgressiveTimeout}
     */
    this.reset = function()
    {
        this.currentDelay = 0;
        return this;
    }
    /**
     * Calls the callback, then augments the delay for the next execution.
     * @param {type} pleaseLoop if TRUE after executing a new execution will be 
     *                          scheduled
     * @returns {ProgressiveTimeout}
     */
    this.next = function(pleaseLoop)
    {
        this.stop();
        var execute = function() {
            self.callback();
            self.delay();
            if (pleaseLoop) self.next(true);
        }
        this.timeout = setTimeout(execute, self.currentDelay ? self.currentDelay : 0);
        return this;
    }
    /**
     * Augments the delay by the user set factor
     * @returns {ProgressiveTimeout}
     */
    this.delay = function()
    {
        if (this.currentDelay) this.currentDelay = this.currentDelay * this.incrementFactor;
        if (!this.currentDelay || this.currentDelay < this.min) this.currentDelay = this.min;
        if (this.currentDelay > this.max) this.currentDelay = max;
        return this;
    }
    /**
     * Stops current timeout execution (and auto-looping)
     * @returns {ProgressiveTimeout}
     */
    this.stop = function()
    {
        this.timeout && clearTimeout(this.timeout);
        return this;
    }

    return this;
}