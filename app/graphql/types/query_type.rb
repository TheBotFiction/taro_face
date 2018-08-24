module Types
  class QueryType < Types::BaseObject
    field :term, TermType, null: true do
      description "Find a Term by ID"
      argument :id, ID, required: true
    end

    def term(id:)
      Term.find id
    end
  end
end
