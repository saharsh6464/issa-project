# Base image
FROM ubuntu:22.04

# Avoid interactive prompts
ENV DEBIAN_FRONTEND=noninteractive

# Install required packages and languages
RUN apt-get update && apt-get install -y \
    build-essential \      
    python3 python3-pip \  
    openjdk-17-jdk \       
    nodejs npm \          
    curl \
    git \
    && rm -rf /var/lib/apt/lists/*

# Optional: Setup Node.js global packages
RUN npm install -g underscore request express

# Create working directory
RUN mkdir -p /piston
WORKDIR /piston

# Default command to keep container running
CMD ["tail", "-f", "/dev/null"]
