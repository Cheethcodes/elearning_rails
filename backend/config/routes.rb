Rails.application.routes.draw do
  # mount_devise_token_auth_for 'User', at: 'auth'

  devise_for 'user', controllers: {
    registrations: 'api/v1/registrations',
    sessions: 'api/v1/sessions'
  }
  # devise_token_auth_for 'user', controllers: {
  #   registrations: 'auth/sign_up'
  # }
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
