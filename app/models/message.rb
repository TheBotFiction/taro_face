# frozen_string_literal: true

class Message < ApplicationRecord
  belongs_to :character
  belongs_to :conversation
  validates :content, presence: true
end
