# Node LTS - v12.13.0
FROM node:erbium-slim
ENV NODE_ENV development
# Expose port 1337
EXPOSE 1337
# Create directory if not exists
RUN mkdir -p /usr/src/app
# Directory in the image filesystem
WORKDIR /usr/src/app
# Copy project to /usr/src/app/
COPY . /usr/src/app/
# Install Sails.js and packages
RUN cd sails && npm install sails -g && npm install
# Install Vue packages and build
RUN cd vue && npm install && npm run build
# Copy Vue components to Sails.js folder
WORKDIR /usr/src/app/vue/dist
COPY . /sails/vue/
# Change working directory to Sails folder
WORKDIR /usr/src/app/sails
# Run Sails app
CMD sails lift