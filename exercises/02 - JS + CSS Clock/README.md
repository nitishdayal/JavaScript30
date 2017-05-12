# Exercise 2: JS + CSS Clock

> Nitish Dayal, Software & Applications Developer - [Contact](http://nitishdayal.me)  
> Last Commit Date: May 12, 2017

Given a web page with an analog clock created with CSS, write the
  JavaScript necessary to make the clock functional. Make alterations to the CSS
  as necessary.

## Guide

The HTML file has 3 `div` elements which correspond with the second, minute, and
    hour hand on a clock

```html
<!-- ...previous elements -->
    <div class="hand hour-hand"></div>
    <div class="hand min-hand"></div>
    <div class="hand second-hand"></div>
<!-- next elements... -->
```

The necessary JavaScript code shouldn't be too crazy;
    we'll create references to these elements and dynamically
    update certain CSS properties to change their positions so they reflect the
    current time. Easy peasy.

**Steps:**

- **CSS**:

    1. The hands are all laying flat; we need them to be vertical. Rotate all of the
        hands by 90 degrees so that they are upright by giving the `.hand` class a
        `transform` rule with the value `rotate(90deg)`.

    1. Set the `transform-origin` CSS property of the `.hand` class to `100%`; the default
        value is `50%` (or the midway point of the HTML element), but if we leave it there
        the clock hands will transform from the respective centers of their lines as opposed to the
        center of the clock. (If that doesn't make sense, try it out in your code. Set the value for
        `transform-origin` rule completely and check again. Finally, try it again with `50%`.).
        Changing the value to 100% shifts the _point of origin for the transformation_
        to the furthest point on the x-axis of the HTML element.

    1. Set the `transition` CSS property of `.hand` to `all 0.05s`; this tells the browser
        to gradually apply any changes to the element's styling over a 0.05 second period.

    1. Set the `transition-timing-function` CSS property of `.hand` to whatever function
        you prefer, or define your own using the `cubic-bezier()` property value.

- **JavaScript**:

    1. Declare & define variables for each clock hand and reference the corresponding _HTML
        element_.

        EX: `const secondHand = document.querySelector('.second-hand');`

    1. Create a function which will be responsible for calculating the number of degrees that we need
        to rotate each clock hand by. It should accept two arguments: the _current numerical value_ of the
        clock hand, and the max value possible of the clock hand (if you want the number of degrees needed for
        the second hand and the current time is 03:15:18, you would pass in (18, 60) where 18 is the current
        value of the second hand, and 60 is the maximum possible value).

        - Divide the current numerical value of the clock hand by it's max possible value to get the rotation as
        a percentage, then multiply the result of that by 360 (each hand can rotate 360 degrees) to convert
        the value from a percentage to an integer, and increase that result by another 90 degrees to compensate
        for the shift originally applied by the CSS styling on page load.

            ```javascript
            const calcDegrees = (time, max) => ((time / max) * 360) + 90;
            ```

    1. Create a function that will automatically run every second; in the body of the function,
        create a variable and define it as a new Date object. Then, create three variables which will
        hold references to the rotation amount to be applied to each clock hand. To get the rotation amount,
        define the variables as the return value from calling the `calcDegrees` function; each call should
        pass in the correct values in relation to whichever clock hand they are supposed to represent.

    1. Still within the body of the function from step 3, update the `transform` rule for each
        clock hand to their corresponding updated values.

        ```javascript
            /* Steps 3 & 4 */

            // Call function once every second
            setInterval(() => {
            // Create new Date object
            const now = new Date();
            // Get current seconds, minutes, & hours and calculate the degree shift
            const
                secondHandDegrees = calcDegrees(now.getSeconds(), 60),
                minuteHandDegrees = calcDegrees(now.getMinutes(), 60),
                hourHandDegrees = calcDegrees(now.getHours(), 12);
            // Apply rotation to the clock hands corresponding with current time value
            secondHand.style.transform = `rotate(${secondHandDegrees}deg)`;
            minuteHand.style.transform = `rotate(${minuteHandDegrees}deg)`;
            hourHand.style.transform = `rotate(${hourHandDegrees}deg)`;
            }, 1000); // 1000ms === 1s

        ```

Yaaaaaay! All done!
