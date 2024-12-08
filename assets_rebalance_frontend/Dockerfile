FROM node:22-alpine AS build

ENV NODE_ENV=production  

WORKDIR /app

COPY ./assets_rebalance_frontend/package.json ./package.json
COPY ./assets_rebalance_frontend/yarn.lock ./yarn.lock

RUN yarn install --frozen-lockfile

COPY ./assets_rebalance_frontend .
RUN yarn build

FROM node:22-alpine AS runner

ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /app

COPY --from=build /app/package.json .
COPY --from=build /app/yarn.lock .
COPY --from=build /app/next.config.mjs ./
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static

EXPOSE ${PORT}

CMD [ "node", "server.js" ]