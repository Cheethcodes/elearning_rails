class CreateAnswers < ActiveRecord::Migration[7.0]
  def change
    create_table :answers do |t|
      t.references :lesson, :index => true, :foreign_key => true
      t.references :word, :index => true, :foreign_key => true
      t.references :choice, :index => true, :foreign_key => true
      t.timestamps
    end
  end
end
