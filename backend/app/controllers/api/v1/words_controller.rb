class Api::V1::WordsController < ApplicationController
  def index
    words = Word.all.order(:category_id)
    render json: words.to_json(:include => [:category])
  end

  def show
    word = Word.find(params[:id])
    render json: word.to_json(include: [:choices])
  end

  def create
    Word.create(word_params)
  end

  def update
    word = Word.find(params[:id])
    word.update!(word_params)
  end

  def destroy
    word = Word.find(params[:id])
    word.destroy
  end

  private

  def word_params
    params.require(:word).permit(:content, :category_id, choices_attributes: [:id, :content, :correct])
  end
end
