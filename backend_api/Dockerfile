FROM python:3.11-slim-buster

SHELL ["/bin/bash", "-c"]

ENV  PYTHONFAULTHANDLER=1 \
  PYTHONUNBUFFERED=1 \
  PYTHONHASHSEED=random \
  # pip:
  PIP_NO_CACHE_DIR=off \
  PIP_DISABLE_PIP_VERSION_CHECK=on \
  PIP_DEFAULT_TIMEOUT=100 \
  # poetry:
  POETRY_VERSION=1.7.1 \
  POETRY_VIRTUALENVS_CREATE=false \
  POETRY_CACHE_DIR='/var/cache/pypoetry'

# System deps:
RUN apt update && \
  apt install --no-install-recommends -y \
  build-essential \
  nano \
  libpq-dev \
  wget \
  # Cleaning cache:
  && apt autoremove -y && apt clean -y && rm -rf /var/lib/apt/lists/* \
  # Installing `poetry` package manager:
  # https://github.com/python-poetry/poetry
  && pip install "poetry-core==1.8.1" "poetry==$POETRY_VERSION" && poetry --version

RUN useradd -rms /bin/bash django && chmod 777 /opt /run

# Copy only requirements, to cache them in docker layer
WORKDIR /usr/src/TasteMaker/backend_api/

RUN mkdir /usr/src/TasteMaker/backend_api/static && \
    mkdir /usr/src/TasteMaker/backend_api/media && \
    chown -R django:django /usr/src/TasteMaker/backend_api/ && \
    chmod 755 /usr/src/TasteMaker/backend_api/


COPY --chown=django:django . .

# Project initialization:
RUN poetry config virtualenvs.create false && \
    poetry install --no-interaction --no-ansi

USER django

## Setting up proper permissions:
RUN chmod +x start-web.sh

EXPOSE 8000

ENTRYPOINT ["./start-web.sh"]