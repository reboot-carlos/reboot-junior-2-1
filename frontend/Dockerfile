FROM nginx:1.27-alpine
COPY . /usr/share/nginx/html
# Use nginx templates dir — envsubst replaces ${BACKEND_PORT} at container startup
COPY nginx.conf /etc/nginx/templates/default.conf.template
# Default port if Railway doesn't override
ENV BACKEND_PORT=8000
