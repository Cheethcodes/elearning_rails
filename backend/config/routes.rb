Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post :validate_follow, controller: "user_follows"
      post :follow, controller: "user_follows"
      post :unfollow, controller: "user_follows"
      resources :users
      resources :user_follows
    end
  end

  devise_for 'user', controllers: {
    registrations: 'api/v1/registrations',
    sessions: 'api/v1/sessions',
    passwords: 'api/v1/passwords'
  }
end
