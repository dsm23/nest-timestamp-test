FROM node:14-alpine AS builder

USER node

RUN mkdir /home/node/builder

WORKDIR /home/node/builder

COPY . .

RUN yarn install --production --frozen-lockfile

RUN cp -R node_modules/ prod_node_modules/

RUN yarn install

RUN yarn build

# ---

FROM node:14-alpine AS release

USER node

RUN mkdir /home/node/app

WORKDIR /home/node/app

COPY --from=builder /home/node/builder/package.json ./package.json
COPY --from=builder /home/node/builder/prod_node_modules ./node_modules/
COPY --from=builder /home/node/builder/dist/ ./dist/
COPY --from=builder /home/node/builder/public ./public/

EXPOSE 3000

CMD ["node", "dist/main.js"]