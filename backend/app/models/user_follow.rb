class UserFollow < ApplicationRecord
  has_one :activity, as: :action
end
  
