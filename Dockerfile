# Node LTS - v12.13.0
FROM node:erbium-slim
ENV NODE_ENV development
# Expose port 1337
EXPOSE 1337
# Create directory if not exists
RUN mkdir -p /usr/src/app
# Directory in the image filesystem
WORKDIR /usr/src/app
# Copy backend to /usr/src/app/sails
COPY sails /usr/src/app/sails
# Copy frontend to /usr/src/app/vue
COPY vue /usr/src/app/vue
# Copy package.json to /usr/src/app
COPY package.json /usr/src/app
# Setup project
RUN npm install && npm run setup
# Start application with $ docker run ...
CMD npm run sails-start-dev