The **Bag-of-n-grams** model is a more advanced text representation technique that improves upon the standard Bag-of-Words (BoW) model by capturing local word order and context.

Instead of counting single words (which are also called **unigrams**), it breaks text into contiguous sequences of **n** items (words or characters).

---

### ## How it Works

The core idea is to count the frequency of word phrases of a specific length.

* **n-gram:** A sequence of 'n' words.
    * **Unigram (n=1):** A single word (this is the same as Bag-of-Words).
    * **Bigram (n=2):** A sequence of two words.
    * **Trigram (n=3):** A sequence of three words.

The process is similar to BoW: you create a vocabulary of all unique n-grams and then build a vector for each document representing the count of each n-gram.

---

### ## A Simple Example

Let's use the sentence: **"The cat sat on the mat."**

#### 1. Unigrams (n=1, same as BoW)
* **Vocabulary:** `["the", "cat", "sat", "on", "mat"]`
* **Vector:** Represents counts of single words.

#### 2. Bigrams (n=2)
We slide a window of two words across the sentence:
* "The cat"
* "cat sat"
* "sat on"
* "on the"
* "the mat"
* **Vocabulary:** `["the cat", "cat sat", "sat on", "on the", "the mat"]`
* **Vector:** Represents counts of these two-word phrases.

#### 3. Trigrams (n=3)
We slide a window of three words across the sentence:
* "The cat sat"
* "cat sat on"
* "sat on the"
* "on the mat"
* **Vocabulary:** `["the cat sat", "cat sat on", "sat on the", "on the mat"]`
* **Vector:** Represents counts of these three-word phrases.



By using bigrams, the model can differentiate between "man bites dog" and "dog bites man" because the word order is preserved in the phrases.

---

### ## Advantages and Disadvantages

#### Advantages 👍
* **Captures Context & Word Order:** This is its biggest advantage over the simple Bag-of-Words model. It helps capture phrases and idioms (e.g., "New York" is treated as one unit).
* **Improved Performance:** For many NLP tasks, especially sentiment analysis, adding bigrams or trigrams can significantly improve model performance. For example, it can learn that "not good" is a very negative phrase.

#### Disadvantages 👎
* **Vocabulary Size Explodes:** The number of unique n-grams grows exponentially as 'n' increases. This leads to extremely large vocabularies.
* **Increased Sparsity:** Because the vocabulary is so large, the resulting vectors for each document become even more sparse (mostly zeros) than in the BoW model, which is computationally inefficient.