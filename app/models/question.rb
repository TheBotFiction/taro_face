# frozen_string_literal: true

class Question < ApplicationRecord
  serialize :answers, Array

  belongs_to :paper_sheet, inverse_of: :questions

  validates :term, presence: true
  validates :phrase, presence: true
  validates :answers, presence: true
end
