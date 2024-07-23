#!/bin/bash

#set -euo pipefail

echo "1"
python manage.py collectstatic --no-input
echo "2"
python manage.py makemigrations
echo "3"
python manage.py migrate
echo "4"
python manage.py loaddata fixture-ingredients.json fixture-measures.json
echo "5"

if [ "$DJANGO_SUPERUSER_EMAIL" ];
then
    python manage.py createsuperuser \
        --noinput \
        --email $DJANGO_SUPERUSER_EMAIL
fi
echo "6"
if [ "$DJANGO_ENV" = "PRODUCTION" ];
then
  gunicorn -b 0.0.0.0:8000 \
    --access-logfile - settings.wsgi:application
    echo "7"
else
  python manage.py runserver 0.0.0.0:8000
fi
