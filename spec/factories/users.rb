# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    sequence(:email) { |i| "user-#{i + 1}@example.com" }
  end
end
