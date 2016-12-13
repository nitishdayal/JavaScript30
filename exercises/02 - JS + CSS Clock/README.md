# Exercise 2: JS + CSS Clock
Nitish Dayal, Software & Applications Developer - [Contact](http://nitishdayal.me)  
Last Commit Date: Dec 9, 2016

Given an web page with an analog clock created out of CSS, update the CSS
  and write the JavaScript necessary to make the clock functional.

## Guide

The HTML file has 3 `div` elements which correspond with the second, minute, and
  hour hand on a clock. We'll create references to these elements and dynamically
  update certain CSS properties to change their positions so they reflect the
  current time. Easy peasy.

**Steps:**

- CSS:

  1. Set the `transform-origin` CSS property of the `.hand` class at 100%; the default
    value is 50% (or the midway point of the HTML element), but if we leave it there
    the clock hands will tranform from their individal centers as opposed to the
    center of the clock. Changing the value to 100% shifts the _origin point of the
    transformations_ to the furthest x-axis point of the HTML element.
  2. The hands are all laying flat; we need them to be vertical. Rotate all of the
    hands by 90 degrees so that they are upright.
  3. Set the `transition` CSS property of `.hand` to `all 0.05s`; this tells the browser
    to gradually apply any changes to the element's styling over a 0.05 second period.
  4. Set the `transition-timing-function` CSS property of `.hand` to whatever function
    you prefer, or define your own using the `cubic-bezier()` property value.
  
- JavaScript

  1. Declare & define variables for each clock hand and reference the corresponding _HTML
    element_.
  2. Create a function which will be responsible for updating the position of all the
    clock hands.
    - Calculate the necessary rotation using the _current numerical time value_ for each hand 
      and dividing it by the max value possible to get the percentage, multiplying the result
      of that by 360 (each hand can rotate 360 degrees) to get the numerical value for the 
      rotation, and increasing that by another 90 degrees to compensate for the shift
      originally applied by the CSS styling on page load.
  3. Call the function defined in step 2 every second.

Yaaaaaay! All done!
