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

  def update_role
    if (update_role_params[:controls] === "true")
      user = User.find(update_role_params[:id])
      user.update(is_admin: update_role_params[:is_admin])
    end
  end

  private

  def avatar_params
    params.require(:avatar).permit(:username, :email, :has_avatar, :has_updated, :avatar)
  end

  def update_role_params
    params.require(:user).permit(:controls, :id, :is_admin)
  end
end
