Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users
      resources :user_follows do
        collection do
          post :validate_follow
          post :follow
          post :unfollow
        end
      end
    end
  end

  devise_for 'user', controllers: {
    registrations: 'api/v1/registrations',
    sessions: 'api/v1/sessions',
    passwords: 'api/v1/passwords'
  }
end
