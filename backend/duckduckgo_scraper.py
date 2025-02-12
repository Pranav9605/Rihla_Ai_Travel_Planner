import requests
from urllib.parse import quote
import re
import spacy

# Load spaCy’s small English model.
nlp = spacy.load("en_core_web_sm")

def extract_place_keyword(text: str) -> str:
    """
    Extracts a relevant place/attraction keyword from the input text.
    It uses spaCy's named entity recognition (NER) to select entities of types:
      - GPE (countries, cities, states)
      - LOC (locations, natural features)
      - FAC (facilities, attractions)
    Additionally, if an entity is labeled ORG and its text includes words like "hotel" or "restaurant",
    it is considered.
    
    If multiple entities are found, the one that appears first in the text is returned.
    In case no relevant entity is found, it falls back to extracting the longest noun chunk that is not numeric.
    """
    doc = nlp(text)
    # List to collect candidate entities.
    candidates = []
    for ent in doc.ents:
        # Filter out entities that are just numbers.
        if ent.label_ in {"GPE", "LOC", "FAC"}:
            candidates.append((ent.start_char, ent.text))
        elif ent.label_ == "ORG":
            lower_ent = ent.text.lower()
            if any(word in lower_ent for word in ["hotel", "restaurant", "bar", "cafe", "inn", "lodge", "resort"]):
                candidates.append((ent.start_char, ent.text))
    
    if candidates:
        # Choose the entity that appears first (lowest start_char)
        candidates.sort(key=lambda x: x[0])
        return candidates[0][1]
    
    # Fallback: use noun chunks but ignore ones that are purely numeric.
    noun_chunks = [chunk.text for chunk in doc.noun_chunks if not chunk.text.strip().isdigit()]
    if noun_chunks:
        return max(noun_chunks, key=lambda x: len(x))
    return text

def scrape_duckduckgo_image(query: str) -> str:
    """
    Searches DuckDuckGo Images for a given query and returns a single image URL.
    The function extracts a location/attraction keyword from the query using extract_place_keyword.
    """
    # Extract a place-related keyword from the query.
    keyword = extract_place_keyword(query)
    encoded_keyword = quote(keyword)
    search_url = f"https://duckduckgo.com/?q={encoded_keyword}&iax=images&ia=images"

    headers = {
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/117.0.0.0 Safari/537.36"
        )
    }

    try:
        response = requests.get(search_url, headers=headers, timeout=10)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        print(f"Error searching DuckDuckGo for '{keyword}': {e}")
        return ""

    # Extract the vqd token using a regex with a named group.
    vqd_pattern = re.compile(r'vqd=([\'"]?)(?P<vqd>[\d-]+)\1')
    match = vqd_pattern.search(response.text)
    if not match:
        print(f"No vqd token found for '{keyword}'.")
        return ""
    vqd = match.group("vqd")

    # Prepare parameters for the image API call.
    api_url = "https://duckduckgo.com/i.js"
    params = {
        "l": "us-en",
        "o": "json",
        "q": keyword,
        "vqd": vqd,
        "f": ",,,",
        "p": "1",
        "v7exp": "a",
    }
    headers_api = {
        "User-Agent": headers["User-Agent"],
        "Referer": search_url,
    }

    try:
        api_response = requests.get(api_url, params=params, headers=headers_api, timeout=10)
        api_response.raise_for_status()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching images for '{keyword}': {e}")
        return ""

    try:
        data = api_response.json()
        if data.get("results"):
            return data["results"][0].get("image", "")
    except (KeyError, ValueError) as e:
        print(f"Error parsing JSON response for '{keyword}': {e}")
        return ""

    return ""

if __name__ == "__main__":
    # Test queries focusing on places, attractions, hotels, and restaurants.
    queries = [
        "Dinner at the Marriott Hotel near Times Square",
        "Visit the Louvre Museum in Paris",
        "Enjoying a meal at a cozy restaurant in Rome",
        "A beautiful view of the Eiffel Tower",
        "Check in at the Hilton Hotel, downtown"
    ]
    for query in queries:
        image_url = scrape_duckduckgo_image(query)
        if image_url:
            print(f"Image URL for query '{query}': {image_url}")
        else:
            print(f"No image URL found for query '{query}'.")
        print("-" * 40)
