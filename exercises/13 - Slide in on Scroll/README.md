# Exercise 13: Slide In On Scroll
Nitish Dayal, Software & Applications Developer - [Contact](http://nitishdayal.me)  
Last Commit Date: May 12, 2017

Given an HTML document with multiple paragraphs and images, write the necessary
  JavaScript code to slide the images into view when the user scrolls to a point
  where it would be logical to display the image.

## Guide

**NOTE:** Differences between my solution and the official answer key are:
  - Change `debounce()` to utilize `let` & `const` where applicable
  - Declare `const` and define as result of calling `debounce()` on the _event handler_ function
  - Pass previously declared `const` into _event listener_

Declare a `const` and define it as a _reference to all elements with a class 'slide in'_. 
  We're going to attach an _event listener_ to the entire _window_ object, and listen for the 
  'scroll' event. We've been provided with a function, `debounce()`, which is explained in detail 
  [here](https://davidwalsh.name/javascript-debounce-function). `debounce()` accepts a function 
  as it's first parameter, and will only call that function after _N_ milliseconds 
  have passed (where _N_ is the second parameter). We'll use `debounce()` to limit the 
  amount of times the _event handler_ is called, since the having a function
  responsible for DOM manipulation being called every time the user scrolls can be extremely
  taxing on the browser.

The function which will be used as the _event handler_ is a bit complex due to some funky
  math we have to do. I'll break it down into steps as opposed to writing out a text-only guide
  first.

**Steps:**

1. Declare a `const` and define it as an _arrow function_:

    ```JavaScript
    const checkSlide = () => { }
    ```

2. Iterate through the `const` referencing the _HTML Node elements with a class 'slide in'_:

    ```JavaScript
    const checkSlide = () => {
      sliderImages.forEach(slider => {

      })
    }
    ```

3. Declare & define four `const` variables as the point at which the image should be displayed:

    ```JavaScript
    // The current scroll location in relation to the midway point of the image
    const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.height / 2,
          // The bottom of the image in relation to the entire page
          imgBottom = sliderImage.offsetTop + sliderImage.height,
          // Boolean value to decide if user has scrolled past the midway point of an image
          isHalfShown = slideInAt > sliderImage.offsetTop,
          // Boolean value to decide if the user has scrolled the image out of view
          isInView = window.scrollY < imgBottom;
    ```

4. If the user has scrolled to a point where they are past the midway point of an image
  and the image is still in view, _attach the 'active' class to the image_. Otherwise
  remove it.

    ```JavaScript
    // As ternary operator
     (isHalfShown && isInView) ?
            sliderImage.classList.add('active') : sliderImage.classList.remove('active');
    ```

5. Pass this arrow function into `debounce()`:

    ```JavaScript
    const checkSlide = debounce(() => {
      sliderImages.forEach(sliderImage => {
        const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.height / 2,
          imgBottom = sliderImage.offsetTop + sliderImage.height,
          isHalfShown = slideInAt > sliderImage.offsetTop,
          isInView = window.scrollY < imgBottom;

        (isHalfShown && isInView) ?
          sliderImage.classList.add('active') : sliderImage.classList.remove('active');
      })
    })
    ```

6. Attach an _event listener_ to the _window object_, listen for the 'scroll' event,
  and provide the previously declared `const` as the _event handler_.

    ```JavaScript
    window.addEventListener('scroll', checkSlide)
    ```

I'm aware that this doesn't provide a thorough enough explanation of the logic
  implemented, but frankly I'm not a math teacher. If you are having difficulty
  understanding how these calculations were done, I would recommend logging out
  the values of each constant and checking what they are at various points in the
  page as you scroll around (remove the debounce function so you don't skip
  values). You can also utilize your **browser developer tools** to inspect the
  window element & the image elements and look at their properties to see
  where we got `scrollY` and `offsetTop` and whatever else. In this particular challenge,
  you really are better off learning through trial and error.

**Almost half way there!**