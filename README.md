# RihlaAi Travel Planner

**RihlaAi: Your AI-Powered Passport to Arabia** is an AI-driven travel planning system that generates personalized itineraries and forecasts travel costs. This project leverages advanced NLP, predictive modeling, and real-time data extraction to deliver tailored travel recommendations.

## Key Features

- **Dynamic Itinerary Generation:**  
  Creates detailed, customized travel plans based on destination, travel dates, budget, group type, and activities.

- **Data Extraction & NLP:**  
  Uses Selenium and BeautifulSoup to scrape travel data and spaCy (NER) to extract relevant keywords and images for enriching itineraries.

- **Predictive Modeling:**  
  Implements Random Forest and XGBoost to forecast hotel prices, ensuring cost-effective recommendations.

- **LLM Fine-Tuning & RAG:**  
  Fine-tuned LLMs using MLX (with Mistral) and Unsloth (with a small-parameter LLaMA via QLoRA) combined with Retrieval-Augmented Generation (RAG) to produce context-aware recommendations.

- **Weather Forecasting:**  
  Integrates Facebook Prophet for real-time weather predictions to further refine travel plans.

- **Deployment:**  
  Deployed on AWS EC2 (Linux) for a scalable, production-ready environment.

## Technologies Used

Python, Selenium, BeautifulSoup, scikit-learn, XGBoost, MLX, Unsloth, QLoRA, Streamlit, Pandas, NumPy, Matplotlib, Seaborn, Large Language Models (LLMs), Retrieval-Augmented Generation (RAG), Facebook Prophet, AWS EC2

## Setup & Installation

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/YourUsername/RihlaAi_Travel_Planner.git
    cd RihlaAi_Travel_Planner
    ```

2. **Install Dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

3. **Download spaCy Model:**
    ```bash
    python -m spacy download en_core_web_sm
    ```

4. **Configure Environment Variables:**  
   Set your API keys and other configuration in your environment or a `.env` file.

5. **Run the Backend:**
    ```bash
    uvicorn backend.main:app --reload
    ```

6. **Run the Frontend:**
    ```bash
    streamlit run frontend/app.py
    ```

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License.
