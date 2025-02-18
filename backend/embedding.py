import openai
from config import OPENAI_API_KEY

# Set up the OpenAI API key
openai.api_key = OPENAI_API_KEY

def get_embedding(text: str) -> list:
    """
    Generate an embedding for the provided text using OpenAI's API.
    Uses the "text-embedding-ada-002" model.
    """
    response = openai.Embedding.create(
        input=text,
        model="text-embedding-3-small"
    )
    # Extract and return the embedding from the response.
    embedding = response["data"][0]["embedding"]
    return embedding

# Example usage:
if __name__ == "__main__":
    sample_text = "This is a sample sentence to generate an embedding."
    embedding = get_embedding(sample_text)
    print("Generated embedding:", embedding)
