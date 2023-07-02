# Use the official Node.js image as the base
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend files to the container
COPY . .

# Build the backend
RUN npm run build

# Expose port 5000 for the backend
EXPOSE 5000

# Start the backend server
CMD ["npm", "run", "start"]
