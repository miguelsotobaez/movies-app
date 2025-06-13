FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

# Install dependencies and nodemon globally
RUN npm install && npm install -g nodemon

COPY . .

EXPOSE 3000

CMD ["nodemon", "src/index.mjs"] 