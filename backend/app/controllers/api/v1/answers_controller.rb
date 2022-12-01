class Api::V1::AnswersController < ApplicationController
  def create
    Answer.create(lesson_id: answer_params[:lesson_id], word_id: answer_params[:word_id], choice_id: answer_params[:choice_id])

    if answer_params[:trigger] === true
      lesson = Lesson.find(answer_params[:lesson_id])
      result = lesson.get_results
      lesson.update!(score: result)
      lesson.create_activity(user_id: lesson[:user_id])
    end
  end

  private

  def answer_params
    params.require(:answer).permit(:lesson_id, :word_id, :choice_id, :trigger)
  end
end
