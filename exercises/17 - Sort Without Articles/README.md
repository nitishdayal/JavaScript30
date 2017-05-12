# Exercise 17: Sort Without Articles
Nitish Dayal, Software & Applications Developer - [Contact](http://nitishdayal.me)  
Last Commit Date: May 12, 2017

We're given an HTML page with an _unordered list_, and an _array of string
  values_ in the `script` tag. Sort the values in the array **excluding
  the prefixes 'The', A', or 'An'** and place the values into the _unordered
  list_ as _list items_.

## Guide

Declare a `const` variable and define it as a _regular expression pattern_
  that will match the prefixes we want to exclude that is **case insensitive**.
  Create a function that will accept a string value as a parameter and
  and returns the string after replacing any parts of the string that match
  the previously defined _regular expression pattern_ with an empty string,
  excluding leading or trailing whitespaces. Declare a `const` and define
  it as the result of sorting through the provided array, passing each
  item in the array to the previously defined function. FInally, target
  the _unordered list_ and update its _inner HTML_ to display each item
  in the array as a _list item_.

**Steps:**

1. Declare a `const` variable and define as a new Regular Expression object.

    ```JavaScript
    const namesPrefix = new RegExp('^(a |the |an )', 'i')
    ```

2. Declare a `const` and define it as an _arrow function_ which accepts
  a parameter `bandName` and returns the provided argument after replacing
  any values that match the previously defined RegEx pattern with an empty
  string and removing any leading or trailing whitespace.

    ```JavaScript
    const stripPrefixes = (bandName) => bandName.replace(namesPrefix, '').trim()
    ```

3. Declare a `const` and define it as the **result** of sorting through the `bands`
  array, passing each item into the `stripPrefixes` function to remove prefixes (if
  they exist) before comparing them.

    ```JavaScript
    const sortedBands = bands.sort((a, b) => stripPrefixes(a) > stripPrefixes(b) ? 1 : -1)
    ```

4. Select the `#bands` unordered list and update the _inner HTML_ to be the items in
  the sortedBands array stored within _list items_.

    ```JavaScript
    document.querySelector('#bands').innerHTML = 
      sortedBands
        .map(band => `<li>${band}</li>`)
        .join('')
    ```

Another one down, another one down, another one bites the dust! HEY!
