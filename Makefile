.PHONY: build clean dev prod prod-local

build:
	sudo docker-compose -f docker-compose-files/docker-compose.prod.yml \
-f docker-compose-files/docker-compose.prod.local.yml -f docker-compose-files/docker-compose.dev.yml build
# 	sudo docker-compose -f docker-compose-files/docker-compose.prod.yml \
# -f docker-compose-files/docker-compose.prod.local.yml build

clean:
	sudo docker-compose -f docker-compose-files/docker-compose.prod.yml \
-f docker-compose-files/docker-compose.prod.local.yml -f docker-compose-files/docker-compose.dev.yml rm

dev:
	sudo docker-compose -f docker-compose-files/docker-compose.prod.yml \
-f docker-compose-files/docker-compose.prod.local.yml -f docker-compose-files/docker-compose.dev.yml up \
--abort-on-container-exit website

logs:
	sudo docker-compose -f docker-compose-files/docker-compose.prod.yml \
-f docker-compose-files/docker-compose.prod.local.yml -f docker-compose-files/docker-compose.dev.yml logs

prod:
	sudo docker-compose -f docker-compose-files/docker-compose.prod.yml up

prod-local:
	sudo docker-compose -f docker-compose-files/docker-compose.prod.yml \
-f docker-compose-files/docker-compose.prod.local.yml up
