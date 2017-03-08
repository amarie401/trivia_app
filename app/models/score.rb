class Score < ApplicationRecord
  validates :user_id, :game_score, presence: true
  belongs_to :user
end
