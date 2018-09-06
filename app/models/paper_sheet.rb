# frozen_string_literal: true

class PaperSheet < ApplicationRecord
  serialize :answers, Array
end
