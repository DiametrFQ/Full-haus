FROM node:latest

COPY . .

WORKDIR /

RUN npm install

RUN npm run build

# Run the application.
CMD ["npm", "run", "start"]
