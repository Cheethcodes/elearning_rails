class Api::V1::UsersController < ApplicationController
  def show
    user = User.find(params[:id])
    render json: user
  end

  def update
    user = User.find(params[:id])
    user.update(avatar: avatar_params[:avatar])
    user.update(username: avatar_params[:username])
    user.update(email: avatar_params[:email])
    
    uploader = AvatarUploader.new(user, :avatar)
    uploader.store!(avatar_params[:avatar])
  end

  private

  def avatar_params
    params.require(:avatar).permit(:username, :email, :has_avatar, :avatar)
  end
end
