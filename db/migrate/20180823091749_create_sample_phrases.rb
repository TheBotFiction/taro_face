# frozen_string_literal: true

class CreateSamplePhrases < ActiveRecord::Migration[5.2]
  def change
    create_table :sample_phrases do |t|
      t.text :phrase
      t.references :term, foreign_key: true

      t.timestamps
    end
  end
end
