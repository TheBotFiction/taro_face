# frozen_string_literal: true

module Mutations
  class CreateTerms < BaseMutation
    argument :terms,
      [Types::TermInputObject],
      "Array of terms that being created",
      required: true

    field :terms, [Types::TermType], null: true
    # TODO:
    # Move errors and code to base class
    field :errors, [String], null: false
    field :code, Int, null: false

    def resolve(terms:)
      authenticate_user!

      if terms.blank?
        raise GraphQL::ExecutionError, "Variable terms of type [TermInputObject!]! was provided invalid value"
      end
      created_terms = []
      errors = []
      terms.each do |term_attributes|
        term = Term.new term_attributes.to_h
        term.user = context[:current_user]
        if term.save
          created_terms.push term
        else
          errors.push(*term.errors.full_messages)
        end
      end
      # TODO:
      # Think again about this logic
      code = created_terms.present? ? 201 : 422
      {
        terms: created_terms,
        code: code,
        errors: errors
      }
    end
  end
end
