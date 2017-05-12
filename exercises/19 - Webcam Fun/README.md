# Exercise 19: Webcam Fun
Nitish Dayal, Software & Applications Developer - [Contact](http://nitishdayal.me)  
Last Commit Date: May 12, 2017

We're given an HTML page with a button labeled 'Take Photo' which calls upon a `takePhoto()`
  function on a `click` event, a collection of `input` elements of type `range` with RGB min/max
  labels, a `canvas` element, a `video` element, and an empty div with the class `strip`. Our goal
  is to write the necessary JavaScript code to ask permission for the user's webcam, display the
  feed from that webcam on the page, allow the user to save pictures that are displayed,
  and allow the user to alter the image using the RGB sliders.

## Guide

This challenge will require use of the `Navigator` _Web API_ ([MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/Navigator)),
  the `CanvasRenderingContext2D` _Web API_ ([MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D), 
  and the `MediaDevices` _Web API_ ([MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/mediaDevices)). 
  If you're not a fan of reading documentation, here's a simple overview:

  - The `Navigator` interface is a representation of the application in which the JavaScript
    code is running (in most cases, the browser)
  - The `MediaDevices` interface provides a way to access the user's connected media hardware,
    such as a webcam or microphone by using the `getUserMedia` method. The method takes
    an object as an argument which specifies the media items the program needs access to;
    in our case, the webcam.

The `scripts.js` file already has some `constants` defined as references: a reference to 
  the `video` element, the `canvas` element, the `canvas` context, to the `div` element 
  where we'll display any photos the user has taken, and a reference to the `audio` element
  which uses [this](http://wesbos.com/demos/photobooth/snap.mp3) file as it's source.
  
We begin by using the navigator web API in combination with the mediaDevices web API to
  request permission from the user to access their webcam; this request returns a _promise_
  with the resulting `MediaStream` object or the rejected promise with an error message. **Note:
  This promise is only resolved *IF* the user selects an option when prompted for request
  to the webcam**; if the user doesn't select anything, the promise won't resolve but our program
  won't break. This is the beauty of promises; they allow us to ask for something and will
  allow the rest of the program to run the promise waits for a response. Promises represent
  _a value which may be available now, in the future, or never_ ([as defined by MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)). If
  we receive a `localMediaStream` object as a promise, we'll set the source object of the `video` 
  element to the _`localMediaStream` object_, and call upon the `play()` method of the `video` element. 
  If the promise resolves to an error, we'll log out that error message.

Then, we need to _define a function_ that will be used as the _event handler_ for when the 
  'canplay' event of the `video` element is triggered (whenever the user either approves or 
  denies access to their webcam). The function will adjust the `canvas` element's 
  `width` and `height` properties to be equivalent to the `video` element's `width` and `height`,
  and will return the _interval ID_ of a `setInterval()` method. Within the body of the 
  `setInterval()` method, we will draw onto the canvas by providing a valid canvas image
  source such as an `image` element, a `video` element, another `canvas` element, or an
  _image bitmap_. In our case, we want to display the user's webcam feed in the canvas,
  so we'll provide the `video` element as as argument to the canvas' draw method.
  To manipulate the image using the `input` HTML elements, we'll need to get access
  to the _underlying pixel data_ of the image being displayed on the canvas.
  We'll declare a `let` variable and define it as the `ImageData` object returned
  from calling the `getImageData()` method of the canvas context. The `ImageData` object
  returned from this method is exactly what we were looking for: the _underlying pixel data_
  for the current canvas image. We will eventually pass this variable into a function
  that will change the values of the pixels depending on the `input` values.

The `takePhoto()` function that the `button` HTML element is calling on 'click' events
  isn't defined; we'll do that next. The `takePhoto()` function should play the audio file
  that we referenced earlier with a `const` variable, convert the current canvas image
  to a _data URI_, create an `anchor` HTML element (a link) with a _hyperlink reference_
  pointing to the _data URI_ which will download the image to the user's local storage
  when clicked, set the inner HTML of that link to be an `image` HTML element referencing
  the _data URI_ as the source, and insert this link inside the empty `div` element
  with the class `.strip`.

The last function we'll want to create is one that will bring functionality to the `input`
  elements; as the user moves the sliders around, we want to adjust the RGB values of the
  canvas image to reflect the values of the sliders to present a sort of 'green screen'
  effect. The function should have one declarared parameter, `pixels`. We'll begin by declaring 
  a `const` as an empty object. We'll create a _NodeList_ of all the HTML `input` elements contained 
  within the `div` with class `.rgb`, iterate through this _NodeList_, and create a key within 
  the previously defined object corresponding with the given `input` element's `name` property, 
  and set it's value as the given `input` element's value. The `pixels` argument we're expecting
  will be the _underlying pixel data_ of the current canvas image. This data contains an _array
  of unsigned 8bit integer values between 0-255_, corresponding with the RGB attributes of the image.
  We'll iterate through these arrays and set the values to 0 where the RGB attribute is within
  the range of the input slider values. This one is tricky, so let's get to the steps.

**Steps:**

1. Declare a `const` variable `getVideo` and define it as an _arrow function_. This function
  will use the `Navigator` and `mediaDevices` web APIs to ask permission to access the user's
  webcam and, upon success, will set the source object of the `video` element as the 
  `localMediaStream`.

    ```JavaScript
      const getVideo = () => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
          .then(localMediaStream => {
            video.srcObject = localMediaStream;
            video.play();
          })
          .catch(err => {
            console.error(`OH NO!!!`, err);
          })
      };
    ```

2. Declare a `const` variable `paintToCanvas` and define it as an arrow function.

    ```JavaScript
      const paintToCanvas = () => { /* ... */};
    ```

       - In the body of this function, declare two `const` variables and define them
         as the `video` element's width and height, and update the `canvas` width and height
         to reflect those values.

           ```JavaScript
          const paintToCanavas = () => {
            const width = video.videoWidth;
            const height = video.videoHeight;
            canvas.width = width;
            canvas.height = height; 

             /* More to do... */
           };
           ```

    - Still in the body of the function, return the _interval ID_ of a `setInterval()`
      function call, and within the body of that function call, draw the current `video`
      element on to the `canvas.`

        ```JavaScript
          let paintToCanavas = () => {
            const width = video.videoWidth;
            const height = video.videoHeight;
            canvas.width = width;
            canvas.height = height; 

            return setInterval(() => {
              ctx.drawImage(video, 0, 0, width, height);
            }, 16);
          };
        ```

3. Declare a `const` variable `takePhoto` and define it as an arrow function that will
  play the `audio` element on the HTML page, create a link which targets a _data URI_
  representation of a still image taken from the canvas, and places that link into the front
  of the empty `div` element.

    ```JavaScript
      const takePhoto = () => {
        // Play the audio element on the HTML page
        snap.currentTime = 0;
        snap.play();

        const data = canvas.toDataURL('image/jpeg');
        const link = document.createElement('a');
        link.href = data;
        link.setAttribute('download', 'handsome');
        link.innerHTML = `<img src="${data}" alt="Handsome Man" />`;
        strip.insertBefore(link, strip.firsChild);
      };
    ```

4. Declare a `const` variable `greenScreen` and define it as an _arrow function_ that will
  accept an argument `pixels`.

    ```JavaScript
      const greenScreen = (pixels) => { /*...*/ };
    ```

    - In the function body, declare a `const` variables `levels` and define it as an empty
      object. Iterate through a _NodeList_ of all `input` elements within the div with class
      `rgb` and set a key in the `levels` object as a given input's `name` property, and
      set the value to be the given input's `value`.

        ```JavaScript
          /* In function body */

          const levels = {};

          document.querySelectorAll('.rgb input').forEach((input) => {
            levels[input.name] = input.value;
          });
        ```

    - Update the values of the pixels in the image so that we remove all RGB
      values that are within the range defined by the user, and return the given
      argument.

        ```JavaScript
          /* In function body */
          for (i = 0; i < pixels.data.length; i += 4) {
            red = pixels.data[i + 0];
            green = pixels.data[i + 1];
            blue = pixels.data[i + 2];
            alpha = pixels.data[i + 3];

            if (red >= levels.rmin
              && green >= levels.gmin
              && blue >= levels.bmin
              && red <= levels.rmax
              && green <= levels.gmax
              && blue <= levels.bmax) 
            {
              pixels.data[i + 3] = 0;
            }
          }
          return pixels;
        ```

5. Update the `getVideo` function so that the setInterval method within the function body
  creates a variable defined as the _underlying pixel data_, passes that variable into the
  `greenScreen` function, and places the returned pixel data into the canvas context.

    ```JavaScript
    /* In paintToCanvas function body */

    return setInterval(() => {
      ctx.drawImage(video, 0, 0, width, height);
      
      let pixels = ctx.getImageData(0, 0, width, height);

      pixels = greenScreen(pixels);
      
      ctx.putImageData(pixels, 0, 0);
    }, 16);
    ```

6. Call upon the `getVideo` function we previously defined.

7. Attach an _event listener_ to the `video` HTML element that will call the `paintToCanvas`
  function on the 'canplay' event, and attach an _event listener_ to the `button` HTML element
  that will call the `takePhoto` function on a 'click' event.

    ```JavaScript
      video.addEventListener('canplay', paintToCanavas);
      document.querySelector('.takePhoto').addEventListener('click', takePhoto);
    ```

Wrap it all up in an IIFE, take a step back, and enjoy your glorious new photo-and-greenscreen
  application!
