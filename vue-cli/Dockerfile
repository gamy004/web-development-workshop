FROM node:lts-alpine

# install simple http server for serving static content
RUN npm install -g @vue/cli

# make the 'app' folder the current working directory
WORKDIR /srv/frontend

CMD [ "npm", "run", "serve" ]