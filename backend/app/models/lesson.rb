class Lesson < ApplicationRecord
  belongs_to :user
  has_many :answers, dependent: :destroy
  has_many :choices, through: :answers

  def count_words
    self.choices.count
  end

  def get_results
    self.choices.where(correct: true).count
  end
end
