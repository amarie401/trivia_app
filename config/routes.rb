Rails.application.routes.draw do

  get 'questions/index'

  root 'home#index'

  resources :scores, only: [:index, :create]

  mount_devise_token_auth_for 'User', at: 'auth'
  # root 'application#home'
end
