# Exercise 12: Key Sequence Detection
Nitish Dayal, Software & Applications Developer - [Contact](http://nitishdayal.me)  
Last Commit Date: Dec 18, 2016

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
