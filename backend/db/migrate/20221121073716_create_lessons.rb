class CreateLessons < ActiveRecord::Migration[7.0]
  def change
    create_table :lessons do |t|
      t.references :user, :index => true, :foreign_key => true
      t.references :category, :index => true, :foreign_key => true
      t.integer :score
      t.timestamps
    end
  end
end
