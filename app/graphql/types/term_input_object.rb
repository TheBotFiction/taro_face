# frozen_string_literal: true

module Types
  class TermInputObject < BaseInputObject
    argument :term, String, "The main term", required: true
    argument :reading, String, required: false
    argument :meaning, String, required: false
  end
end
