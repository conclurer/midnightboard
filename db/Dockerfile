# Latest PostgreSQL docker image
FROM postgres:latest
# Expose port 5432
EXPOSE 5432
# Copy setup.sql into docker-entrypoint-initdb.d
COPY setup.sql /docker-entrypoint-initdb.d/
