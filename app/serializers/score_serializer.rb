class ScoreSerializer < ActiveModel::Serializer
  attributes :game_score # :nickname, :image

  has_one :user
end
