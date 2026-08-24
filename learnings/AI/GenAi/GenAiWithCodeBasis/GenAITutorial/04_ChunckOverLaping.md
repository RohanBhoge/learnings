**Chunk overlapping** is a technique used when you split a large document into smaller pieces, or "chunks." It ensures that a little bit of text from the end of one chunk is repeated at the beginning of the next chunk.

Think of it like reading a book with pages that have a **small overlap**.

---
## The Problem: Losing Context at Page Breaks 📖

Imagine you're reading a book and a key sentence is split right at the bottom of a page:

> **Page 1 ends with:** "The main cause of the issue was the faulty..."
>
> **Page 2 starts with:** "...power converter, which then triggered a system-wide failure."

If you only read Page 1 or only read Page 2, you lose the full meaning. The two parts of the sentence are disconnected.

This is exactly what happens when you split a document into chunks for a vector database. An important idea might get cut in half between two chunks. When you later search for that idea, your system might not find the relevant text because the full context is missing in any single chunk.

---
## The Solution: Overlapping the Chunks 📑

**Chunk overlapping** solves this by intentionally repeating the last few words or sentences of one chunk at the start of the next one.

Here's how it would look with overlap:

> **Chunk 1:** "...The team investigated for weeks. **The main cause of the issue was the faulty power converter**..."
>
> **Chunk 2:** "**The main cause of the issue was the faulty power converter, which then triggered a system-wide failure**. This led to..."

Now, the key sentence, "The main cause of the issue was the faulty power converter," is **fully intact in both chunks**.

This makes your searches much more effective. If your query is about the "cause of the failure," the system is much more likely to find either Chunk 1 or Chunk 2 because the complete thought is preserved, preventing important information from getting lost at the edges.