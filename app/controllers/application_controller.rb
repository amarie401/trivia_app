class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken
  # protect_from_forgery with: :null_session
  # protect_from_forgery with: :null_session, if: ->{request.format.json?}

  include ActionController::Serialization

  before_action :update_sanitized_params, if: :devise_controller?

  def update_sanitized_params
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :nickname, :image])
  end

  def home
    render 'layouts/application'
  end

end
