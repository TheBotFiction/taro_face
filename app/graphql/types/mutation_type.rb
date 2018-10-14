# frozen_string_literal: true

module Types
  class MutationType < BaseObject
    field :create_term, mutation: Mutations::CreateTerm
    field :create_terms, mutation: Mutations::CreateTerms
    field :create_paper_sheet, mutation: Mutations::CreatePaperSheet
    field :create_conversation, mutation: Mutations::CreateConversation
  end
end
