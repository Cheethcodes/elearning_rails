class Api::V1::ActivitiesController < ApplicationController
  def index
    activities = Activity.all

    data = activities.map{ |activity|
      if activity.action_type === 'Lesson'
        info = Lesson.find(activity.action_id)
        activity = {
          info: {
            lesson: info,
            category: info.category,
            user: info.user
          },
          type: "lesson"
        }
      else
        action = UserFollow.find(activity.action_id)
        activity = {
          info: {
            user: User.find(action[:follower_id]),
            followed: User.find(action[:followed_id])
          },
          type: "follow"
        }
      end
    }
    
    render json: data
  end
end
