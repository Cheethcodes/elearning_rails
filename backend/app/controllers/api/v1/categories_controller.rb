class Api::V1::CategoriesController < ApplicationController
  def index
    category = Category.all
    render json: category
  end

  def show
    category = Category.find(params[:id])
    render json: category
  end

  def create
    Category.create(category_params)
  end

  private

  def category_params
    params.require(:category).permit(:name, :description)
  end
end