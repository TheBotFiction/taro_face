# frozen_string_literal: true

source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "2.5.1"

# Bundle edge Rails instead: gem "rails", github: "rails/rails"
gem "rails", "~> 5.2.1"
# Use sqlite3 as the database for Active Record
gem "sqlite3"
# Use Puma as the app server
gem "puma", "~> 3.11"
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
# gem "jbuilder", "~> 2.5"
# Use Redis adapter to run Action Cable in production
# gem "redis", "~> 4.0"
# Use ActiveModel has_secure_password
# gem "bcrypt", "~> 3.1.7"

# Use ActiveStorage variant
# gem "mini_magick", "~> 4.8"

# Use Capistrano for deployment
# gem "capistrano-rails", group: :development

# Reduces boot times through caching; required in config/boot.rb
gem "bootsnap", ">= 1.1.0", require: false

gem "graphql", "~> 1.7", ">= 1.7.14"

# Use Rack CORS for handling Cross-Origin Resource Sharing (CORS), making cross-origin AJAX possible
# gem "rack-cors"

group :development do
  gem "better_errors"
  gem "binding_of_caller"
  gem "guard-bundler"
  gem "guard-rails"
  gem "guard-rspec"
  gem "listen", ">= 3.0.5", "< 3.2"
  gem "rails-erd",  require: false
  gem "rb-fchange", require: false
  gem "rb-fsevent", require: false
  gem "rb-inotify", require: false
  gem "spring"
  gem "spring-commands-rspec"
  gem "spring-watcher-listen", "~> 2.0.0"
end
group :development, :test do
  gem "factory_bot_rails"
  gem "faker"
  gem "pry-rails"
  gem "pry-rescue"
  gem "rspec-rails"
  gem "rspec_junit_formatter"
  gem "rubocop-github"
  gem "rubocop-rspec"
end
group :test do
  gem "capybara", ">= 2.15", "< 4.0"
  gem "chromedriver-helper"
  gem "database_cleaner"
  gem "launchy"
  gem "selenium-webdriver"
  gem "shoulda-matchers", "~> 3.1"
  gem "simplecov", require: false
  gem "timecop"
end


# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]
