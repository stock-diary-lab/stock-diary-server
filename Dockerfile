FROM node:14-alpine AS builder
WORKDIR /var/www/backend
COPY package.json yarn.lock ./
RUN npm install
COPY . . 
RUN npm run build

# FROM node:14-alpine AS runner
# WORKDIR /var/www/backend
# COPY --from=builder ./ ./
CMD ["npm", "run", "start:prod"]
