FROM node:16.13.2-alpine

COPY ./notify /notify
RUN chmod +x "/notify/entrypoint.sh"
ENTRYPOINT ["/notify/entrypoint.sh"]

LABEL "com.github.actions.name"="Send Push Notification"
LABEL "com.github.actions.description"="Receive push notification to your devices using Github Actions"
LABEL "com.github.actions.icon"="send"
LABEL "com.github.actions.color"="red"
LABEL "repository"="http://github.com/dinhphuc/tictop-github-action"
LABEL "homepage"="https://www.tictop.vn/"
LABEL "maintainer"="services@tictop.app"
