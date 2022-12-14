class Api::V1::CategoriesController < ApplicationController
  def index
    category = Category.all
    render json: category.to_json(include: [:words])
  end

  def show
    category = Category.find(params[:id])
    render json: category
  end

  def show_words
    words = Word.where(category_id: params[:id])
    render json: words.to_json(include: [:choices])
  end

  def create
    Category.create(category_params)
  end

  def update
    category = Category.find(params[:id])
    category.update(category_params)
  end

  def destroy
    category = Category.find(params[:id])
    category.destroy
  end

  private

  def category_params
    params.require(:category).permit(:name, :description)
  end
end
