#!/bin/bash

#set -euo pipefail

python manage.py collectstatic --no-input
python manage.py makemigrations
python manage.py migrate
python manage.py loaddata fixture-ingredients.json fixture-measures.json

if [[ "$DJANGO_SUPERUSER_EMAIL" ]];
then
    python manage.py createsuperuser \
        --noinput \
        --email $DJANGO_SUPERUSER_EMAIL
fi

if [[ "$DJANGO_ENV" = "PRODUCTION" ]]; then
  gunicorn -b 0.0.0.0:8000 \
    --access-logfile - backend_api.wsgi:application
else
  python manage.py runserver 0.0.0.0:8000
fi