# 🛠️ React Custom Hooks Guide

A **custom hook** is a reusable JavaScript function whose name starts with `"use"`.  
It lets you **extract and share stateful logic** between different React components.  

Instead of duplicating the same logic (like fetching data, using local storage, or tracking window size) in multiple components, you can put that logic into a **custom hook** and use it wherever you need it.

---

## 📑 Index

- [Why Create a Custom Hook? 🤔](#why-create-a-custom-hook-🤔)
- [The Rules of Creating a Custom Hook](#the-rules-of-creating-a-custom-hook)
- [Example: Creating a `useFetch` Hook 🌐](#example-creating-a-usefetch-hook-🌐)
  - [1. Define the Goal](#1-define-the-goal)
  - [2. Create the Hook Function](#2-create-the-hook-function)
  - [3. Add State Management](#3-add-state-management)
  - [4. Add Fetching Logic with `useEffect`](#4-add-the-fetching-logic-with-useeffect)
  - [5. Return the State](#5-return-the-state)
- [How to Use the `useFetch` Hook](#how-to-use-the-usefetch-hook)

---

## Why Create a Custom Hook? 🤔

The main reasons for creating a custom hook are:

- **Reusability:** Write logic once and reuse it in multiple components (DRY principle).  
- **Clean Code:** Keeps components clean, readable, and focused on **UI rendering**, while complex logic lives inside the hook.

---

## The Rules of Creating a Custom Hook

1. **Name Must Start with `"use"`**  
   This tells React it's a hook, so React can apply hook rules.  
   Examples: `useFetch`, `useLocalStorage`, `useWindowSize`.

2. **Only Call Hooks Inside**  
   A custom hook is the only place (besides components) where you can call other hooks like `useState`, `useEffect`, or `useContext`.

---

## Example: Creating a `useFetch` Hook 🌐

A custom hook to fetch data from an API while managing the three common states:

- `loading` → Is the request in progress?  
- `error` → Did something go wrong?  
- `data` → The data that was successfully fetched  

---

### 1. Define the Goal

We want a hook that accepts a `url` and handles data fetching with loading & error states.

---

### 2. Create the Hook Function

```javascript
import { useState, useEffect } from 'react';

function useFetch(url) {
  // Logic will go here
}
```
### 3. Add State Management

```javascript
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetching logic will go here
}
```

### 4. Add the Fetching Logic with useEffect

```javascript
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController(); // Prevent memory leaks

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort(); // Cleanup
  }, [url]);
}
``` 

### 5. Return the State

```javascript
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    return () => controller.abort();
  }, [url]);

  return { data, loading, error }; // ✅ return state
}

export default useFetch;
```

## How to Use the useFetch Hook

```javascript
import React from 'react';
import useFetch from './useFetch'; // Import the custom hook

function UserProfile({ userId }) {
  const { data, loading, error } = useFetch(
    `https://api.example.com/users/${userId}`
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>{data?.name}</h1>
      <p>{data?.email}</p>
    </div>
  );
}
```

👉 Now your component stays clean & focused on UI, while the fetching logic lives in the hook.
