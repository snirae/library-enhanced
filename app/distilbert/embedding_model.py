from transformers import DistilBertModel, DistilBertTokenizer
from scipy.spatial.distance import cosine
import torch
import os


class EmbeddingModel:
    def __init__(self):
        dir_path = os.path.dirname(os.path.realpath(__file__))
        self.tokenizer = DistilBertTokenizer.from_pretrained(dir_path)
        self.model = DistilBertModel.from_pretrained(dir_path)

    def embed(self, text):
        inputs = self.tokenizer(text, return_tensors="pt", padding=True, truncation=True)
        with torch.no_grad():
            outputs = self.model(**inputs)
        embeddings = torch.mean(outputs.last_hidden_state, dim=1)  # Mean-pooling over token embeddings
        return embeddings[0]
    
    def similarity(self, vec1, vec2):
        return 1 - cosine(vec1, vec2)
