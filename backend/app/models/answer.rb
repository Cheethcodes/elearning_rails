class Answer < ApplicationRecord
  belongs_to :lesson

  before_save do
      lesson.touch
  end
end
