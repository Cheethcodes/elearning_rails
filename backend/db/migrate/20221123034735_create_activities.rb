class CreateActivities < ActiveRecord::Migration[7.0]
  def change
    create_table :activities do |t|
      t.integer :action_id
      t.string :action_type
      t.references :user, :index => true, :foreign_key => true
      t.timestamps
    end
  end
end
