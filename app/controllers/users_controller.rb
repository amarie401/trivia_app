require 'json'

class UsersController < ApplicationController
  before_action :set_user, only: [:show, :destroy, :update]

  def index
    @users = User.all
    # @users = User.filter(params.slice(:u_name, :nickname, :email))
    render json: @users
  end

  def show
    render json: @user
  end

  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @user.destroy
  end


  private
    def set_user
       @user = User.find(params[:id])
    end

    def user_params
      params.require(:user).permit(:id, :name, :user_id, :nickname, :email, :image, :handle_source)
    end
end
