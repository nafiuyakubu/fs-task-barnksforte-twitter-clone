FROM node:20-alpine

# Set an argument for the source directory and env variable for the source
ARG SOURCE_DIR= .
ENV SOURCE_DIR=${SOURCE_DIR}

# WORKDIR <directory_path>  Set default working directory [Auto Create if does not exist]
WORKDIR /app

# Copy[<source> <destination>]  package.json and package-lock.json
COPY ${SOURCE_DIR}/package*.json ./

# # Install App dependencies
RUN npm install
RUN npm rebuild bcrypt 

# Copy the rest of the application
COPY . .

# Expose the port the app runs on
EXPOSE 4000


CMD ["npm", "start"]
