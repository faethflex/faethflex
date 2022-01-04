# Base Image
FROM node:14.18.2-alpine as build-step

# Installs latest Chromium package.
RUN echo @edge http://dl-cdn.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories \
  && echo @edge http://dl-cdn.alpinelinux.org/alpine/v3.15/main >> /etc/apk/repositories \
  && apk update && apk upgrade \
  && apk add --no-cache \
  chromium \
  harfbuzz@edge \
  nss@edge \
  freetype@edge \
  ttf-freefont@edge \
  && rm -rf /var/cache/* \
  && mkdir /var/cache/apk

# Add Chrome as a user
RUN mkdir -p /usr/src/app \
  && adduser -D chrome \
  && chown -R chrome:chrome /usr/src/app

# Add Enviornment varaible for test
ENV CHROME_BIN=/usr/bin/chromium-browser

# Set our work directory as /app
WORKDIR /app

# Copy package.json to /app
COPY package.json ./

# Install NPM packages from package.json
RUN npm install

# Copy everything not ignored in the .dockerignore file into the /app working directory of the image
COPY . .

# Now that / is in the /app working directory, we can build the Angular app and then run test
RUN npm run lint &&\
  npm run test:docker &&\
  npm run build:prod

# Setup web server
FROM nginx:1.21.5-alpine as prod-stage

# Set up privleges for user account
RUN chown -R nginx /etc/nginx/conf.d/default.conf

# Copy the dist folder that was built by ng build and place it into the html folder our the nginx server, since thats where the default html for nginx lives
COPY --from=build-step /app/dist /usr/share/nginx/html

# Need to run some commands so it runs when the image is ran
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Command to edit the port property in the nginx config and run the server
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'