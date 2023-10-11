# Creating multi-stage build for production
FROM node:18-alpine as build
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev > /dev/null 2>&1
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /vglobal-backend/
COPY package.json package-lock.json ./
RUN npm config set fetch-retry-maxtimeout 600000 -g && npm install --only=production
ENV PATH /vglobal-backend/node_modules/.bin:$PATH
WORKDIR /vglobal-backend/app
COPY . .
RUN npm run build

# Creating final production image
FROM node:18-alpine
RUN apk add --no-cache vips-dev
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /vglobal-backend/
COPY --from=build /vglobal-backend/node_modules ./node_modules
WORKDIR /vglobal-backend/app
COPY --from=build /vglobal-backend/app ./
ENV PATH /vglobal-backend/node_modules/.bin:$PATH

RUN chown -R node:node /vglobal-backend/app
USER node
EXPOSE 1337
CMD ["npm", "run", "start"]
