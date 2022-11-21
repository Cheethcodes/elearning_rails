Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users do
        collection do
          patch :update_role
        end
      end
      resources :user_follows do
        collection do
          post :validate_follow
          post :follow
          post :unfollow
        end
      end
      resources :categories do
        member do
          get :show_words
        end
      end
      resources :words
    end
  end

  devise_for 'user', controllers: {
    registrations: 'api/v1/registrations',
    sessions: 'api/v1/sessions',
    passwords: 'api/v1/passwords'
  }
end
