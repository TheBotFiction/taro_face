module Types
  class SamplePhraseType < BaseObject
    field :id, ID, null: true
    field :phrase, String, null: true
    field :term, TermType, null: true
  end
end
