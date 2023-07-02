# Use the official Node.js image as the base
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend files to the container
COPY . .

# Build the frontend
RUN npm run build

# Expose port 3000 for the frontend
EXPOSE 3000

# Start the frontend server
CMD ["npm", "run", "start"]
