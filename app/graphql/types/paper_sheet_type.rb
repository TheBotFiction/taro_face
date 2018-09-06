# frozen_string_literal: true

module Types
  class PaperSheetType < BaseObject
    field :id, ID, null: false
    field :questions, [QuestionType], null: true
  end
end
