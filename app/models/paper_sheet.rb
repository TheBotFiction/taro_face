# frozen_string_literal: true

class PaperSheet < ApplicationRecord
  has_many :questions, inverse_of: :paper_sheet
end
