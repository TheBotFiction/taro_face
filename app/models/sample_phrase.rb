# frozen_string_literal: true

class SamplePhrase < ApplicationRecord
  belongs_to :term

  validates :phrase, presence: true
end
