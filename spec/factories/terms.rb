# frozen_string_literal: true

FactoryBot.define do
  factory :term do
    user
    sequence(:term) { |i| "term#{i}" }
    reading { "term-reading" }
    meaning { "term-meaning" }
  end
end
