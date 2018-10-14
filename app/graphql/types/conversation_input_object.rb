# frozen_string_literal: true

module Types
  class ConversationInputObject < BaseInputObject
    argument :messages, [MessageInputObject],
      "List of messages in the conversation", required: true
  end
end
