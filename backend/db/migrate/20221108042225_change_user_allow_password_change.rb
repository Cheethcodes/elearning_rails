class ChangeUserAllowPasswordChange < ActiveRecord::Migration[7.0]
  def up
    change_table :users do |t|
      t.change_default(:allow_password_change, true)
    end
  end

  def down
    change_table :users do |t|
      t.change_default(:allow_password_change, false)
    end
  end
end
