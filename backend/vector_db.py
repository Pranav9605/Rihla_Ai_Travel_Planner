# backend/vector_db.py
import chromadb
import openai
from config import OPENAI_API_KEY

# Set your OpenAI API key
openai.api_key = OPENAI_API_KEY

class OpenAIEmbeddingFunction:
    def __call__(self, input):
        """
        Generate an embedding for the given text using OpenAI's text-embedding-ada-002 model.
        Expects a single parameter "input" (a string).
        """
        response = openai.Embedding.create(
            input=input,
            model="text-embedding-ada-002"
        )
        return response["data"][0]["embedding"]

# Instantiate the embedding function
embedding_function = OpenAIEmbeddingFunction()

# Initialize ChromaDB client with persistent storage
client = chromadb.PersistentClient(path="./chroma_db")

# Get or create a collection using the custom OpenAI-based embedding function
collection = client.get_or_create_collection(
    name="travel_docs",
    embedding_function=embedding_function,
    metadata={"hnsw:space": "cosine"}  # cosine similarity for comparisons
)
