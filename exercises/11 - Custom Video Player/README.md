# Exercise 11: Custom Video Player
Nitish Dayal, Software & Applications Developer - [Contact](http://nitishdayal.me)  
Last Commit Date: May 12, 2017

When the HTML page is loaded in a browser, it displays a video player with controls
  for playing/pausing the video, scrolling through the video progress, skipping/
  rewinding, changing the volume, and adjusting the playback speed. None of these controls
  currently work. Write the necessary JavaScript code to bring functionality to this page.

## Guide

**NOTE:** While my answer probably appears **significantly** different from the official answer key, it's
  really not. The changes worth noting are how I assigned event handlers to the skip buttons and
  the volume & playback speed sliders; I defined arrow functions as _event handlers_ directly within
  the `.addEventListener()` method as opposed to writing a _function expression_ and passing in the name
  of that function to be the _event handler_. Everything else is basically the same, just using ES6
  where possible and avoiding repetition of writing `const` or `let` because, once again, I'm lazy
  (and, once again, [you should be too](http://threevirtues.com/)).

We begin by declaring _constants_ and defining them as references to the HTML elements we want to
  add some functionality to: the player, the video, the current video progress & progress bar, the
  play/pause button, the skip & rewind buttons, and the volume & playback speed sliders. Then, we define
  our _event handler_ functions: one for toggling video playback/pause, one for updating the play/pause
  button to display the correct symbol, one to update the progress bar to reflect the current video
  position, and one to change the current video position.

Attach four _event listeners_ to the variable referencing the `viewer` class (the video): a 'click'
  event listener which will call upon the playback/pause toggle function as the _event handler_, a
  'play' event listener which will call upon the function which updates the play/pause symbol, a
  'pause' event listener which will call upon the **same** function as the 'play' event listener,
  and a 'timeupdate' event listener which will call upon the function that updates the progress bar.
  We now have a video that a user can click on to play/pause the video, a play/pause _icon_ that will
  update in respect to whether the video is playing or is paused, and a progress bar that will reflect
  the current video position.

Add an _event listener_ to the variable referencing the play/pause button that will listen for the
  'click' event and call on the playback/pause toggle function.

To allow the user to _manually_ change the video position by dragging the progress bar or clicking on a point
  in the progress bar, we'll need to keep track of whether the user has their mouse button clicked. If the user
  isn't pressing a mouse button down, they're just hovering over the progress bar and we don't need to make 
  any changes. Declare a variable that will be in charge of a `boolean` value, and define it as `false`. 
  Attach four _event listeners_ to the variable referencing the _current video progress_: a 'mousedown' event 
  listener which will change the value of the variable containing the `boolean` value to `true`, a 'mouseup' 
  event listener which will change that value back to `false`, a 'mousemove' event listener which will _call
  the function responsible for changing the video position __IF__ the variable holding the `boolean` value
  is `true`_, and a 'click' event listener which will _always_ call that same function.

Iterate through the variable referencing the skip/rewind buttons and attach an _event listener_ to each
  button for the 'click' event, and define an _event handler_ function that will increment the `currentTime`
  property of the video based on the _numerical value associated with the `data-skip` property of that button_.

Iterate through the variable referencing the volume & playback speed sliders and attach two _event listeners_: 
  a 'change' event listener that will update the _property value of the video element corresponding with the
  'name' property of the slider_ to reflect the _'value' property of the slider_, and a 'mousemove' event listener
  that will do the same.
  
**Steps:**

1. Declare seven constants that will be defined as references to the following HTML elements:
  - HTML media element (video) with class `player`
  - Child of `player` class element with class `viewer` (Example assuming first constant is named `player`: `player.querySelector('.viewer')`)
  - Child of `player` element with class `progress`
  - Child of `player` element with class `progress__filled` <-- TWO lower dashes
  - Child of `player` element with class `toggle`
  - **ALL** children of `player` element with a `data-skip` property
  - **ALL** children of `player` element with class `player__slider` <-- TWO lower dashes
  
  ```JavaScript
    const player = document.querySelector('.player'),
      video = player.querySelector('.viewer'),
      progress = player.querySelector('.progress'),
      progressBar = player.querySelector('.progress__filled'),
      toggle = player.querySelector('.toggle'),
      skipButtons = player.querySelectorAll('[data-skip]'),
      ranges = player.querySelectorAll('.player__slider')
  ```

2. Declare four `let` variables that will be defined as _arrow functions to be used as event handlers_:
  - `togglePlay` variable defined as an _arrow function_ that will call on either the `.play()` or `.pause()` 
    method of the HTMLElement with class `viewer`, depending on whether the `paused` property of that element is
    `true` or `false`.
    
    ```JavaScript
    let togglePlay = () => (video[video.paused ? 'play' : 'pause']())
    ```
  - `updateButton` variable defined as an _arrow function_ that will update the `textContent` property of the HTMLElement
    with class `toggle` to be '►' or '❚ ❚' depending on the `boolean` value of the `viewer` HTMLElement's `paused` property.
    
    ```JavaScript
    let updateButton = () => toggle.textContent = video.paused ? '►' : '❚ ❚';
    ```
  - `handleProgress` variable defined as an _arrow function_ that will set the `flexBasis` style attribute of the
    `progressBar` HTMLElement to reflect the current video progress.
    
    ```JavaScript
    let handleProgress = 
      () => progressBar.style.flexBasis = `$(video.currentTime/video.duration) * 100}%`
    ```
  - `scrub` variable defined as an _arrow function_ which accepts an _event parameter_, and updates the `currentTime` property
    of the `viewer` HTMLElement to reflect the position of the progress bar.
    
    ```JavaScript
    let scrub = (e) => video.currentTime = ((e.offsetX / progress.offsetWidth) * video.duration)
    ```

3. Attach four _event listeners_ to the `viewer` HTMLElement:
  - A 'click' event listener which will call the `togglePlay` function as an _event handler_.
  - A 'play' event listener which will call the `updateButton` function as an _event handler_.
  - A 'pause' event listener which will call the `updateButton` function as an _event handler_.
  - A 'timeupdate` event listener which will call the `handleProgress` function as an _event handler_.
  
  ```JavaScript
  video.addEventListener('click', togglePlay)
  video.addEventListener('play', updateButton)
  video.addEventListener('pause', updateButton)
  video.addEventListener('timeupdate', handleProgress)
  ```
  
4. Attach an _event listener_ to the `toggle` HTMLElement (in this example, the variable name is `toggle` as well) which will
  call the `togglePlay` function as an _event handler_.
  
  ```JavaScript
  toggle.addEventListener('click', togglePlay)
  ```
  
5. Declare a `let` variable `mousedown` and define it as `false`.

  ```JavaScript
  let mousedown = false
  ```

6. Attach four _event listeners_ to the `progress` HTMLElement:
  - A 'click' event listener which will call the `scrub` function as an _event handler_.
  - A 'mousemove' event listener which will call the `scrub` function as an _event handler_ **IF** `mousedown` is `true`.
  - A 'mousedown' event listener with the _event handler_ defined as an _arrow function_ that 
    will set `mousedown` to true.
  - A 'mouseup` event listener with the _event handler_ defined as an _arrow function_ that 
    will set `mousedown` to false.
    
  ```JavaScript
  progress.addEventListener('click', scrub)
  progress.addEventListener('mousemove', (e) => mousedown && scrub(e))
  progress.addEventListener('mousedown', () => mousedown = true)
  progress.addEventListener('mouseup', () => mousedown = false)
  ```

7. Iterate through the `skipButtons` variable that contains a _NodeList, an array-like object,_ and attach a 'click' 
  _event listener_ to each button with the _event handler_ defined as an _arrow function_ that increments the `currentTime`
 property of the `viewer` HTMLElement with the `data-skip` attribute of that button.
   
   ```JavaScript
   skipButtons.forEach(button => {
    button.addEventListener(
      //HTML attributes are string values. We want a number, so we parse the value into a `float`
      'click', () => video.currentTime += parseFloat(button.dataset.skip)) 
  })
   ```
   
 8. Iterate through the `ranges` variable that contains a _NodeList, an array-like object_, and attach two _event listeners_
  to each item:
  - A 'change' _event listener_ with the _event handler_ defined as an _arrow function_ that updates a property on the
  `viewer` HTMLElement _corresponding with the `name` attribute of the given NodeList item_ to the `value` attribute of the
  given item.
  - A 'mousemove' _event listener_ that does the same thing.
  
  ```JavaScript
  ranges.forEach(range => {
    range.addEventListener('change', () => video[range.name] = range.value)
    range.addEventListener('mousemove', () => video[range.name] = range.value)
  })
  ```

9. Wrap all that up in a nice litte IIFE _(immediately invoked function expression)_ to avoid polluting the global namespace
  (getting tired of reading that yet?)
  
**Another day, another challenge, another success! Congratulations! <3**
