FROM node:18-alpine

WORKDIR /app

COPY package.json ./

RUN npm install --force --verbose

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
