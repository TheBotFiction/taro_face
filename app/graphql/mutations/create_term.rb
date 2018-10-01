# frozen_string_literal: true

module Mutations
  class CreateTerm < BaseMutation
    argument :term, String, required: true
    argument :reading, String, required: false
    argument :meaning, String, required: false

    field :code, Integer, null: false
    field :term, Types::TermType, null: true
    field :errors, [String], null: false

    def resolve(term:, reading: nil, meaning: nil)
      authenticate_user!
      term = Term.new(term: term, reading: reading, meaning: meaning)
      term.user = context[:current_user]
      if term.save
        {
          code: 201,
          term: term,
          errors: []
        }
      else
        {
          code: 422,
          errors: term.errors.full_messages
        }
      end
    end
  end
end
