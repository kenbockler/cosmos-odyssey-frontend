# docker build -t estken/cosmos-odyssey-frontend:latest .
# docker push estken/cosmos-odyssey-frontend

# Node.js LTS (Long Term Support) based image
FROM node:20-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and -package-lock.json files to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the project files into the working directory
COPY . .

# Build the project
RUN npm run build

# Step 2: Use an NGINX image to serve the built React app

# Use an official NGINX image
FROM nginx:stable-alpine

# Copy the built React app from the build stage to NGINX's default server directory
COPY --from=build /app/dist /usr/share/nginx/html

# Remove the default NGINX configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Add a custom NGINX configuration
COPY nginx.conf /etc/nginx/conf.d

# Expose port 80 to allow communication with NGINX
EXPOSE 80

# Start the NGINX server
CMD ["nginx", "-g", "daemon off;"]