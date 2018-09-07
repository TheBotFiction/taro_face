# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    field :term, TermType, null: true do
      description "Find a Term by ID"
      argument :id, ID, required: true
    end

    field :terms, [TermType], null: true do
      description "List all Term"
    end

    field :paper_sheet, PaperSheetType, null: true do
      description "Find a PaperSheet by ID"
      argument :id, ID, required: true
    end

    def term(id:)
      Term.find id
    end

    def terms
      Term.all
    end

    def paper_sheet(id:)
      PaperSheet.find id
    end
  end
end
