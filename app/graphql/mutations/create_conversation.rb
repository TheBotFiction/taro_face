# frozen_string_literal: true

module Mutations
  class CreateConversation < BaseMutation
    argument :messages, [Types::MessageInputObject],
      "List of conversation's message", required: true
    argument :title, String, required: false
    argument :description, String, required: false

    field :conversation, Types::ConversationType, null: true

    def resolve(messages:, title: nil, description: nil)
      authenticate_user!

      if messages.blank?
        raise GraphQL::ExecutionError, "Variable terms of type [MessageInputObject!]! was provided invalid value"
      end
      conversation = Conversation.new(
        user_id: current_user.id,
        title: title,
        description: description
      )
      messages.each do |message_attrs|
        conversation.messages.build(message_attrs.to_h)
      end
      if conversation.save
        { conversation: conversation }
      else
        raise GraphQL::ExecutionError, conversation.errors.full_messages
      end
    end
  end
end
