# frozen_string_literal: true

module Types
  class MutationType < BaseObject
    field :create_term, mutation: Mutations::CreateTerm
    field :create_paper_sheet, mutation: Mutations::CreatePaperSheet
  end
end
