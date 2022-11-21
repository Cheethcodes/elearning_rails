class Api::V1::LessonsController < ApplicationController
  def create
    Lesson.create(lesson_params)
  end

  private

  def lesson_params
    params.require(:lesson).permit(:user_id, :score, :category_id, answers_attributes: [:word_id, :choice_id])
  end
end
