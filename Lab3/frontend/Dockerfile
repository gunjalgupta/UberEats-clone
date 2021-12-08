FROM node:latest

# ADD src /src

# ADD public /public

# RUN mkdir /app

# WORKDIR /app

# # add `/app/node_modules/.bin` to $PATH
# ENV PATH /node_modules/.bin:$PATH

# # install app dependencies
# COPY package.json ./
# COPY package-lock.json ./
# RUN npm install --silent


# # add app
# COPY . ./
# # RUN npm run build

# # start app
# CMD ["  ", "start"]

# Create app directory
RUN mkdir /app
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
# Install app dependencies
COPY package.json /app/
COPY package-lock.json /app/
RUN npm install

# Bundle app source
COPY . ./

# EXPOSE 8080
CMD [ "npm", "start" ]