# frozen_string_literal: true

module Types
  class TermType < BaseObject
    field :id, ID, null: true
    field :term, String, null: true
    field :reading, String, null: true
    field :meaning, String, null: true
    field :sample_phrases, [SamplePhraseType], null: true,
      description: "List of sample phrase associated to term"

    def sample_phrases
      Loaders::AssociationLoader.for(Term, :sample_phrases).load(object)
    end
  end
end
