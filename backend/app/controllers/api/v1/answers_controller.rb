class Api::V1::AnswersController < ApplicationController
  def create
    lesson = Lesson.where(user_id: answer_params[:user_id], category_id: answer_params[:category_id])
    Answer.create(lesson_id: lesson[0][:id], word_id: answer_params[:word_id], choice_id: answer_params[:choice_id])
  end

  private

  def answer_params
    params.require(:answer).permit(:user_id, :category_id, :word_id, :choice_id)
  end
end
