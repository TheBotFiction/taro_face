class Term < ApplicationRecord
  has_many :sample_phrases
  validates :term, presence: true, uniqueness: true
end
