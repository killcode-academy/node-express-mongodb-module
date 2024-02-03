# Mern Backend

## Step 1.

To deploy a MERN (MongoDB, Express.js, React, Node.js) stack application using Docker, follow these steps:

- Pull Image from Docker Hub:

        $ docker pull inventerlord/mern-backed

## Step 2

This command retrieves the pre-built Docker image for the MERN backend from the Docker Hub repository inventerlord/mern-backed.

Create Compose File (docker-compose.yaml):

- This docker-compose.yaml file defines two services - api-server and mongo. Adjust the configurations as needed.

        version: '3'
        services:
        api-server:
            image: inventerlord/mern-backed
            container_name: api-server-cont
            ports:
            - '8000:8000'
            networks:
            - mern-app
            depends_on:
            - mongo
        mongo:
            image: mongo
            restart: always
            ports:
            - '27018:27017'
            container_name: mongo-cont
            networks:
            - mern-app
            volumes:
            - mongo-data:/data/db
            - mongo-data:/data/configdb
        networks:
        mern-app:
            driver: bridge
        volumes:
        mongo-data:
            driver: local

## Step 3

Run in web browser to create admin and user roles

- http://localhost:8000/api/v1/seeder?password=123456

  This URL is where you can create admin and user roles for your MERN application.

## Step 4

- Run Docker Compose

  `$ docker-compose up -d`

- Execute this command to start the Docker containers in the background.
