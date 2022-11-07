class User < ApplicationRecord
  extend Devise::Models

  attr_accessor :skip_validations

  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User

  validates :username, length: {minimum:4, maximum:10}, allow_blank: false
end
