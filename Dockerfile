FROM python:3.13-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    UV_COMPILE_BYTECODE=1 \
    UV_LINK_MODE=copy

COPY --from=ghcr.io/astral-sh/uv:0.13 /uv /usr/local/bin/uv
WORKDIR /app

COPY pyproject.toml uv.lock ./
RUN uv sync --frozen --no-dev

COPY . .
RUN DJANGO_SECRET_KEY=build-only uv run --no-dev python manage.py collectstatic --noinput

EXPOSE 8000
CMD ["sh", "-c", "uv run --no-dev python manage.py migrate --noinput && uv run --no-dev gunicorn config.wsgi:application --bind 0.0.0.0:8000 --workers 3"]
