class Api::V1::RegistrationsController < DeviseTokenAuth::RegistrationsController
  def new
    super
  end

  def create
    # if params[@devise_mapping.name][:password_confirmation].blank?
    #   params[@devise_mapping.name].delete(:password)
    #   params[@devise_mapping.name].delete(:password_confirmation)
    # end

    if !(params[:password].length >= 6 && params[:password].length <= 20)
      render json: {
        message: 'Password lenght must be 6-20 characters'
      }
    end
  
    super
  end

  def edit
    super
  end

  def update
    super
  end

  def destroy
    super
  end
end
