class Category < ApplicationRecord
  has_many :words
  has_many :lessons
end
