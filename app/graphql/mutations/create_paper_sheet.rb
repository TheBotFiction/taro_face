# frozen_string_literal: true

module Mutations
  class CreatePaperSheet < BaseMutation
    include ContextAuthenticatable

    argument :questions,
      [Types::QuestionInputObject],
      "Array of questions belong to the papersheet",
      required: true

    field :paper_sheet, Types::PaperSheetType, null: true
    field :errors, [String], null: false
    field :code, Int, null: false

    def resolve(questions:)
      authenticate_user!
      # TODO: improve
      if questions.blank?
        raise GraphQL::ExecutionError, "Variable question of type [QuestionInputObject!]! was provided invalid value"
      end
      sheet = PaperSheet.new
      sheet.user = current_user
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
