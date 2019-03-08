# Paper references explorer
The explorer gives you an overview on all papers your given papers are referencing. 

## How to use?
1. Add a list of papers you want to analyse
2. Get the overview on all the papers your added papers are referencing.

## Features
- number of times a paper was referenced by your paper
- visually highlight papers that are more important for your added papers

![current website](website.gif "current website")

## Dev

### Docker
#### Setup
Please make sure you have `docker>=18.06.1-ce` and `docker-compose>=1.22.0` installed.
First, follow the instructions for the backend in 
[https://github.com/paper-reference-explorer/pre-backend](). 
For all following subsections, the frontend can be reached via
[http://www.pre.localhost/]() once the steps have been followed. 

#### Dev
To start the development environment, simply run `make`. 
This will start the docker containers. 
The services are using a reverse-proxy called 
[traefik](https://traefik.io/). 
The dashboard of it can be reached via
[http://localhost:8080/dashboard/]().
This will map the `index.ejs` and the `app/` folder into the docker container 
which enables auto-reload. 

#### Prod-local
This environment compiles the app and publishes it with 
[nginx](https://www.nginx.com/), a static web server.
As in the dev environment, this will also start traefik.
To start a local version of the production environment, simply run 
`make TARGET=prod-local`.

#### Prod
This environment is similar to prod-local except it doesn't start traefik
and the labels for routing with traefik are different. 
The former is because it assumes traefik is already running on the server
and the application only needs to join the network.
The latter is because the domain names are the production values. 
To start the production environment, simply run 
`make TARGET=prod`.

### Traditional
#### Setup
Run `yarn` in the project folder. This installs the required dependencies.

#### Dev
For development, run `yarn run dev` in the project folder. 
The dev webserver can be reached at [http://localhost:8080](http://localhost:8080). 

#### Prod-local
You can create the bundled files by running `yarn build`. 
The generated files will be in `./dist`
