class CreateUserFollows < ActiveRecord::Migration[7.0]
  def change
    create_table :user_follows do |t|
      t.references :follower, null: false
      t.references :followed, null: false
      t.timestamps
    end

    add_foreign_key :user_follows, :users, column: :follower_id
    add_foreign_key :user_follows, :users, column: :followed_id
  end
end
