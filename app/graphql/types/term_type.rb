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
    field :similars, [TermType], null: true do
      description "Similar terms"
    end

    def sample_phrases(limit: 5, order: nil)
      Loaders::AssociationLoader.for(
        Term,
        :sample_phrases,
        limit: limit,
        order: order
      ).load(object)
    end

    def similars
      term_count = Term.count
      anchor = rand(1..term_count)
      arel = Term.arel_table
      if ["lt", "gt"].sample == "lt"
        query = arel[:id].lteq(anchor)
      else
        query = arel[:id].gteq(anchor)
      end
      query = query.and(arel[:id].not_eq(object.id))

      if ["first", "last"].sample == "first"
        Term.where(query).first(3)
      else
        Term.where(query).last(3)
      end
    end
  end
end
