# frozen_string_literal: true

class CreateTerms < ActiveRecord::Migration[5.2]
  def change
    create_table :terms do |t|
      t.string :term
      t.string :reading
      t.string :meaning

      t.timestamps
    end
  end
end
