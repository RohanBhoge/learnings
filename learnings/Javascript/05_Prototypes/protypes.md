# Understanding Prototypes in JavaScript ⛓️

Welcome! This guide explains prototypal inheritance, a core concept in JavaScript. Understanding this mechanism is key to understanding how objects in JavaScript share and inherit properties and methods.

At its heart, the rule is simple: **every JavaScript object has a link to another object, called its prototype.** When you try to access a property on an object, the engine first looks at the object itself. If it doesn't find the property, it travels up this link—the **prototype chain**—until it finds the property or reaches the end of the chain (`null`).



---

## ## Prototypal Inheritance in Action

The most direct way to see prototypes at work is by linking two objects together. In the example below, we will make `obj2` inherit from `obj`.

> **Note:** Setting a prototype using `__proto__` is for demonstration. The modern, standard way to create an object with a specific prototype is `Object.create()`.

### ### Code Example

```javascript
// We start with a base object that has properties and a method.
let obj = {
  name: "John",
  city: "New York",
  greet: function () {
    console.log(
      "Hello, my name is " + this.name + " and I live in " + this.city
    );
  },
};

// We create a second object with its own 'name' property.
let obj2 = {
  name: "Rohan",
};

// Here's the magic: we set the prototype of obj2 to be obj.
// Now, obj2 inherits all of obj's properties and methods.
obj2.__proto__ = obj;

// --- Let's see the lookup in action ---

// 1. Accessing a property on the prototype
// The engine looks for 'name' on obj2.__proto__ (which is obj) and finds "John".
console.log(obj2.__proto__.name); // Output: John

// 2. Accessing an "own" property
// The engine looks for 'name' on obj2 itself and finds it immediately.
// It never needs to check the prototype. This is called "property shadowing".
console.log(obj2.name); // Output: Rohan

// 3. Accessing an inherited property
// The engine looks for 'city' on obj2, but doesn't find it.
// It then travels up the prototype chain to obj, finds 'city', and returns its value.
console.log(obj2.city); // Output: New York

// 4. Accessing an inherited method
// The same lookup process applies to methods.
obj2.greet(); // Output: Hello, my name is Rohan and I live in New York
```

Notice in the last example that when `obj2.greet()` is called, `this.name` correctly resolves to `"Rohan"`. This is because the value of `this` is determined by **how the function is called** (`obj2` is the caller), not where the function is defined.

---

## ## The Common Pattern: Constructor Functions

While you can link objects directly, the most common way prototypes are used is through constructor functions. When you create an object using the `new` keyword, its prototype is automatically set to the constructor's `.prototype` property.

```javascript
function Player(name) {
  // This is an "own" property, unique to each instance.
  this.name = name;
}

// This is a shared method, stored on the prototype.
// It's more memory efficient because it only exists in one place.
Player.prototype.attack = function() {
  console.log(`${this.name} attacks!`);
};

const player1 = new Player('Link');

// 'name' is found directly on player1.
console.log(player1.name); // "Link"

// 'attack' is not on player1, so the engine looks up the prototype chain
// and finds it on Player.prototype.
player1.attack(); // "Link attacks!"
```

---

## ## Why Use Prototypes?

1.  **Memory Efficiency:** You can define methods once on the prototype, and they will be shared by all instances, rather than duplicating them for every object.
2.  **Inheritance:** It is the native way that JavaScript allows objects and classes to inherit properties and behavior from one another.