# Digital Truth Engine: Fake News Detection

## Problem
Combating the spread of misinformation and fake news by programmatically assessing the veracity of textual content.

## Approach
- **TF-IDF Vectorization**: Transforms text data into numerical representations (TF-IDF features) that capture the importance of words within a document relative to a corpus.
- **Naive Bayes Classifier**: A probabilistic machine learning model (Multinomial Naive Bayes) trained to classify text as either "real" or "fake" news based on its vectorized features.

## Dataset
Synthetic text dataset containing example phrases labeled as "real" or "fake" news.

## Results
- **Accuracy**: High accuracy (>90%) on a small proof-of-concept dataset — not yet validated on real-world data.

## How to Run
1. Install dependencies: `pip install -r requirements.txt`
2. Run the detection script: `python detector.py`

## Tech Stack
- Python
- scikit-learn
- NumPy
- Pandas

## Project Structure
- `detector.py`: Script for synthetic data generation, TF-IDF vectorization, Naive Bayes model training, and text classification.
- `requirements.txt`: Python package dependencies.
