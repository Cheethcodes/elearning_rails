class CreateWords < ActiveRecord::Migration[7.0]
  def change
    create_table :words do |t|
      t.string :content, null: false, index: { unique: true }
      t.references :category, :index => true, :foreign_key => true
      t.timestamps
    end
  end
end
