# frozen_string_literal: true

module Api
  module V1
    class RegistrationsController < DeviseTokenAuth::RegistrationsController
      include Api::Concerns::ActAsApiRequest

      def create
        super
      end

      private

      def sign_up_params
        params.require(:user).permit(:email, :password, :password_confirmation,
                                     :first_name, :last_name)
      end

      def render_create_success
        render :create
      end
    end
  end
end