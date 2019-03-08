.PHONY: build clean up
all: clean build up

TARGET = dev
DOCKER_COMPOSE = sudo docker-compose -f docker-compose-files/docker-compose.prod.yml
ifeq ($(strip $(TARGET)),prod-local)
    DOCKER_COMPOSE += -f docker-compose-files/docker-compose.prod.local.yml
endif
ifeq ($(strip $(TARGET)),dev)
    DOCKER_COMPOSE += -f docker-compose-files/docker-compose.prod.local.yml
    DOCKER_COMPOSE += -f docker-compose-files/docker-compose.dev.yml
endif

build:
	$(DOCKER_COMPOSE) build

clean:
	$(DOCKER_COMPOSE) rm -f

up:
	$(DOCKER_COMPOSE) up
