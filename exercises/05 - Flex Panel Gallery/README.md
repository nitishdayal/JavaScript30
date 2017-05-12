# Exercise 5: Flex Panel Gallery
Nitish Dayal, Software & Applications Developer - [Contact](http://nitishdayal.me)  
Last Commit Date: May 12, 2017

We are given a web page with five `div` HTML elements with a class `panels`, 
  each containing three `p` HTML elements with some text. These five `div` elements 
  are wrapped inside another `div` element with a class `panel`. Currently, these divs 
  are stacked vertically and aren't interactive. We want to display these divs vertically
  and have only the middle `p` element of each `div` displayed; when a user clicks on a
  particular `div` element we want to expand that element and bring the two other `p`
  elements back into view. Update the CSS and write the JavaScript code necessary
  to bring this interactivity to the page.

Most of this challenge focuses on working with _CSS3 flexible boxes_, or flexbox. If 
  you're unfamiliar with flexible boxes, here's another free course provided by Wes Bos:
  [flexbox.io](http://flexbox.io)

**SIDENOTE:** I broke up the CSS for this challenge into a separate file because that
  made it easier to focus on the pieces that I was working with. Organize your code
  however you see fit.


## Guide

Flex box layouts consist of a _flex container_ which contain _flex items_. 
  We'll use the `panels` class as the _flex container_, and the `panel` class as the
  _flex items_. By default, _flex items_ are only as wide as they need to be in order
  to display their contents, but we want them to take up the entire _flex container_.
  Allow the _flex items_ to take up equal space and fill out the _flex container_
  by allowing them to **grow**. Given that we want the content of each _flex item_
  to be flexible as well, we're going to display the `panel` class as both a _flex item_
  **AND** a _flex container_; this means that elements with the `panel` class will adjust
  themselves with respect to their _flex container_ (`div` HTML element with class `panels`), 
  and the contents within those elements (in this case, the three `p` HTML elements) will 
  adjust themselves with respect to their own _flex container_ (`div` HTML element with 
  class `panels`).

Horizontally and vertically center the content of the `panel` class, and modify the styling
  for any _children_ of the `panel` class (`.panel > *`) so that they are displayed as
  _flex items_ and take up 1/3 of their respective _flex container_. Create new style
  definitions for the first and last child elements of the `panel` class to push them
  off the page and to bring them back in when their parent `panel` is selected, and
  update the CSS for the `panel open` class so that the selected `div` will be 5x
  larger than the other `div` elements. ~~Holy CSS, Batman!~~

Finally, we'll write some JavaScript code to attach _event listeners_ to each `panel`
  element that will fire when an panel is clicked on and call their respective _event
  handlers_; one _event handler_ function will adjust the size of the panel, and the
  other will be responsible for bringing in the `p` elements that we pushed off earlier.

- CSS
  1. Update the styling applied to the `panels` class to display as a _flex container_:

    ```CSS
    .panels {
      /* ... */
      display: flex;
    }
    ```
  2. Update the styling applied to each `panel` so that they equally maximize their
    width to fill out the _flex container_:

    ```CSS
    .panel {
      /* ... */
      flex: 1;
    }
    ```
  3. Update the styling applied to the `panel` class so that each panel is also a _flex
    container_ and displays its content in _columns_:

    ```CSS
    .panel {
      /* ... */
      display: flex;
      flex-direction: column;
    }
    ```
  4. Update the styling applied to the child elements of the `panel` class so they are
    treated as _flex items_ and are center justified:

    ```CSS
    .panel > * {
      /* ... */
      align-items: center;
      display: flex;
      flex: 1 0 auto;
      justify-content: center;
    }
    ```
  5. Create new style definitions for the _first and last child elements_ of the `panel`
  class so that the content is pushed off the main page until the panel is selected by the user:

    ```CSS
    .panel > *:first-child {
      transform: translateY(-100%);
    }

    .panel.open-active > *:first-child {
      transform: translateY(0);
    }

    .panel > *:last-child {
      transform: translateY(100%);
    }

    .panel.open-active > *:last-child {
      transform: translateY(0);
    }
    ```
  6. Update the styling applied to the `panel open` class so that the selected panel takes up
    5x the space of the other _flex items_:
    
    ```CSS
    .panel.open {
      /* ... */
      flex: 5;
    }
    ```
- JavaScript
  1. Declare & define a variable as a reference to _all elements with a class `panels`_.
  2. Iterate through the _HTML Node elements_ that the variable is referencing and attach
    an _event listener_ for the `click` event to each element, providing the name of a 
    yet-to-be-defined function as the _event handler_.
  3. Repeat step 2, this time attaching an _event listener_ for the `transitionend` event
    and providing a different function name for the _event handler_.
  4. Define the function for Step 2 to **toggle** the class `open` on the _function context_.
  5. Define the function for Step 3 to **toggle** the class `open-active` on the _function
    context_ **IF** the event which triggered this function has a property name that
    includes the word 'flex'.

CHALLENGE 5 === DEMOLISHED
