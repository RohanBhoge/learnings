## Text Representation

Label Encoding and One-Hot Encoding are early, basic methods for converting text into numbers, but they are rarely used in modern NLP because they fail to capture the meaning and context of words.

---

### ## Label Encoding

Label Encoding converts each unique word in a vocabulary into a unique integer. For example, a vocabulary of `["cat", "dog", "mat"]` would be encoded as:

* `cat` → `0`
* `dog` → `1`
* `mat` → `2`

#### Disadvantage

The primary disadvantage is that it creates an **artificial and misleading order**. The model might interpret that `dog` (1) is somehow "greater than" `cat` (0) or that `mat` (2) is twice the value of `dog` (1). This numerical relationship is completely arbitrary and can confuse the model, leading to poor performance.



---

### ## One-Hot Encoding (OHE)

One-Hot Encoding addresses the ordering problem of Label Encoding. It creates a binary vector for each word that is the size of the entire vocabulary. The vector is all zeros except for a single '1' at the index corresponding to that word.

Using the same vocabulary `["cat", "dog", "mat"]`:

* `cat` → `[1, 0, 0]`
* `dog` → `[0, 1, 0]`
* `mat` → `[0, 0, 1]`

#### Disadvantages

1.  **High Dimensionality (Curse of Dimensionality):** If your vocabulary has 50,000 words, each word becomes a 50,000-dimensional vector. This makes computation extremely slow and memory-intensive.
2.  **Sparsity:** The resulting vectors are almost entirely zeros, which is inefficient to store and process.
3.  **No Semantic Meaning:** Like Label Encoding, the vectors are independent of each other. The representation for `cat` is no more similar to `dog` than it is to `mat`, so the model cannot learn relationships between words.

---

### ## Why We Don't Use Them in Modern NLP

The fundamental reason these techniques are no longer preferred is their **inability to capture semantic meaning**.

In human language, words like "king" and "queen" or "walk" and "run" are related. Label Encoding and One-Hot Encoding produce representations where every word is equally distant from every other word. They cannot capture context, synonyms, or any other form of semantic relationship.

Modern NLP has moved on to **Word Embeddings** (like **Word2Vec**, **GloVe**) and **Contextual Embeddings** (from models like **BERT**). These techniques create dense, lower-dimensional vectors where similar words have similar vectors, effectively capturing the meaning and context of the text.