# frozen_string_literal: true

FactoryBot.define do
  factory :question do
    paper_sheet
    term { "MyString" }
    phrase { "MyString" }
    answers { ["MyText"] }
  end
end
