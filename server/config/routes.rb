# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

  mount_devise_token_auth_for 'User', at: '/api/v1/users', controllers: {
    registrations: 'api/v1/registrations',
    sessions: 'api/v1/sessions',
    passwords: 'api/v1/passwords',
    confirmations: 'api/v1/confirmations'
  }

  namespace :api do
    namespace :v1 do
      get :status, to: 'health#status'
      resources :jobs
    end
  end
  # Defines the root path route ("/s)
  # root "posts#index"

  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'
end
