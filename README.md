progressive-timeout.js
======================

Will execute a callback with a (factor) increasing delay

## Auto looping

The passed callback will be automatically called every 50ms to 4000ms, with an increment of 2x each iteration

```js
var t = new ProgressiveTimeout(function(){ console.log(':)') }, 50, 4000,2);
t.start();
//.....
t.stop(); //will stop looping;
t.start(); //will start again with a delay of 50ms, then 100ms, ..
//....
t.start(); //will execute immediately and then resume from 50ms delay
```

## Manual loop

You can also programmatically invoke the callback, which will be executed after progressively increasing delay.

```js
var t = new ProgressiveTimeout(function(){ console.log(':)') }, 50, 4000,2);
t.next(); //will execute immediately
t.next(); //will wait 50ms and then execute
t.next(); //will wait 100ms and then execute
t.reset();
t.next(); //will execute immediately
t.next(); //will wait 50ms and then execute
```

This kind of looping is handy with ajax calls, as it will wait for the response from the server before 
starting the next iteration (thus somewhat adapting to the server load).

jQuery example:

```javascript
var t = new ProgressiveTimeout(function(){ console.log(':)') }, 50, 4000,2);
$.get('/get-me-a-sandwich.php').done(function(data){
    // .. do something with the data
    t.next();
});

```
