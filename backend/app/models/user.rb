class User < ApplicationRecord
        extend Devise::Models
        # Include default devise modules.
        devise :database_authenticatable, :registerable,
                :recoverable, :rememberable, :validatable
        include DeviseTokenAuth::Concerns::User

        validates :username, length: {minimum:4, maximum:10}, allow_blank: false
        validates :password, length: {minimum:6, maximum:20}, allow_blank: false
end
