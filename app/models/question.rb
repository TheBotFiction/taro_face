# frozen_string_literal: true

class Question < ApplicationRecord
  serialize :answers, Array

  belongs_to :paper_sheet, inverse_of: :questions
end
