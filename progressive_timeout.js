/**
 * Will execute the callback with a (factor) increasing delay
 *
 * example (will automatically log to the console every 50 to 4000ms, with an increment of 2x:  
 * <pre>
 * var t = new ProgressiveTimeout(function(){ console.log(':)') }, 50, 4000,2);
 * t.start(); 
 * //.....
 * t.stop(); //will stop looping;
 * t.start(); //will start again with a delay of 50ms, then 100ms, ..
 * //....
 * t.start(); //will execute immediately and then resume from 50ms delay
 * </pre>
 * 
 * example2 (manual cycling)
 * <pre>
 * var t = new ProgressiveTimeout(function(){ console.log(':)') }, 50, 4000,2);
 * t.next(); //will execute immediately
 * t.next(); //will wait 50ms and then execute
 * t.next(); //will wait 100ms and then execute
 * t.reset();
 * t.next(); //will execute immediately
 * t.next(); //will wait 50ms and then execute
 * //...
 * <pre>
 * 
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