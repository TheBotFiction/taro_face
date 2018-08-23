module Types
  class TermType < BaseObject
    field :id, ID, null: true
    field :term, String, null: true
    field :reading, String, null: true
    field :meaning, String, null: true
    field :sample_phrases, [SamplePhraseType], null: true
  end
end
