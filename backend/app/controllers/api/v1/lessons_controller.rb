class Api::V1::LessonsController < ApplicationController
  def create
    if Lesson.where(user_id: lesson_params[:user_id], category_id: lesson_params[:category_id]).count === 0
      Lesson.create(lesson_params)
    end
  end

  def show_lesson_info
    lesson = Lesson.find_by(user_id: lesson_params[:user_id], category_id: lesson_params[:category_id])
    render json: lesson
  end

  def show_results
    lesson = Lesson.find_by(user_id: lesson_params[:user_id], category_id: lesson_params[:category_id])
    result = lesson.get_results
    lesson.update!(score: result)
    status = result

    render json: {
      total: lesson.count_words,
      score: result
    }
  end

  private

  def lesson_params
    params.require(:lesson).permit(:user_id, :score, :category_id)
  end
end