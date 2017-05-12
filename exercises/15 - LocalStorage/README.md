# Exercise 15: LocalStorage
Nitish Dayal, Software & Applications Developer - [Contact](http://nitishdayal.me)  
Last Commit Date: May 12, 2017

The web page simulates a restaurant's menu. The user should be able to
  add new dishes to the list using the `form` HTML element without having
  to refresh the page. Currently, when the user submits a dish into the form, 
  the page reloads (as this is the _default action_ of a `submit` event) 
  and the list remains empty. Write the necessary JavaScript code to bring
  functionality to the page.

## Guide

In the `script` tag, we're provided 3 `const` variables: one referencing
 the _`form` element_ (`addItems`), one referencing the _`unordered list` 
 element_ (`itemsList`), and an empty array (`items`). This one is lengthy,
 so let's get started with the necessary steps:
 
**Steps:**

1. Attach an event handler to the `form` element that will listen for
  the 'submit' event and call upon an _event handler_ (to be defined, for
  now simply provide the name that you'll give to the function).
  
    ```JavaScript
    addItems.addEventListener('submit', addItem)
    ```
    
2. Define the _event handler_ as a function which accepts an `event` as
  a parameter and will prevent the default behavior of that event:
  
  ```JavaScript
  const addItem = (e) => {
    e.preventDefault()
  }
  ```
  
3. In the function body, declare a `const` and define it as the _value
  of the `input` element_ and declare another `const` as an _object_
  with the properties 'text' (set to the `input` value) and 'done' (set
  to the `boolean` value false):
  
  ```JavaScript
  /* In function body */
  const text = (e.target.querySelector('[name="item"]').value(),
    item = {
      text,
      done: false
    }
  ```

4. Push the newly created _`item` object_ into the `items` array &
  store the `items` array in _localStorage_. Values saved in _localStorage_
  are associated with a `key` and can only be String values, so we'll convert
  the `items` array into a _JSON string_. Reset the form:
  
  ```JavaScript
  /* In function body */
  items.push(item)
  localStorage.setItem('dishes', JSON.stringify(items))
  e.target.reset()
  ```
  - **NOTE:** Submit some values into the form.In your browser's dev tools, 
    navigate to the `Application` tab and open up 'Local Storage > file://'. 
    You should see these items stored under the key 'dishes' as a string 
    representation of the `items` array.

5. Declare a _function_ that will be responsible for generating the necessary
    HTML to display each item in the `items` array as a list item with a clickable
    checkbox.
    
  ```JavaScript
  const populateList = (items, itemsList) => {
    // If the parameter `items` isn't an array, go no further
    if (!(items instanceof Array)) return false
    
    // Update the 'itemsList' HTML to contain each item stored in the `items` array
    itemsList.innerHTML = items.map((item, i) => {
      return `
        <li>
          <input type="checkbox" data-index=${i} id="item${i}" ${item.done ? 'checked' : ''} />
          <label for="item${i}">${item.text}</label>
        </li>
      `
    }).join('')
  }
  ```

6. Go back to the _event handler_ function body and call the newly defined function **after**
  we've pushed an _item object_ into the `items` array:
  
  ```JavaScript
  /* Right after 'items.push(item)' */
  populateList(items, itemsList)
  ```

7. At the very top of your JavaScript code, change `const items` so that it is **either**
  an array generated from parsing through the items currently in localStorage, or if there is
  nothing in localStorage, an empty array.
  
  ```JavaScript
      const addItems = document.querySelector('.add-items'),
        itemsList = document.querySelector('.plates'),
        items = JSON.parse(localStorage.getItem('dishes')) || []; // This is the line we're changing
  ```
  
8. We need to call the `populateList` method as soon as the document loads
  so that we can generate the menu items if there is something in the localStorage:
  
  ```JavaScript
  document.onload = populateList(items, itemsList)
  ```
  
9. Currently, the 'done' property of each _item_ element is never updated, so the status
  of the checkbox does not carry across page reloads. Attach an event handler to the `itemsList`
  that will call an _event handler_ function on each 'click' event.
  
  ```JavaScript
  itemsList.addEventListener('click', toggleDone)
  ```

10. Define this _event handler_ function so that it accepts an _event_ as a parameter and,
  if the target of the event contains the text 'input' anywhere, we'll toggle 
  the `done` value of correct object in the `items` array and update the localStorage
  to reflect that change:
  
  ```JavaScript
    const toggleDone = (e) => {
    if (!e.target.matches('input')) return;

    const element = e.target,
      idx = element.dataset.index;

    items[idx].done = !items[idx].done
    localStorage.setItem('dishes', JSON.stringify(items))
  }
  ```

Guess what, friends? We're already **HALF WAY THEREEEEEEEE!!!!**
