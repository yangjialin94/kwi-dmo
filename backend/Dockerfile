FROM node:18-alpine

# Install SQLite and build dependencies
RUN apk add --no-cache \
  python3 \
  py3-pip \
  py3-wheel \
  g++ \
  make \
  sqlite \
  bash

# Set working directory
WORKDIR /app

COPY package.json ./

# Install dependencies (including devDependencies for nodemon)
RUN npm install --force --verbose && npm rebuild sqlite3 --build-from-source

COPY . .

EXPOSE 8000

# Start the backend server using npx (ensures nodemon is found)
CMD ["npx", "nodemon", "--exec", "ts-node", "src/server.ts"]
