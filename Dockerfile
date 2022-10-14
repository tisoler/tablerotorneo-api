FROM alpine:3.12.1 as nodeonly
RUN apk update && apk add nodejs && rm -rf /var/cache/apk/*

FROM nodeonly AS nodenpm
RUN apk update && apk add npm && rm -rf /var/cache/apk/*

FROM nodenpm AS dist
WORKDIR /app/
COPY ./package.json ./
COPY ./tsconfig.json ./
COPY ./src ./src
RUN npm install
RUN npm run build

FROM nodenpm AS deps
WORKDIR /app/
COPY ./package.json ./
RUN npm install --only=production

FROM nodeonly
WORKDIR /app/
COPY --from=deps /app/node_modules/ ./node_modules
COPY --from=dist /app/dist/ ./dist
CMD [ "node", "src/index.js" ]