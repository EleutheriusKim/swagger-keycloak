# 첫 번째 빌드 단계 (빌드 스테이지)
FROM node:18-alpine as build

# 앱 디렉토리를 만들고 작업 디렉토리로 설정합니다.
WORKDIR /usr/src/app

# 앱 종속성 설치
COPY package*.json ./
RUN npm ci

# 앱 소스를 복사합니다.
COPY . .

# 앱을 빌드합니다.
# RUN npm run build

# 두 번째 빌드 단계 (런타임 스테이지)
FROM node:18-alpine

WORKDIR /usr/src/app

# 첫 번째 빌드 단계에서 생성된 빌드 아티팩트를 복사합니다.
COPY --from=build /usr/src/app /usr/src/app

EXPOSE 3000

# 앱을 실행합니다.
CMD ["npm", "start"]