FROM node:alpine as dev
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
EXPOSE 8080
CMD ["yarn", "run", "serve"]

FROM dev as build
RUN yarn build

FROM nginx:alpine as prod
COPY --from=build /app/dist/ /app
COPY nginx.conf /etc/nginx/nginx.conf
