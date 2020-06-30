FROM node:14-alpine as builder

USER node

RUN mkdir /home/node/builder

WORKDIR /home/node/builder

COPY . .

RUN yarn install
RUN yarn build

# ---

FROM node:14-alpine

USER node

RUN mkdir /home/node/app

WORKDIR /home/node/app

COPY --from=builder /home/node/builder/package.json ./package.json
COPY --from=builder /home/node/builder/yarn.lock ./yarn.lock
COPY --from=builder /home/node/builder/dist/ ./dist/
COPY --from=builder /home/node/builder/public ./public/

RUN yarn install --production=true

EXPOSE 3000

CMD ["node", "dist/main.js"]