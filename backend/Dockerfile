
# Use the official Ubuntu 24.04 as the base image
FROM ubuntu
SHELL ["/bin/bash", "-c"] 

# Install Python and create virtual environment
RUN apt-get update && \
    apt-get install -y python3 python3-venv python3-pip && \
    rm -rf /var/lib/apt/lists/*

# Create virtual environment
RUN python3 -m venv /app/venv

# Use virtual environment's pip for installations
RUN /app/venv/bin/pip install --upgrade pip

WORKDIR /app
COPY requirements.txt .

# Install dependencies using virtual environment's pip
ENV BLIS_ARCH=generic
RUN /app/venv/bin/pip install -r requirements.txt


# ... rest of your Dockerfile ...

# Copy the rest of the backend code into the container
COPY . .

# Expose the port that the FastAPI app runs on
EXPOSE 8000

# Command to run the FastAPI app using uvicorn
CMD ["/app/venv/bin/uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

