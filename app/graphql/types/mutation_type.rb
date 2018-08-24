# frozen_string_literal: true

module Types
  class MutationType < BaseObject
    field :create_term, mutation: Mutations::CreateTerm
  end
end
