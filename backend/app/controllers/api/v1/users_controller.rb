class Api::V1::UsersController < ApplicationController
  def index
    user = User.all
    render json: user
  end
  
  def show
    user = User.find(params[:id])
    render json: user
  end

  def update
    user = User.find(params[:id])
    user.update(username: avatar_params[:username])
    user.update(email: avatar_params[:email])
    
    if (avatar_params[:has_updated] === "true")
      user.update(avatar: avatar_params[:avatar])

      uploader = AvatarUploader.new(user, :avatar)
      uploader.store!(avatar_params[:avatar])
    end
  end

  private

  def avatar_params
    params.require(:avatar).permit(:username, :email, :has_avatar, :has_updated, :avatar)
  end
end
