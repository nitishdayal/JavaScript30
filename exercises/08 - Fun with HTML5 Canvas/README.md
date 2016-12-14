# Exercise 8: Fun With HTML5 Canvas
Nitish Dayal, Software & Applications Developer - [Contact](http://nitishdayal.me)  
Last Commit Date: Dec 14, 2016

We're given an HTML page with a `canvas` element in which the user should be able
  to click and drag their mouse to draw. When the user clicks+drags their mouse, 
  they should see a line being drawn out on the canvas that starts from the original
  mouse location and ends where the user released the mouse click. This line should
  be multicolor, and should increase and decrease in width.

## Guide

If you look at the provided answer key and compare it with my solution, you'll see that
  they're quite different even though the results are identical. Why did I approach it
  differently? Quite simply, I just don't like Wes' approach to this particular problem.
  Too many `if` statements, too many variable declarations, too much code. **[I'm lazy.
  You should be too.](http://threevirtues.com/)**

My 'lazy' approach is, in my opinion, easier to read and easier to understand. We start
  by defining an _anonymous function_ that will contain the rest of our application logic.
  By doing so, we are creating a _closure_ which allows us to safely execute our code
  without having to worry about polluting the global namespace (`window` object). Within
  the body of the anonymous function, we'll declare: variable references to the 
  `canvas` HTML element and it's context, variables defined as objects storing
  the previous and current positions of the mouse, and two variables defined
  as a numerical and boolean value, respectively. We will then declare two functions
  which will be used as _event handlers_; one which will draw on the `canvas`, and one
  which will update the variables referencing the current & previous mouse positions.
  All that's left now is to attach event handlers to the `canvas` element for the
  following events: `'mousemove'`, `'mouseup'`, `'mousedown'`, and `'mouseout'`.

**Steps:**

TODO