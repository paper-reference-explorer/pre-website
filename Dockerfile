FROM node:alpine as dev
WORKDIR /usr/src/app
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
EXPOSE 8080
CMD ["yarn", "run", "dev"]

FROM dev as build
RUN yarn build

FROM nginx:alpine as prod
COPY --from=build /usr/src/app/dist/ /usr/share/nginx/html/
