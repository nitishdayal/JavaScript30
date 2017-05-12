# Exercise 14: JavaScript Reference vs Copying
Nitish Dayal, Software & Applications Developer - [Contact](http://nitishdayal.me)  
Last Commit Date: May 12, 2017

No guide necessary! We're learning about JavaScript variable referencing vs.
  copying. If you want a full-blown explanation, take a look at [chapter 11, section
  2 of 'JavaScript: The Definitive Guide'](http://docstore.mik.ua/orelly/webprog/jscript/ch11_02.htm).
  The easiest way I can summarize the information is that _primitive types are
  manipulated by value_ and _object types are manipulated by reference_. Still confused?
  Have **NO** idea what I'm talking about? Carry on, my wayward son; there'll be peace
  when you are done.

## Manipulating by Value

**Primitive types** are _manipulated by value_. The following types are considered 
  **primitive types** in JavaScript:
- String
- Number
- Boolean
- Null
- Undefined

This means that if we define a variable as a **primitive type**, and then define
  _another variable_ as the previously defined variable, the second variable
  will _copy the current value of the first variable_. Any changes to the first
  variable will not effect the second, and vice versa.

Example:

```JavaScript
let me = "Nitish"
let me2 = me
console.log(me === me2) // true

me2 = "Bob Dylan"
console.log(me === me2, me, me2) // false, "Nitish", "Bob Dylan"; I'm not Bob Dylan

me = "Not Nitish"
console.log(me === me2, me, me2) // false, "Not Nitish", "Bob Dylan"
```

## Manipulating by Reference

**Object types** are _manipulated by reference_. If it's not a primitive type, it's
  **always** an object. If we're being really technical, almost everything _can be_ 
  an object in JavaScript, even primitive types (excluding `null` and `undefined`), but
  let's try not to get hung up on technicalities.

A small list of **object types** in JavaScript:
- Object
- Function
- Array
- Set

Let's say we declare a variable and define it as an object, then declare _another_
  variable and define it as the first variable:

```JavaScript
const me = {name: "Nitish", age: 26}
const me2 = me
console.log(me === me2) // true
```

If we update the property of the object by calling on _either variable_, both variables
  will reflect that change.

```JavaScript
me.name = "Not Nitish"
console.log(me === me2) // true
console.log(me2) // { name: 'Not Nitish', age: 26 }
```

This is because `me2` does not copy `me`; it contains a _reference_ to the object
  defined in `const me`. Any changes applied directly to the object will have an
  effect on all variables referencing that particular object. So what could we do
  if we wanted to make a copy of the original object so as not to manipulate the
  root source of data?

```JavaScript
const me3 = Object.assign({}, me) // create a new object
console.log(me3) // {name: 'Not Nitish', age: 26}
console.log(me === me3) // false! It's a new object instance!
console.log(me.name === me3.name) // true! The property values are the same!
me3.name = "Devin"
console.log(`${me.name}, ${me3.name}`) // 'Not Nitish, Devin'
```

We have effectively copied the first object and can modify our copy without
  manipulating the original.

**WARNING: If we copy an object _containing objects_, we are only copying
  the first level. Anything deeper than that will still be a reference.**

![The More You Know!](http://www.d-toolsblog.com/wp-content/uploads/2008/11/the_more_you_know2.jpg)
