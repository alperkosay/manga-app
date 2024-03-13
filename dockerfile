FROM node:18

#Create a app directory
WORKDIR /app

# Install dependencies
COPY package*.json ./

#Run npm install

RUN npm install

COPY . .

EXPOSE 3000

CMD npm run dev
