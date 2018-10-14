# frozen_string_literal: true

class CreateMessages < ActiveRecord::Migration[5.2]
  def change
    create_table :messages do |t|
      t.text :content
      t.references :character, foreign_key: true
      t.references :conversation, foreign_key: true

      t.timestamps
    end
  end
end
