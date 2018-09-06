# frozen_string_literal: true

module Types
  class QuestionType < BaseObject
    field :id, ID, null: false
    field :term, String, null: false
    field :phrase, String, null: false
    field :answers, [String], null: false
  end
end
