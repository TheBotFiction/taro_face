# frozen_string_literal: true

class AddUserReferenceToTerm < ActiveRecord::Migration[5.2]
  def change
    add_reference :terms, :user, foreign_key: true
  end
end
