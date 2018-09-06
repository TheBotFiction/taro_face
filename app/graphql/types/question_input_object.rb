# frozen_string_literal: true

module Types
  class QuestionInputObject < BaseInputObject
    argument :term,
      String,
      "The main term of the question",
      required: true
    argument :phrase,
      String,
      "The phrase of the question",
      required: true
    argument :answers,
      [String],
      "Array of strings including main term and baits",
      required: true
  end
end
