# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Healths' do
  describe 'GET api/v1/status' do
    before do
      get api_v1_status_path, as: :json
    end

    it 'return status 200 ok' do
      expect(response).to be_successful
    end

    it 'return the api status' do
      expect(json['online']).to be true
    end
  end
end
