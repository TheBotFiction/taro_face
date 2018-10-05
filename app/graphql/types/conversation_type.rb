# frozen_string_literal: true

module Types
  class ConversationType < BaseObject
    field :id, ID, null: false
    field :messages, [MessageType], null: true,
      description: "List of messages in the conversation"
  end
end