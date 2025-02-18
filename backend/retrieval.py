from vector_db import collection  # Import the Chroma DB collection
from embedding import get_embedding  # Use the API-based embedding function

def retrieve_relevant_docs(query: str, top_k: int = 5):
    """
    Retrieves the top_k relevant documents based on the query.
    """
    # Convert the query to an embedding using the OpenAI API
    query_embedding = get_embedding(query)
    
    # Perform the retrieval from the vector DB collection
    results = collection.query(query_embeddings=[query_embedding], n_results=top_k)
    
    return results['documents']  # Adjust based on the data structure returned by your DB
