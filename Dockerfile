# Use Node.js LTS
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first (caching optimization)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .


# Set Environment Variables
ENV PORT=5555

# Expose port (replace 3000 with your backend port)
EXPOSE 5555

# Start the app
CMD ["node", "index.js"]