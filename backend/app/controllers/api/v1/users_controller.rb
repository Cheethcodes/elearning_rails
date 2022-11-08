class Api::V1::UsersController < ApplicationController
  def show
    user = User.find(params[:id])
    render json: user
  end

  def update_avatar
    user = User.find(params[:user_id])
    user.update(avatar: avatar_params[:avatar])
    
    uploader = AvatarUploader.new(user, :avatar)
    uploader.store!(avatar_params[:avatar])

    render json: avatar_params
  end

  private

  def avatar_params
    params.require(:avatar).permit(:has_avatar, :avatar)
  end
end
