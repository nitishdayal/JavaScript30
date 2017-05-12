# Exercise 18: Adding Up Times With Reduce
Nitish Dayal, Software & Applications Developer - [Contact](http://nitishdayal.me)  
Last Commit Date: May 12, 2017

The HTML document contains an _unordered list_ with multiple _list items_, each
  with a `data-time` which reflect a time in minutes and seconds. Our goal is to
  take all of these times and calculate the total in hours, minutes, and seconds.

## Guide

Alright friends, this one is fun. We do a lot of stuff with built-in array methods
  that help us handle the heavy lifting of this task. All we're responsible for is
  some light math, and even then we'll have some help from JavaScript operators.
  If you're not comfortable with `Array.prototype.map()`, `Array.prototype.reduce()`,
  or the `remainder (%) operator`, take a minute to look at the Mozilla documentation:

  - [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Map)
  - [Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)
  - [Remainder operator (%)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Remainder_%28%29) _Take note of the difference between this and the `modulo`
  operator!_
   
To tackle this challenge, we'll begin by declaring a `constant` and defining it
  as an _array of HTML Node elements_ with a `data-time` property. Declare another
  `constant` that will be defined as the result of **mapping** over the array
  of node elements twice (the first map will return the _value_ of the `data-time`
  property, and the second will return the `data-time` property after converting it
  to an integer reflecting the time in seconds), and then **reducing** the array
  of integers down to a single integer value reflecting the _total of all times
  in seconds_. Now that we have the total in seconds, we need to declare a `constant`
  that will be defined as the time in **hours**, and another `constant` defined as
  the **remainder** of the seconds in minutes. To get the seconds remaining after
  calculating the hours, we can set a `let` variable as the **remainder** of the
  total seconds divided by the amount of seconds in an hour (3600). We can use this
  remainder to calculate the minutes. Finally, update the value of the `let` variable
  to reflect the seconds remaining after we've calculated the minutes.

WOO! Now that you've got an idea of how we're going to approach this challenge, let's
  get to steppin'!

**Steps:**

  1. Declare a `const` and define as an _array of HTML Node elements_ with a `data-time` property.

    ```JavaScript
    // Option 1. Using the spread operator to convert the NodeList into an array
    const allTimes = [...document.querySelectorAll('[data-time]')]

    // Option 2. Converting the NodeList into an array using the `Array.from()` methods
    const allTimes = Array.from(document.querySelectorAll('[data-time]'))
    ```

2. Declare a `const` and define it as the _return value_ of **mapping** over each item
  in the array TWICE, and **reducing** the result of those maps to a single integer value.

    ```JavaScript
    const seconds = allTimes
        .map(listItem => listItem.dataset.time) // Get the 'data-time' property
        .map(timeValue => {
          /** Declare constants minutes & seconds using array destructuring
            * and define as the result of splitting the 'data-time' property
            * a list item at ':' and parsing the returned two strings
            * as float numbers
            */
          const [minutes, seconds] = timeValue.split(':').map(parseFloat)
          return minutes * 60 + seconds // Return the total seconds
        })
        // Add up all the seconds
        .reduce((runningTotal, seconds) => runningTotal + seconds)
    ```
    
3. Declare a `const` and define it as the seconds converted to hours.

    ```JavaScript
    const hours = Math.floor(seconds / 3600)
    ```

4. Declare a `let` variable and define it as the remaining seconds after 
  calculating hours.

    ```JavaScript
    let secondsLeft = seconds % 3600
    ```

5. Declare a `const` and define it as the remaining seconds converted to minutes.

    ```JavaScript
    const minutes = Math.floor(secondsLeft / 60)
    ```

6. Update the value of the `let` variable to reflect the remaining seconds after
  calculating the minutes.

    ```JavaScript
    secondsLeft %= 60
    ```

7. Log out the values.

    ```JavaScript
    console.log(`Total video time: ${hours} hours, ${minutes} minutes, and ${secondsLeft} seconds`)
    ```
If your result is 4 hours, 58 minutes, and 58 seconds, you did it! WOOOOOO! Learning
  how to effectively use these array methods can greatly increase the clarity of your code
  and simplify your workflow. Learn them well!
