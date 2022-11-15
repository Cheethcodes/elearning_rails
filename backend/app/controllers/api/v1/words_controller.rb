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
    choice_list = JSON.parse(word_params[:choices])
    create_params = {
        content: word_params[:content],
        category_id: word_params[:category_id],
        choices_attributes: choice_list
    }

    Word.create(create_params)
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
