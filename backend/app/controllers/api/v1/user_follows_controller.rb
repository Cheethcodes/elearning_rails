class Api::V1::UserFollowsController < ApplicationController
  def show
    followers = UserFollow.where(followed_id: params[:id]).count
    following = UserFollow.where(follower_id: params[:id]).count

    render json: {
      followers: followers,
      following: following
    }
  end

  def validate_follow
    validate = UserFollow.where(followed_id: user_follow_params[:followed_id], follower_id: user_follow_params[:follower_id]).exists?
    render json: validate
  end

  def follow
    action = UserFollow.create(user_follow_params)
    action.create_activity(user_id: user_follow_params[:follower_id])
  end

  def unfollow
    action = UserFollow.find_by(followed_id: user_follow_params[:followed_id], follower_id: user_follow_params[:follower_id])
    activity = Activity.find_by(action_id: action.id)

    action.destroy
    activity.destroy
  end

  private

  def user_follow_params
    params.require(:follow).permit(:follower_id, :followed_id)
  end
end
