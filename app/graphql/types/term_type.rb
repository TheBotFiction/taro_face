# frozen_string_literal: true

module Types
  class TermType < BaseObject
    field :id, ID, null: true
    field :term, String, null: true
    field :reading, String, null: true
    field :meaning, String, null: true
    field :sample_phrases, [SamplePhraseType], null: true do
      description  "List of sample phrase associated to term"
      argument :limit, Integer, required: false,
        description: "Limit the phrase returned. Default is 5"
      argument :order, String, required: false,
        description: "DESC or ASC. Default is ASC"
    end

    def sample_phrases(limit: 5, order: nil)
      Loaders::AssociationLoader.for(
        Term,
        :sample_phrases,
        limit: limit,
        order: order
      ).load(object)
    end
  end
end
