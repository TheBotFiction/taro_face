# frozen_string_literal: true

class AddUserReferenceToPaperSheet < ActiveRecord::Migration[5.2]
  def change
    add_reference :paper_sheets, :user, foreign_key: true
  end
end
