# frozen_string_literal: true

class CreatePaperSheets < ActiveRecord::Migration[5.2]
  def change
    create_table :paper_sheets do |t|
      t.string :term, null: false, index: true
      t.text :phrase, null: false
      t.text :answers, null: false
      t.text :raw_data, null: true

      t.timestamps
    end
  end
end
