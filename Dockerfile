FROM node:alpine

# ワーキングディレクトリを作成
WORKDIR /usr/src/app

# アプリケーションの依存関係をインストールする
COPY package*.json ./
RUN npm install

# アプリケーションのソースをバンドルする
COPY . .

EXPOSE 3000
# アプリケーションを起動
CMD [ "npm", "start" ]