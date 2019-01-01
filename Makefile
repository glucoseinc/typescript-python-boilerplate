docker_prefix = typescript-python-boilerplate
dc = docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml

.PHONY: build
build:
	$(dc) build

.PHONY: run
run:
	$(dc) up


.PHONY: ps
ps:
	$(dc) ps
