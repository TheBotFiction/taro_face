module Types
  class SamplePhraseType < BaseObject
    field :id, ID, null: true
    field :phrase, String, null: true
    field :term, TermType, null: true, resolve: -> (obj, _args, _ctx) do
      Loaders::RecordLoader.for(Term).load(obj.term_id)
    end
  end
end
