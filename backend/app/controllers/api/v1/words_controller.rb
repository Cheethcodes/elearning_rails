class Api::V1::WordsController < ApplicationController
  def index
    words = Word.all.order(:category_id)
    render json: words.to_json(:include => [:category])
  end

  def show_by_category
    words = Word.where(category_id: word_params[:category_id])
    render json: words
  end

  def show
    word = Word.find(params[:id])
    render json: word
  end

  def create
    word = Word.create(content: word_params[:content], category_id: word_params[:category_id])

    choice_list = JSON.parse(word_params[:choices])

    for choice in choice_list do
      Choice.create(content: choice["content"], correct: choice["correct"], word_id: word.id)
    end
  end

  def update
    word = Word.find(params[:id])
    word.update(word_params)
  end

  def destroy
    word = Word.find(params[:id])
    word.destroy
  end

  private

  def word_params
    params.require(:word).permit(:content, :category_id, :choices)
  end
end
