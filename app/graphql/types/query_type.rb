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

    field :analyzed_terms, [TermType], null: true do
      description "Get the analyzed tems from given text"
      argument :q, String, required: true
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

    def analyzed_terms(q:)
      analyzer = PhraseAnalyzer.new(q)
      data = analyzer.call
      data.map do |d|
        Term.new term: d[:term], reading: d[:reading]
      end
    end
  end
end
