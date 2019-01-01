# css/js asset
FROM typescript-python-boilerplate-frontend:latest as frontend

# 
FROM python:3.7-alpine3.8

WORKDIR /app

# setup modules
COPY Pipfile Pipfile.lock setup.py ./
RUN apk --update add gettext && \
  apk --virtual .build-deps add build-base && \
  pip install -U pip pipenv && \
  pipenv install -v --system --deploy && \
  apk del --purge .build-deps

COPY services/webapp/entrypoint.sh services/webapp/wait_host.sh ./
COPY --from=frontend /build/static/manifest.json ./static/
COPY . .

EXPOSE 80

ENTRYPOINT ["./entrypoint.sh"]
CMD ["run", "--host", "0.0.0.0", "--port", "80"]
