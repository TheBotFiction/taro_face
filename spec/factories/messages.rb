# frozen_string_literal: true

FactoryBot.define do
  factory :message do
    content { "MyText" }
    character
    conversation
  end
end
