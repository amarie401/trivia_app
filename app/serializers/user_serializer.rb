class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :nickname, :image, :email

  # has_many :scores
end
