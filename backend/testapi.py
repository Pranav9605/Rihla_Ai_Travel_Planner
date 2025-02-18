from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Set up CORS so that your React app (typically on localhost:3000) can access the API


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],         # Allowed origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api")
def read_api():
    return {"message": "Hello from FastAPI"}
