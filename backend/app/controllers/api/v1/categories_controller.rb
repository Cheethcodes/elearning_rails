class Api::V1::CategoriesController < ApplicationController
  def create
    Category.create(category_params)
  end

  private

  def category_params
    params.require(:category).permit(:name, :description)
  end
end
