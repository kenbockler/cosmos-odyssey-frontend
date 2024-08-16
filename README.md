# Cosmos Odyssey Frontend

This repository contains the frontend of the Cosmos Odyssey web application, designed to offer the best travel routes between the planets of our solar system. The application allows customers to select travel routes and make reservations.

The frontend works in conjunction with the backend service to provide a seamless and user-friendly experience. Users can easily find and book the best travel deals.

## Important

**The entire software operates through the collaboration of multiple different servers. The complete solution can be launched using Docker containers and Compose:**

[https://github.com/kenbockler/cosmos-odyssey-docker.git](https://github.com/kenbockler/cosmos-odyssey-docker.git)

However, if you only want to start the frontend application, you can follow the steps below.

## Getting Started

### Setting Up the Project

1. Clone the repository:

    ```bash
    git clone https://github.com/kenbockler/cosmos-odyssey-frontend.git
    ```

2. Navigate to the cloned repository directory:

    ```bash
    cd cosmos-odyssey-frontend
    ```

3. Install the necessary dependencies:

    ```bash
    npm install
    ```

### Running the Frontend Server

1. Start the development server:

    ```bash
    npm run dev
    ```

The frontend application should now be running and accessible at [http://localhost:5173](http://localhost:5173).

If you need to build a production-ready version, you can do so with the following command:

```bash
npm run build
```

This will create an optimized and ready-to-deploy version of your frontend application.