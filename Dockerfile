FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Install dependencies including 'devDependencies'
RUN npm install

# Bundle app source
COPY . .

# Build the project
RUN npm run build

ENTRYPOINT ["./bin/run.js"]
