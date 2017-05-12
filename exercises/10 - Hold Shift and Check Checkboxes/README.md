# Exercise 10: Hold Shift and Check Checkboxes
Nitish Dayal, Software & Applications Developer - [Contact](http://nitishdayal.me)  
Last Commit Date: May 12, 2017

We're given an HTML page that displays a collection of `input` HTML elements
  of type `checkbox`, each followed by a `p` HTML element that will have it's
  text contents striked through when an input is checked. Write the necessary
  JavaScript code to allow a user to select **multiple** items while holding down
  the shift key.

## Guide

The answer key provided is flawed; open it up, hold down shift, and select the first
  item. **All** of the inputs become checked off! That's not good. So, once again,
  my answer & this guide will solve this challenge in a way that differs from the
  provided solution. Following this guide will allow the user to select OR unselect
  multiple items from the list while holding the shift key.

Number each of the `input` elements by giving them an `id` property that starts
  at 0 and increments by 1. Declare a `const` and define it as a _reference to all 
  input elements that are children of the `.inbox` class_. Declare a `let` variable
  that will reference the _last input item that was selected_ (for now, we will just
  declare the variable, and we'll define it at a later point). Iterate through the 
  **NodeList** (current value of the `const` we just declared) and attach an 
  _event listener_ to each checkbox that will call upon a yet-to-be-defined _event handler_ 
  function on a 'click' event. 
  
The _event handler_ function will check to see if the 'shift' key was held down for this 
  event, and if there is a previously selected checkbox. If both conditions are **true**, 
  we'll set the `checked` property of the _function context_ (the target, or `this` 
  argument, of the function) to reflect the `checked` property of the _last selected input_.
  Then we'll declare another `const` and define it as _an array from derived from the 
  NodeList item_ that contains the `input` elements **BETWEEN** the `input` that is the
  _function context_ and the previously selected `input`. Iterate through this array and 
  set the `checked` property of every array element to match the `checked` property of
  the _function context_. Finally, we'll define the `let` variable responsible for referencing
  the last selected `input` as the _function context_ (`this`).

**Steps:**

- HTML

  1. Number each `input` element by giving them an `id` property, starting at 0.
      
        ```html
        <input type="checkbox" id="0">
        ...
        <input type="checkbox" id="1">
        ...
        <input type="checkbox" id="2">
        ```

- JavaScript

  1. Declare an _immediately invoked anonymous function_ that will contain the rest
    of the JavaScript code, so as to avoid polluting the **global namespace**.


  2. Declare & define a `const` variable as a reference to every `input` element
    that is a child of the `inbox` class.  
      ```JavaScript
        const checkBoxes = document.querySelectorAll('.inbox input[type="checkbox"]');
      ```

  3. Declare a `let` variable that will be defined later as the _last `input` that was selected_.  
  
        ```JavaScript
          let lastSelected;
        ```

  4. Iterate through the **NodeList** and add an _event listener_ to each element that will
    call upon a yet-to-be-defined _event handler_ function on a click event.

      ```JavaScript
      // The name of the function to be used as the event handler is your choice.
      checkBoxes.forEach(
        // In this example, the event handler function is called 'multiChecker'
        checkbox => checkbox.addEventListener('click', multiChecker)
      );
      ```

  5. Declare the _event handler_ function and allow it accept one parameter, the event:
       
       - Check **if** the `let` variable declared in step 2 has been defined & the `shift` key
        was pressed when this event occured.
      
      - In the _body of the conditional statement_, set the `checked` property of the
        _function context_ to be the `checked` property of the _last `input` that was selected_.

          ```JavaScript
          if (lastSelected && e.shiftKey) {
            this.checked = lastSelected.checked;
            /* ... */
          }
          ```
      
      - Declare two `let` variables that will be used at a later point to
        _slice_ away all the `input` elements that aren't between the _last
        selected `input`_ and the `input` element that is the _function context_.

          ```JavaScript
          /* Still in the body of the conditional statement */
          // We can declare multiple variables in one go by separating them with commas
          let startIdx, endIdx;
          ```

      - If the `ID` property of the _function context_ is greater than the `ID` property
        of the last selected `input`, set the first `let` variable as the `ID` property
        of the _last selected `input` and set the second `let variable` as the `ID` property
        of the `input` that is the function context_. Otherwise, flip 'em!

          ```JavaScript
          /* Still in the body of the conditional statement */

          /* There are a few ways to handle this requirement. I've provided examples
           * that showcase using ternary operators + destructuring assignments, and
           * using a standard conditional operator + variable assignments.
           */

          // Using a ternary operator & destructuring assignment
          this.id > lastSelected.id ? [startIdx, endIdx] = [lastSelected.id, this.id] : [startIdx, endIdx] = [this.id, lastSelected.id];

          // Using standard conditional operators
          if (this.id > lastSelected.id) {
            startIdx = lastSelected.id;
            endIdx = this.id;
          } else {
            startIdx = this.id;
            endIdx = lastSelected.id;
          }
          ```

      - Declare a `const` variable & define it as an array created from the NodeList
        that only contains the `input` elements **between** the _function context_ and the
        _last selected `input`_.

          ```JavaScript
          /* Still in the body of the conditional statement */

          /** In order to remove all the 'input' elements aside from the ones in between
            * the function context and the last selected input, we'll use the `slice`
            * method. `slice` takes two arguments: the index that we want to slice our
            * array from, and the index where we want to cut off this new sliced portion.
            * I incremented the first argument by 1 because the input element associated
            * with the original value of startIdx has already been accounted for (it's either
            * 'this` or 'lastSelected', and we only want the inputs between those two).
            **/
          const middleInputs = Array.from(checkBoxes).slice(parseInt(startIdx) + 1, endIdx);
          ```

      - Iterate through the newly created array of elements and set the `checked` property
        of each element to match the `checked` property of the _function context_.

          ```JavaScript
          /* Still in the body of the conditional statement */

          // By setting the 'checked' property to match the function context, we're
          // able to allow users to check OR uncheck multiple items from the list. WOOOO!
          middleInputs.forEach(checkbox => checkbox.checked = this.checked);
          ```
      - After the conditional statement, define `lastSelected` as the _function context_
        so that when this _event handler_ is called again on a NEW `input` element,
        we can use `lastSelected`'s ID property to figure out what inputs are between the
        two that need to be checked/unchecked.

        ```JavaScript
        if (lastSelected && e.shiftKey){
          /* Body of conditional statement */
        }

        // After the conditional statement
        lastSelected = this;
        ```

DONE. Slightly verbose explanation, but I felt it was necessary given that this approach
  is quite different from the provided answer. Congratulations on complete 1/3rd of the
  JavaScript30 challenge! You're a champ. 💪💪
