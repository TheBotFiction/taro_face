module Types
  class QueryType < Types::BaseObject
    field :term, TermType, null: true do
      description "Find a Term by ID"
      argument :id, ID, required: true
    end

    field :terms, [TermType], null: true do
      description "List all Term"
    end

    def term(id:)
      Term.find id
    end

    def terms
      Term.all
    end
  end
end
