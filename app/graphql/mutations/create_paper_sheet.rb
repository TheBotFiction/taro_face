# frozen_string_literal: true

module Mutations
  class CreatePaperSheet < BaseMutation
    argument :questions, [Types::QuestionInputObject], required: true do
      description "Array of questions belong to the papersheet"
    end

    field :paper_sheet, Types::PaperSheetType, null: true
    field :errors, [String], null: false
    field :code, Int, null: false

    def resolve(questions:)
      sheet = PaperSheet.new
      questions.each do |question|
        sheet.questions.build(question.to_h)
      end
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
