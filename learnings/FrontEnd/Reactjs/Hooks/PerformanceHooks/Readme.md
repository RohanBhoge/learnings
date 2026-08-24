# ⚡ React Performance Hooks: `useMemo` & `useCallback`

React's performance hooks, `useMemo` and `useCallback`, are tools for optimizing your application's speed.  
They work by **memoization**, which is a fancy word for remembering or caching something to avoid unnecessary work.

- **`useMemo`** → remembers the **result** of an expensive calculation.  
- **`useCallback`** → remembers the **function definition** itself.

---

## 📑 Index

- [`useMemo`: Remembering a Value 📝](#usememo-remembering-a-value-📝)
- [`useCallback`: Remembering a Function ✍️](#usecallback-remembering-a-function-✍️)
- [The Key Difference](#the-key-difference)

---

## `useMemo`: Remembering a Value 📝

`useMemo` is designed to prevent resource-intensive calculations from running on every single render.  
It takes a function and a dependency array, runs the function, and returns its result.  
On subsequent renders, if the dependencies haven't changed, it returns the remembered result without re-running the function.

**🔑 Analogy:** Imagine you solve a very difficult math problem and write down the answer.  
The next time you're asked the same question, you don’t re-solve it—you just give the answer you wrote down.  
That’s what `useMemo` does for a calculation’s result.

**✅ When to use it:**
- Filtering, sorting, or transforming large arrays
- Expensive calculations you don’t want running on every render

**Example: Filtering a large list**

```javascript
import React, { useState, useMemo } from 'react';

function UserList({ users, searchTerm }) {
  // This calculation only re-runs if 'users' or 'searchTerm' changes.
  const filteredUsers = useMemo(() => {
    console.log('Filtering logic is running...'); // Logs less often
    return users.filter(user => user.name.includes(searchTerm));
  }, [users, searchTerm]);

  return (
    <ul>
      {filteredUsers.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

👉 Without useMemo, the users.filter() runs on every render, even if inputs didn’t change.

## useCallback: Remembering a Function ✍️

useCallback is used to memoize a function definition.
In JavaScript, functions are objects. If you define one inside a component, a new function is created on every render.

This becomes a problem when passing callbacks to child components wrapped in React.memo.
Even if nothing changes, the child sees a “new” function and re-renders unnecessarily.
useCallback ensures the function reference stays the same as long as dependencies don’t change.

🔑 Analogy: Think of a recipe card. The recipe itself (function definition) doesn’t change.
useCallback gives you the same recipe card every time instead of rewriting an identical one.

✅ When to use it:

Passing callbacks to memoized child components

Preventing unnecessary child re-renders

Example: Memoized Button
```javascript
import React, { useState, useCallback } from 'react';

// Optimized child component with React.memo
const MemoizedButton = React.memo(({ onClick }) => {
  console.log('Button is re-rendering...');
  return <button onClick={onClick}>Click Me</button>;
});

function ParentComponent() {
  const [count, setCount] = useState(0);

  // Memoize the function definition
  const handleClick = useCallback(() => {
    console.log('Button was clicked!');
  }, []); // Dependencies

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment Count</button>
      <MemoizedButton onClick={handleClick} />
    </div>
  );
}
```

👉 Without useCallback, handleClick is a new function on each render, forcing MemoizedButton to re-render unnecessarily.

## The Key Difference

The easiest way to remember:

useMemo(() => computeValue, deps) → returns a memoized value.

useCallback(callbackFunc, deps) → returns a memoized function.

💡 Fun fact:
useCallback(fn, deps) is equivalent to:

useMemo(() => fn, deps);


Would you like me to **merge all hooks (`useState`, `useEffect`, `useReducer`, `useRef`, `useMemo`, `useCallback`) into a single “React Hooks Handbook” README** with a big index for GitHub? That way you’ll have a complete reference doc in one file.
