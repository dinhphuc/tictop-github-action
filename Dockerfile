FROM node:16.13.2-alpine

COPY ./notify /notify
RUN chmod +x "/notify/entrypoint.sh"
ENTRYPOINT ["/notify/entrypoint.sh"]
