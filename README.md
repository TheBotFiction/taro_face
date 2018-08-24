# Taro Face [![CircleCI](https://circleci.com/gh/TheBotFiction/taro_face/tree/master.svg?style=svg)](https://circleci.com/gh/TheBotFiction/taro_face/tree/master)
## Setup development
```bash
git clone git@github.com:TheBotFiction/taro_face.git
cd taro_face
bundle install
rails db:create db:migrate db:seed
```
and go
```bash
rails server
```

## Endpoint
- GraphQL: http://localhost:3000/graphql
- GraphIQL: http://localhost:3000/graphiql
