# frozen_string_literal: true

module Api
  module V1
    class HealthController < ApplicationController
      def status
        render json: { online: true }
      end
    end
  end
end
