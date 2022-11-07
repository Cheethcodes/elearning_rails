class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token, if: :devise_controller?
  protect_from_forgery with: :null_session
  before_action :configure_permitted_parameters, if: :devise_controller?
  include DeviseTokenAuth::Concerns::SetUserByToken

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:username])
  end
end
