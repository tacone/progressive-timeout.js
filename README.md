progressive-timeout.js
======================

Will execute a callback with a (factor) increasing delay

## example 1

to automatically log to the console every 50 to 4000ms, with an increment of 2x

```js
var t = new ProgressiveTimeout(function(){ console.log(':)') }, 50, 4000,2);
t.start();
//.....
t.stop(); //will stop looping;
t.start(); //will start again with a delay of 50ms, then 100ms, ..
//....
t.start(); //will execute immediately and then resume from 50ms delay
```

## example 2

to manually call each iteration:
```js
var t = new ProgressiveTimeout(function(){ console.log(':)') }, 50, 4000,2);
t.next(); //will execute immediately
t.next(); //will wait 50ms and then execute
t.next(); //will wait 100ms and then execute
t.reset();
t.next(); //will execute immediately
t.next(); //will wait 50ms and then execute
```
