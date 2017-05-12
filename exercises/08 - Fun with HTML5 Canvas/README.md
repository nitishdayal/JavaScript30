# Exercise 8: Fun With HTML5 Canvas
Nitish Dayal, Software & Applications Developer - [Contact](http://nitishdayal.me)  
Last Commit Date: May 12, 2017

We're given an HTML page with a `canvas` element in which the user should be able
  to click and drag their mouse to draw. When the user clicks+drags their mouse, 
  they should see a line being drawn out on the canvas that starts from the original
  mouse location and ends where the user released the mouse click. This line should
  be multicolor, and should increase and decrease in width.

## Guide

If you look at the provided answer key and compare it with my solution, you'll see that
  they're quite different even though the results are identical. Why did I approach it
  differently? Quite simply, I just don't like Wes' approach to this particular problem.
  I'm not critiquing his code or whatever, it's really just a matter of preference. I'm
  not big on imperative programming and having to baby my programs through every step.
  Too many `if` statements, too many variable declarations, too much code. **[I'm lazy.
  You should be too.](http://threevirtues.com/)**

My 'lazy' approach is, in my opinion, easier to read and easier to understand. We start
  by defining an _anonymous function_ that will contain the rest of our application logic.
  By doing so, we are creating a _closure_ which allows us to safely execute our code
  without having to worry about polluting the global namespace (`window` object). Within
  the body of the anonymous function, we'll declare: variable references to the 
  `canvas` HTML element and it's context, variables defined as objects storing
  the previous and current positions of the mouse, and two variables defined
  as a numerical and boolean value for the hue and line width, respectively. 
  We will then declare two functions which will be used as _event handlers_; one which
  will draw on the `canvas`, and one which will update the variables referencing the 
  current & previous mouse positions. All that's left now is to attach event handlers 
  to the `canvas` element for the following events: `'mousemove'`, `'mouseup'`, 
  `'mousedown'`, and `'mouseout'`.

**Steps:**

- Variable declarations & definitions:

  1. Declare & define a variable reference to `canvas` HTMLElement with `width` and
    `height` properties reflecting the _inner window size_.
  2. Declare & define a variable reference to the canvas' `context`, and set
    the necessary property values so that lines end and connect smoothly.
  3. Declare two variables which will hold the current and previous mouse location
    coordinates, and define them both as objects containing `x` and `y` properties
    with a value of `0`.
  4. Declare two variables that will be responsible for maintaining the line
  hue (should be a number value between 0 and 360) and line width (a boolean set
  to `true`).

- Event Handler Function Declarations & Event Listeners

  1. Declare a function which will be responsible for drawing on the canvas:

      - Set the `strokeStyle` property of the _canvas context_ to be an `hsl`
        color property. Ex: ```ctx.strokeStyle = `hsl(${hue}, 100%, 50%)` ```;
      - Begin/reset the current path and move the starting point of the path to the
        `x` and `y` properties of the object referencing the _previous mouse location_.
      - Set the end point of the path as the `x` and `y` properties of the object
        referencing the _current mouse location_.
      - Connect and _create the path between the two points_, and then draw it out.
      - Increment the `hue` value until it reaches `360`, at which point reset it
        and start the process again.
      - Increment the line width as long as the value stays between 1 & 100.
  
  2. Declare a function which will be responsible for updating the _previous & current mouse
  coordinates_.

  3. Attach 4 event listeners to the `canvas` object:

      - On a 'mousemove' event, call the function which will update the mouse coordinate values.
      - On a 'mousedown' event, attach ANOTHER event listener to the 'mousemove' event that
        will call the drawing function.
      - On a 'mouseup' event, **REMOVE** the event listener attached in the previous step.
      - On a 'mouseout' event, repeat the previous step

And that's all she wrote. Take a look at the [index.html](./index.html) file which is
  full of comments that line up with these steps if you need additional help. Congrats!
  Over 25% of the challenge is complete!