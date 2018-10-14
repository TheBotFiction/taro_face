# frozen_string_literal: true

module Types
  class ConversationType < BaseObject
    field :id, ID, null: false
    field :title, String, null: true
    field :description, String, null: true
    field :messages, [MessageType], null: true,
      description: "List of messages in the conversation"
  end
end
