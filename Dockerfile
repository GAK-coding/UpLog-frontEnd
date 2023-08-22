#### Stage 1: Build the react application
FROM node:lts-alpine as build

# Configure the main working directory inside the docker image.
WORKDIR /app

# Copy the package.json as well as the yarn.lock and install the dependencies.
COPY package.json yarn.lock ./
RUN yarn install
RUN yarn set version berry

# Copy the main application
COPY . ./

# Build the application
RUN yarn build

CMD ["yarn", "dev"]

# Stage 2: Create the production image with Nginx
FROM nginx:latest

# Remove default nginx configurations
RUN rm -rf /etc/nginx/conf.d/*

# Copy the build artifacts from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the nginx.conf file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the default Nginx port
EXPOSE 3070

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
