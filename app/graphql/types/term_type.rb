module Types
  class TermType < BaseObject
    field :id, ID, null: true
    field :term, String, null: true
    field :reading, String, null: true
    field :meaning, String, null: true
    field :sample_phrases, [SamplePhraseType], null: true, resolve: ->(obj, _args, _ctx) do
      Loaders::AssociationLoader.for(Term, :sample_phrases).load(obj)
    end
  end
end
