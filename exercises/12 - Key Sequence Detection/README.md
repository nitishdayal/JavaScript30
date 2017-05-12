# Exercise 12: Key Sequence Detection
Nitish Dayal, Software & Applications Developer - [Contact](http://nitishdayal.me)  
Last Commit Date: May 12, 2017

We're given an HTML document with...basically nothing. There's a `script` tag in the
  document header that loads a JavaScript file from [Cornify.com](https://www.cornify.com)
  which will inject an image of a unicorn (🦄🦄🦄!) into the DOM and a `p` element
  on the bottom of the page if we call `cornify_add()`. The goal of this challenge
  is to generate new unicorns every time the user succesfully enters a 'secret code'
  that we will decide on.

I didn't make this up. Any unicorn-related questions should be directed @[Wes Bos](https://github.com/wesbos).

This one is pretty fun, and a cool little 'easter egg' you could place on your portfolio!
  I would. And I will. 

## Guide

**NOTE:** You guessed it. My solution varies from the official answer key. End result
  is the same, but I will never stop being lazy. :)

Declare a `constant` and define it as your secret code _in string format_. Declare
  another `constant` and define it as _an empty array_. Attach an _event listener_
  to the _window object_ that will listen for the 'keyup' event. We'll define
  the _event handler_ as an **arrow function** which will accept the `event` as
  a parameter. If the key pressed matches a letter in our secret code **AND** 
  was pressed in the correct order, we'll **push** the key pressed into our
  array. If the _array of keys pressed_ matches our secret code, we can
  log out a message in the console, call on the `cornify_add()` function,
  and reset the array to be empty. Done!


**Steps:**

1. Declare a `constant` as an emtpy array, and a `constant` as your secret code:

    ```JavaScript
    const pressedKeys = [], secretCode = 'helloworld'
    ```

2. Attach an _event listener_ to the window that will listen for the 'keyup' event,
  and call upon an _arrow function_ which will accept the `event` as a parameter:

    ```JavaScript
    window.addEventListener('keyup', (e) => { })
    ```

3. In JavaScript, _strings are iterable objects_, meaning we can do a lot of the same things
  with a string that we could do with an array. Try logging out the value of your secret code
  at the _index matching the array's length_ (which should currently be 0). You should get the first
  character of your secret code. Knowing this, we can check to see if the `key` property of the
  event matches our secret code _at the current array's length_. If it does, we'll push that key value
  into our array. Otherwise, empty the array:
    
    ```JavaScript
    /* Inside the body of the arrow function */
    
    // As a ternary operation (can also be done as standard 'if/else' conditional statement)
    secretCode[pressedKeys.length] === e.key ? pressedKeys.push(e.key) : pressedKeys.length = 0;
    
    // If you prefer 'if' statements
    if ( secretCode[pressedKeys.length] === e.key ) {
      pressedKeys.push(e.key)
    } else {
      pressedKeys.length = 0
    }
    ```
    
4. Join the values in the array and compare it with your secret code: if they match, log out
  a statement, call the `cornify_add()` function, and clear out the array:
  
    ```JavaScript
    /* Inside the body of the arrow function */

    if (pressedKeys.join('') === secretCode) {
      console.info('Hello you handsome devil!')
      cornify_add()
      pressedKeys.length = 0
    }
    ```
    
5. Wrap your JavaScript logic in an _IIFE_ (immediately invoked function expression) so as to avoid
  polluting the **global namespace**:
  
    ```JavaScript
    (() => {
    /* All of the previously written code goes inside here */
    })(); /* <-- Call the function immediately (hence, immediately invoked function) */
    ```
  
WOOOOOO UNICORNS! This wasn't too bad. Let's do another one. :) And another, and another, and another...
