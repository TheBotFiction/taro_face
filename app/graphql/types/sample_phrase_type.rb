module Types
  class SamplePhraseType < BaseObject
    field :id, ID, null: true
    field :phrase, String, null: true, description: "The phrase associated with Term"
    field :term, TermType, null: true, description: "Associated Term"

    def term
      Loaders::RecordLoader.for(Term).load(object.term_id)
    end
  end
end
