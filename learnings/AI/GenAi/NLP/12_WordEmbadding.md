Word embeddings are a modern and powerful way to represent text where words are mapped to dense vectors of real numbers. Unlike older methods like Bag-of-Words or TF-IDF, these vectors are designed to capture the **semantic meaning, context, and relationships** between words.

The core idea is that words with similar meanings will have similar vector representations. They are "embedded" in a multi-dimensional space where their proximity to each other indicates their relationship.

---

### ## How it Works

Instead of sparse, high-dimensional vectors (like in One-Hot Encoding), word embeddings create dense, low-dimensional vectors (e.g., 50-300 dimensions). These vectors are learned from a large corpus of text, and the models are trained to place words with similar meanings close to each other in this vector space.

This allows for fascinating vector arithmetic that captures complex relationships:

**`vector('King') - vector('Man') + vector('Woman') ≈ vector('Queen')`**



This shows the model has learned the concept of gender and royalty without being explicitly told.

---

### ## Popular Word Embedding Models

Two of the most well-known techniques for creating word embeddings are:

1.  **Word2Vec (Google):** This model uses a neural network to learn word associations from a large corpus of text. It has two main architectures:
    * **CBOW (Continuous Bag-of-Words):** Predicts the current word based on its surrounding context words.
    * **Skip-gram:** Predicts the surrounding context words given the current word (generally performs better for rare words).

2.  **GloVe (Global Vectors for Word Representation - Stanford):** This model is trained on global word-word co-occurrence statistics from a corpus, capturing how frequently words appear together. It often learns relationships more explicitly than Word2Vec.

More advanced models like **BERT** and **ELMo** take this a step further by creating **contextual embeddings**, where the vector for a word changes depending on the sentence it's in. For example, the vector for "bank" would be different in "river bank" vs. "money bank."

---

### ## Advantages Over Traditional Methods

#### Advantages 👍
* **Captures Semantic Meaning:** The vectors store information about what a word *means*, including synonyms and analogies.
* **Lower Dimensionality:** The vectors are dense and much smaller than the sparse vectors from BoW or TF-IDF, making them far more computationally efficient.
* **Improved Performance:** Using pre-trained word embeddings as the input layer for NLP models (like those for text classification or sentiment analysis) almost always leads to a significant boost in performance.