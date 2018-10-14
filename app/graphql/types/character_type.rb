# frozen_string_literal: true

module Types
  class CharacterType < BaseObject
    field :id, ID, null: false
    field :name, String, null: true
    field :messages, [String], null: false
  end
end
