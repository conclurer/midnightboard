# Latest PostgreSQL docker image
FROM postgres:latest
# Expose port 5432
EXPOSE 5432
# Copy backup.sql into docker-entrypoint-initdb.d
COPY backup.sql /docker-entrypoint-initdb.d/
