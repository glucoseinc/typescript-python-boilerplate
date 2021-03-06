docker_prefix = typescript-python-boilerplate
dc = docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml

.PHONY: build
build:
	$(dc) build

.PHONY: run
run: build
	$(dc) up


.PHONY: ps
ps:
	$(dc) ps

.PHONY: format
format:
	pipenv run format
	yarn run format

.PHONY: lint
lint:
	pipenv run lint
	yarn run lint
	pipenv run typing

.PHONY: test
test: lint
	pipenv run test
	yarn run test
