# frozen_string_literal: true

module Types
  class MessageInputObject < BaseInputObject
    argument :characterId, ID, "ID of character", required: true
    argument :content, String, "The message", required: true
  end
end
