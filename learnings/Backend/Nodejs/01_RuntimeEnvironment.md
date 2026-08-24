# Node.js Concurrency & Optimization Techniques

Node.js handles concurrency through a **single-threaded event loop** combined with **non-blocking I/O operations** managed by the `libuv` library. This model allows it to handle thousands of concurrent connections efficiently without creating a new thread for each one.

Think of it like a chess master playing multiple opponents at once. The master (the Node.js thread) makes a move on one board (starts an I/O operation) and immediately moves to the next, instead of waiting for the opponent to respond. When an opponent makes their move (the I/O operation completes), the master is notified and can then react.

---

## 📑 Index

1. [🔄 The JavaScript Event Loop & Call Stack](#🔄-the-javascript-event-loop--call-stack)  
2. [⚙️ The Role of libuv](#⚙️-the-role-of-libuv-the-engine-room)  
3. [🧵 Thread Pool](#🧵-the-thread-pool-handling-heavy-lifting)  
4. [📬 Callbacks & Event Queue](#📬-callbacks-and-the-event-queue)  
5. [🌊 Streams](#🌊-streams)  
6. [⚙️ Child Processes](#⚙️-child-processes)  
7. [🚀 Clustering](#🚀-clustering)  
8. [📊 Summary Table](#📊-summary-when-to-use-what)

---

## 🔄 The JavaScript Event Loop & Call Stack

At its core, the Node.js runtime executes JavaScript code on a single thread, managed by the **Call Stack**.

- When a function is called, it's **pushed** onto the stack.  
- When the function returns, it's **popped** off the stack.  

Because there’s only one stack, long-running tasks (e.g., synchronous I/O) **block the program**. That’s why **non-blocking async code** is preferred in Node.js.

---

## ⚙️ The Role of `libuv`: The Engine Room

Node.js is not just V8—it also uses **libuv**, a C library that powers async operations.  

- Non-blocking tasks (like `fs.readFile`, HTTP requests) are **offloaded** to `libuv`.  
- `libuv` uses OS features or worker threads to execute tasks efficiently.  
- The main thread stays free to process JavaScript logic.

---

## 🧵 The Thread Pool: Handling Heavy Lifting

Some tasks are **blocking by nature** (e.g., DNS, crypto, file system ops).  

- `libuv` uses a **thread pool** (default: 4 threads) for such operations.  
- This ensures the **event loop never stalls**.  
- JavaScript code itself doesn’t touch these threads—it’s all managed by `libuv`.

---

## 📬 Callbacks and the Event Queue

When async operations complete:  

1. The OS / `libuv` finishes the task.  
2. The callback is placed into the **Event Queue**.  
3. The Event Loop checks if the **Call Stack is empty**.  
4. If yes, the callback is pushed onto the Call Stack and executed.  

This ensures **non-blocking performance** for I/O-heavy apps. 🚀  

---

## 🌊 Streams

**Streams** let you process data **piece-by-piece** instead of loading it all into memory.  
They’re perfect for large files, media, or network requests.

### Types of Streams
- **Readable:** Data source (`fs.createReadStream`).  
- **Writable:** Data sink (`fs.createWriteStream`).  
- **Duplex:** Both readable & writable (e.g., TCP socket).  
- **Transform:** Duplex with data modification (e.g., compression).  

### Example: File Copy with Streams
```javascript
const fs = require('fs');

const readable = fs.createReadStream('large-source.txt');
const writable = fs.createWriteStream('destination.txt');

readable.pipe(writable);

console.log('File copy started efficiently!');
```

## ⚙️ Child Processes

Node.js is single-threaded, but Child Processes allow offloading CPU-heavy work.

Key Methods

`spawn()` → For long-running tasks with continuous output.

`exec()` → Runs a command, buffers output in memory.

`fork()` → Creates a new Node.js process with a built-in communication channel.

Example: Offloading Fibonacci with fork()

parent.js
```javascript
const { fork } = require('child_process');

const child = fork('./child.js');
child.send({ number: 40 });

child.on('message', (msg) => {
  console.log(`Result: ${msg.result}`);
});

console.log('Parent keeps running...');


child.js

function fibonacci(n) {
  if (n < 2) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

process.on('message', (msg) => {
  const result = fibonacci(msg.number);
  process.send({ result });
  process.exit();
});
```

## 🚀 Clustering

Node.js apps use one core only by default.
With the cluster module, you can scale across multiple CPU cores.

Example: Simple Clustered HTTP Server

```javascript
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
} else {
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end(`Hello from worker ${process.pid}`);
  }).listen(8000);

  console.log(`Worker ${process.pid} started`);
}
```

## 📊 Summary: When to Use What
Technique	Primary Use Case	Solves Problem Of...	Analogy
Streams	I/O-heavy ops (files, network)	High memory usage	Streaming a movie instead of downloading
Child Process	CPU-heavy ops (calculations)	Blocking the event loop	Manager delegating a hard task
Clustering	Scaling network apps	Single-core bottleneck	Multiple chefs in a kitchen

✅ With these, Node.js achieves scalability, efficiency, and resilience in production.


---
