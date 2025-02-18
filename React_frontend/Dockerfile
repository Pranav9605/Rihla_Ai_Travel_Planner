
# Use the official Ubuntu 24.04 as the base image
FROM ubuntu

# Set environment variables to non-interactive
ENV DEBIAN_FRONTEND=noninteractive

# Install Node.js, npm, and curl
RUN apt-get update && \
    apt-get install -y npm && \
    rm -rf /var/lib/apt/lists/*

# Install Yarn
RUN npm install -g yarn

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and yarn.lock files into the container
COPY package.json yarn.lock ./

# Install the dependencies
RUN yarn install

# Copy the rest of the application code into the container
COPY . .

# # Build the React application
# RUN yarn build

# # Install a lightweight web server to serve the React application
# RUN yarn global add serve

# Expose the port that the app will run on
EXPOSE 5173

# Command to serve the React app
# CMD ["serve", "-s", "build", "-l", "3000"]
CMD ["yarn","dev","--host"]
