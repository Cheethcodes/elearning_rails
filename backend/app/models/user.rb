class User < ApplicationRecord
  extend Devise::Models

  mount_uploader :avatar, AvatarUploader
  
  attr_accessor :skip_validations

  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User

  validates :username, length: {minimum:4, maximum:10}, allow_blank: false

  has_many :lessons, dependent: :destroy
  has_many :activities, dependent: :destroy
end
