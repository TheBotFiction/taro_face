# frozen_string_literal: true

module Types
  class PaperSheetType < BaseObject
    field :id, ID, null: false
    field :term, String, null: false
    field :phrase, String, null: false
    field :answers, [String], null: false
  end
end
