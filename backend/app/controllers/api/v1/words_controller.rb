class Api::V1::WordsController < ApplicationController
  def create
    Word.create(word_params)
  end

  private

  def word_params
    params.require(:word).permit(:content, :category_id)
  end
end
