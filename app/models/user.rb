class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable

  has_many :scores, dependent: :destroy

  include DeviseTokenAuth::Concerns::User
end
