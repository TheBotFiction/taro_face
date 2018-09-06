# frozen_string_literal: true

module Mutations
  class CreatePaperSheet < BaseMutation
    argument :term, String, required: true do
      description "The chosen term"
    end
    argument :phrase, String, required: true
    argument :answers, [String], required: true

    field :paper_sheet, Types::PaperSheetType, null: true
    field :errors, [String], null: false
    field :code, Int, null: false

    def resolve(term:, phrase:, answers:)
      sheet = PaperSheet.new(term: term, phrase: phrase, answers: answers)
      if sheet.save
        {
          paper_sheet: sheet,
          code: 201,
          errors: []
        }
      else
        {
          code: 422,
          errors: sheet.errors.full_messages
        }
      end
    end
  end
end
