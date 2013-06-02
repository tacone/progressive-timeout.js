/**
 * @author tacone
 * @license MIT
 * 
 * Please read the DOCS at https://github.com/tacone/progressive-timeout.js/blob/master/README.md
 * 
 * This file comes as it is, it could screw up your business or life, I shall not held responsible of anything.
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
        if (this.currentDelay > this.max) this.currentDelay = this.max;
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
