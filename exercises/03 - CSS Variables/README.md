# Exercise 3: CSS Variables
Nitish Dayal, Software & Applications Developer - [Contact](http://nitishdayal.me)  
Last Commit Date: Dec 10, 2016

The web page provided in this exercise displays an image, and has 3 form inputs
  from which the user can manipulate the padding, blur amount, and background
  color of the image. Update the CSS and write the JavaScript code necessary to 
  bring functionality to the inputs.

## Guide

The purpose of this exercise is to gain experience using _CSS3 variables_. These are
  **different** from Sass-style variables; Sass variables are defined in the Sass file,
  but once compiled to CSS the values cannot be updated. _CSS3 variables_ can have
  their values updated through the use of JavaScript. The `input` _HTML elements_
  have a `name` property that corresponds with the CSS properties we want to update.
  We can create _CSS3 variable references_ and attach them to the root element, provide
  them with some default values, and utilize JavaScript to attach _event listeners_
  to the `input` _HTML elements_ that will call upon an _event handler_ function
  whenever the input values have been changed by the user. We will define the function
  to target the _entire document_ and update the values of the CSS variables
  from there.

**Steps:**

- CSS:
  1. Declare a new style for the `:root` element and declare three variables inside
    the style definition for `:root` with the same names as the `input` _HTML elements_.
    _CSS3 variables_ are declared in the following syntax format:
      ```CSS
      /* Two hyphens (--) followed by the variable name */

      :root {
        --base: #ffc600;
        --blur: 10px;
        --padding: 10px;
      }
      ```
  2. Declare a new style for the `img` element and set the `background`, `filter`, and
    `padding` properties to the variables we defined at the root element:
      ```CSS
      /* 'var(--variableName)' to use previously defined CSS properties */

      img {
        background: var(--base);
        filter: blur(var(--blur));
        padding: var(--padding);
      }
      ```
  3. Declare a new style for the `.hl` class and set the color to the `base` variable.

- JavaScript:
  1. Declare & define a variable as a reference to all of the inputs on the page.
  2. Iterate through the _HTML Node Elements_ that the variable is referencing and 
    attach _event listeners_ to all of them that will call on an _event handler_ whenever
    the input value has been changed.
  3. Repeat step 2, listening for mouse movements on the inputs instead of value
    changes.
  4. Define a function that will be used as the _event handler_. This will update
    the value of the _CSS3 variable_ **at the document level** corresponding with the 
    `input` element's `name` property which triggered the event handler.
    - Minor 'gotcha': Properties like `padding` and `blur` won't update because
      the value from the input does not include the type of measurement we are using
      ('px', 'em', etc.). The `input` _HTML elements_ also have a `data-*` property if 
      they require a suffix. We can use this to attach the correct suffix to the
      value if necessary.

Wooooooo! Finished yaaaaay!
