TF-IDF, which stands for **Term Frequency-Inverse Document Frequency**, is a text representation technique that evaluates how important a word is to a document within a collection of documents (a corpus). It's an improvement over the Bag-of-Words model because it gives more weight to words that are important and unique to a specific document, not just those that appear frequently.

The TF-IDF score for a word is the product of two metrics: Term Frequency and Inverse Document Frequency.

---

### ## Term Frequency (TF)

This metric measures how often a word appears in a specific document. The idea is that words that appear more frequently in a document are more important to that document's meaning.

The formula is:
$$\text{TF(word, document)} = \frac{\text{Number of times the word appears in the document}}{\text{Total number of words in the document}}$$

---

### ## Inverse Document Frequency (IDF)

This metric measures how unique or rare a word is across all documents in the corpus. It penalizes common words (like "the" or "is") that appear in many documents and gives a higher score to words that are rare.

The formula is:
$$\text{IDF(word, corpus)} = \log\left(\frac{\text{Total number of documents in the corpus}}{\text{Number of documents containing the word}}\right)$$

The logarithm is used to dampen the effect of the score, preventing it from becoming too large for very rare words.



---

### ## Calculating the Final TF-IDF Score

To get the final score, you simply multiply the TF and IDF values. A high TF-IDF score is achieved by a word that has a high frequency in a specific document but a low frequency across the entire collection of documents.

$$\text{TF-IDF} = \text{TF} \times \text{IDF}$$

#### A Simple Example

Consider a corpus with two documents:
* **Doc 1:** "The cat sat on the mat."
* **Doc 2:** "The dog chased the cat."

Let's calculate the TF-IDF score for the word "**dog**" in **Doc 2**.

1.  **Calculate TF for "dog" in Doc 2:**
    * "dog" appears 1 time.
    * Total words in Doc 2 is 5.
    * **TF** = 1 / 5 = 0.2

2.  **Calculate IDF for "dog" across the corpus:**
    * Total documents = 2.
    * Number of documents containing "dog" = 1.
    * **IDF** = log(2 / 1) ≈ 0.301

3.  **Calculate the final TF-IDF score:**
    * **TF-IDF** = 0.2 * 0.301 = **0.0602**

Now, let's look at the word "**the**" in **Doc 2**:
* **TF("the", Doc 2)** = 1 / 5 = 0.2
* **IDF("the", Corpus)** = log(2 / 2) = log(1) = **0**
* **TF-IDF** = 0.2 * 0 = **0**

As you can see, the common word "the" gets a score of 0, effectively filtering it out, while the more specific word "dog" gets a meaningful score.

---

### ## Advantages and Disadvantages

#### Advantages 👍
* **Reduces Weight of Common Words:** It automatically down-weights common words that add little value.
* **Simple & Effective:** It's easy to compute and provides a better representation than simple word counts.

#### Disadvantages 👎
* **Doesn't Capture Semantics:** Like BoW, it doesn't understand the meaning of words. "Car" and "automobile" are treated as completely different words.
* **Doesn't Capture Word Order:** It still operates as a "bag of words," so it loses the context provided by word order.