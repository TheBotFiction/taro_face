# frozen_string_literal: true

FactoryBot.define do
  factory :character do
    sequence(:name) { |i| "Character Name #{i}" }
  end
end
