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

## devise + devise-fireauth
```ruby
# Gemfile
gem "devise"
gem "devise-fireauth"
```
```bash
$ bundle install
$ rails generate devise:install
```
- Modify `config/initializers/devise.rb`
```diff
- # config.authentication_keys = [:email]
+ config.authentication_keys = [:id_token]
- config.strip_whitespace_keys = [:email]
+ config.strip_whitespace_keys = [:email, :id_token]
+ config.fireauth do |c|
+   c.api_key = Chamber.env.firebase.api_key
+ end
```

- Modify `config/settings.yml`
```diff
development:
+ firebase:
+   _secure_api_key: The-API-Key
```
- Secure the credentials by running `chamber secure`
- Generate `User` model
```bash
$ rails generate devise User
```
- Modify `app/models/user.rb`
```diff
- devise :database_authenticatable, :registerable,
-        :recoverable, :rememberable, :validatable
+ devise :firebase_authenticatable
```
```bash
$ rails db:migrate --trace
```
