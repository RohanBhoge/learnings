# Learning Log: How the Internet & Websites Work
**Date:** August 17, 2025

This document is a summary of my learnings on the fundamental workings of the internet and the lifecycle of a modern website.

---

## Part 1: How the Internet Works - The Core Concepts

The internet is a global network of computers that communicate using a standard set of rules. The process of visiting a website involves several key steps.



1.  **Client-Server Model:** Your device (the **client**) requests information from a powerful computer (the **server**) where the website is stored.
2.  **IP Addresses & DNS:** The internet uses numerical **IP addresses** to locate servers. The **Domain Name System (DNS)** acts as the internet's phonebook, translating human-friendly domain names (e.g., `google.com`) into server IP addresses.
3.  **Packets & TCP/IP:** Data is broken down into small pieces called **packets**. **TCP/IP** is the protocol that ensures these packets are sent to the correct address, arrive without errors, and are reassembled in the right order.
4.  **Infrastructure:** Your device connects to a **router**, which connects to a **modem**. The modem connects you to your **Internet Service Provider (ISP)**, which is your gateway to the global internet.

---

## Part 2: Deep Dive - The Lifecycle of a Website

### How Websites Work: Frontend & Backend

A website is composed of two distinct parts that work together.



* **Frontend (Client-Side):** Everything you see and interact with in the browser.
    * **HTML (HyperText Markup Language):** The skeleton and content of the page.
    * **CSS (Cascading Style Sheets):** The visual styling, layout, and appearance.
    * **JavaScript (JS):** The interactive elements and dynamic functionality.

* **Backend (Server-Side):** The "behind-the-scenes" engine that runs on the server.
    * **Server-Side Languages:** Code (Python, Node.js, etc.) that processes logic, manages users, and handles data.
    * **Databases:** Systems (MySQL, MongoDB, etc.) that store and retrieve all website data.
    * **Server:** The computer that hosts the files and runs the backend code.

### The Development Process 💻

1.  **Planning & Design:** Defining the website's purpose and creating wireframes/mockups with a focus on **UI/UX**.
2.  **Frontend Development:** Writing the HTML, CSS, and JavaScript code.
3.  **Backend Development:** Building the server-side logic and database connections.
4.  **Testing:** Finding and fixing bugs across different browsers and devices.

### Deployment: Going Live 🚀

Deploying means making the website accessible to the world. It requires two key components:

1.  **Domain Name:** The registered, unique address for the site (e.g., `google.com`).
2.  **Web Hosting:** Renting space on a server that is connected to the internet 24/7.

The process involves uploading the website's files to the hosting server and pointing the domain name to that server's IP address.

### Getting Found: Search Engine Optimization (SEO) 🔍

For a website to be found on Google, it must be indexed and ranked.

1.  **Crawling:** Google's automated "spiders" browse the web to discover new pages.
2.  **Indexing:** Google analyzes and stores the content of these pages in its massive database.
3.  **Ranking:** Google's algorithm ranks pages based on relevance and authority, using factors like **keywords**, **content quality**, **backlinks**, **mobile-friendliness**, and **page speed**.