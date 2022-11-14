class CreateChoices < ActiveRecord::Migration[7.0]
  def change
    create_table :choices do |t|
      t.string :content
      t.boolean :correct
      t.references :word, :index => true, :foreign_key => true
      t.timestamps
    end
  end
end
