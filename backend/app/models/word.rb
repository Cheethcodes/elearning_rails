class Word < ApplicationRecord
  belongs_to :category
  has_many :choices
end
