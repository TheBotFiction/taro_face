# frozen_string_literal: true

class Conversation < ApplicationRecord
  belongs_to :user
  has_many :messages
end
