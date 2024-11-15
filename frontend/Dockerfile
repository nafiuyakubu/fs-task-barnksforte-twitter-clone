FROM node:20-alpine


# Set an argument for the source directory and env variable for the source
ARG SOURCE_DIR= .
ENV SOURCE_DIR=${SOURCE_DIR}

# WORKDIR <directory_path>  Set default working directory [Auto Create if does not exist]
WORKDIR /app

# Copy[<source> <destination>]  package.json and package-lock.json
COPY ${SOURCE_DIR}/package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application code to the working directory
COPY . .

# Expose port 3000 for development server
EXPOSE 3000

# Start the development server
CMD ["npm", "start"]
