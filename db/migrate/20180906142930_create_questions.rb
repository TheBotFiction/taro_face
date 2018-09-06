class CreateQuestions < ActiveRecord::Migration[5.2]
  def change
    create_table :questions do |t|
      t.references :paper_sheet, foreign_key: true
      t.string :term
      t.string :phrase
      t.text :answers

      t.timestamps
    end
  end
end
