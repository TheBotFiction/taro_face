# frozen_string_literal: true

module Types
  class MessageType < BaseObject
    field :id, ID, null: false
    field :content, String, null: false
    field :character_id, ID, null: false
    field :conversation_id, ID, null: false
  end
end
