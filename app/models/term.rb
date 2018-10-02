# frozen_string_literal: true

class Term < ApplicationRecord
  has_many :sample_phrases
  belongs_to :user

  validates :term, presence: true, uniqueness: true
end
