# Стадія 1: збірка додатку
FROM node:22.19 AS build

WORKDIR /app

# Копіюємо package.json і package-lock.json для кешування
COPY package*.json ./

RUN npm install

# Копіюємо увесь код проєкту
ENV REACT_APP_API_BASE_URL=http://localhost:8080
COPY . .

# Збираємо додаток для продакшену
RUN npm run build

# Стадія 2: запуск через Nginx
FROM nginx:stable-alpine

# Копіюємо зібрані файли зі стадії збірки
COPY --from=build /app/build /usr/share/nginx/html

# Відкриваємо порт 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]