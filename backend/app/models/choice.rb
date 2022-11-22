class Choice < ApplicationRecord
  belongs_to :word
  has_many :answers, dependent: :destroy

  before_save do
      word.touch
  end
end
