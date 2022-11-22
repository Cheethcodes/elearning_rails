class Api::V1::AnswersController < ApplicationController
  def create
    Answer.create(answer_params)
  end

  private

  def answer_params
    params.require(:answer).permit(:lesson_id, :word_id, :choice_id)
  end
end
