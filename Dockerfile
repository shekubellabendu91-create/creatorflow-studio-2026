FROM nginx:1.27-alpine

LABEL org.opencontainers.image.title="CreatorFlow Studio" \
      org.opencontainers.image.description="Static short-form content toolkit and CreatorDesk prototype"

COPY index.html style.css app.js content.js /usr/share/nginx/html/
COPY creator-desk/ /usr/share/nginx/html/creator-desk/

EXPOSE 80
