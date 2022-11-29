class Api::V1::LessonsController < ApplicationController
  def create
    if Lesson.where(user_id: lesson_params[:user_id], category_id: lesson_params[:category_id]).count === 0
      lesson = Lesson.create(lesson_params)
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
    lesson.create_activity(user_id: lesson_params[:user_id])
    answers = Answer.where(lesson_id: lesson.id)
    answer_list = answers.map{ |answer|
      user_choice = Choice.find(answer[:choice_id])
      word = Word.find(answer[:word_id])
      correct_answer = Choice.find_by(word_id: user_choice[:word_id], correct: true)

      choice = {
        word: word,
        user_choice: user_choice,
        correct_answer: correct_answer
      }
    }

    render json: {
      total: lesson.count_words,
      score: result,
      answers: answer_list
    }
  end

  private

  def lesson_params
    params.require(:lesson).permit(:user_id, :score, :category_id)
  end
end
