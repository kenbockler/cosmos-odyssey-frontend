# docker build -t cosmos-odyssey-frontend .
# docker tag cosmos-odyssey-frontend estken/cosmos-odyssey-frontend
# docker push estken/cosmos-odyssey-frontend

# Node.js LTS (Long Term Support) based image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the project files into the container
COPY . .

# Build the project
RUN npm run build

# Step 2: Use an NGINX image to serve the React app
FROM nginx:stable-alpine

# Copy the built React app from the build stage to NGINX's default server directory
COPY --from=0 /app/dist /usr/share/nginx/html

# Expose port 80 to allow communication with NGINX
EXPOSE 80

# Start the NGINX server
CMD ["nginx", "-g", "daemon off;"]