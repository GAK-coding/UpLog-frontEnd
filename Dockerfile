##### Stage 1: Build the react application
##FROM node:12.4.0-alpine as build
#FROM node:lts-alpine as build
#
#
## Configure the main working directory inside the docker image.
## This is the base directory used in any further RUN, COPY, and ENTRYPOINT
## commands.
#WORKDIR /app
#
#
## Copy the package.json as well as the package-lock.json and install
## the dependencies. This is a separate step so the dependencies
## will be cached unless changes to one of those two files
## are made.
#COPY package.json yarn.lock ./
#RUN yarn install
#
## Copy the main application
#COPY . ./
#
## Arguments
#ARG REACT_APP_API_BASE_URL
#ENV REACT_APP_API_BASE_URL=${REACT_APP_API_BASE_URL}
#
## Build the application
#RUN yarn build
#
##### Stage 2: Serve the React application from Nginx
#FROM nginx:1.17.0-alpine
#
## Copy the react build from Stage 1
#COPY --from=build /app/build /var/www
#
## Copy our custom nginx config
#COPY nginx.conf /etc/nginx/nginx.conf
#
## Expose port 3000 to the Docker host, so we can access it
## from the outside.
#EXPOSE 80
#
#ENTRYPOINT ["nginx","-g","daemon off;"]

#### Stage 1: Build the react application
FROM node:lts-alpine as build

# Configure the main working directory inside the docker image.
WORKDIR /app

# Copy the package.json as well as the yarn.lock and install the dependencies.
COPY package.json yarn.lock ./
RUN yarn install

# Copy the main application
COPY . ./

# Arguments
ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=${REACT_APP_API_BASE_URL}

# Build the application
RUN yarn build

#### Stage 2: Serve the React application from Nginx
#FROM nginx:1.17.0-alpine
FROM nginx:alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy the react build from Stage 1
#COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app /usr/share/nginx/html

# Copy our custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 to the Docker host, so we can access it from the outside.
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
