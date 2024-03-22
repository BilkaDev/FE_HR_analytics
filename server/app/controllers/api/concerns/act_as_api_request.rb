# frozen_string_literal: true

module Api
  module Concerns
    module ActAsApiRequest
      extend ActiveSupport::Concern

      included do
        before_action :skip_session_storage
        before_action :check_json_request
      end

      def check_json_request
        if !request_with_body? || request_content_type.include?('json') || request_content_type.include?('form-data')
          return
        end

        render json: { errors: {
          full_messages: I18n.t('api.errors.invalid_content_type')
        } }, status: :not_acceptable
      end

      def skip_session_storage
        # Devise stores the cookie by default, so in api requests, it is disabled
        # http://stackoverflow.com/a/12205114/2394842
        request.session_options[:skip] = true
      end

      def render_error(status, message, _data = nil)
        response = {
          errors: {
            full_messages: message
          }
        }
        render json: response, status:
      end

      private

      def request_content_type
        request.content_type || ''
      end

      def request_with_body?
        request.post? || request.put? || request.patch?
      end

      def json_request?
        request.format.json?
      end
    end
  end
end