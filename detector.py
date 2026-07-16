import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB

def train_fake_news_detector():
    # Synthetic data
    texts = [
        "breaking news real event happened", "trustworthy source confirms",
        "fake news conspiracy theory", "hoax information spreading"
    ]
    labels = [0, 0, 1, 1] # 0 = Real, 1 = Fake
    
    # Vectorizer
    vectorizer = TfidfVectorizer()
    X = vectorizer.fit_transform(texts)
    
    # Model
    model = MultinomialNB()
    model.fit(X, labels)
    
    # Simple evaluation
    y_pred = model.predict(X)
    print(f"Accuracy: {np.mean(y_pred == labels):.2f}")
    
    return vectorizer, model

if __name__ == "__main__":
    train_fake_news_detector()
