# frozen_string_literal: true

class CreateConversations < ActiveRecord::Migration[5.2]
  def change
    create_table :conversations do |t|
      t.string :title
      t.text :description
      t.references :user

      t.timestamps
    end
  end
end
