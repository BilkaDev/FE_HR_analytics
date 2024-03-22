# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include Pundit::Authorization
  include ActiveStorage::SetCurrent
  before_action :configure_permitted_parameters, if: :devise_controller?

  after_action :verify_authorized,
               except: :index,
               unless: -> { devise_controller? || active_admin_controller? }
  after_action :verify_policy_scoped,
               only: :index,
               unless: -> { devise_controller? || active_admin_controller? }
  # Prevent CSRF attacks by raising an exception.
  # protect_from_forgery with: :exception
  protect_from_forgery unless: -> { request.format.json? }

  def active_admin_controller?
    is_a?(ActiveAdmin::BaseController)
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[email password])
    devise_parameter_sanitizer.permit(:account_update, keys: %i[email first_name last_name username avatar_tus_id city])
  end
end
