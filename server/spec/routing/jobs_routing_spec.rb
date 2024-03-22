# frozen_string_literal: true

# == Schema Information
#
# Table name: jobs
#
#  id               :bigint           not null, primary key
#  name             :string
#  title            :string
#  shortDescription :string
#  longDescription  :string
#  logo             :string
#  status           :string
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#
require 'rails_helper'

RSpec.describe JobsController do
  describe 'routing' do
    it 'routes to #index' do
      expect(get: '/jobs').to route_to('jobs#index')
    end

    it 'routes to #show' do
      expect(get: '/jobs/1').to route_to('jobs#show', id: '1')
    end

    it 'routes to #create' do
      expect(post: '/jobs').to route_to('jobs#create')
    end

    it 'routes to #update via PUT' do
      expect(put: '/jobs/1').to route_to('jobs#update', id: '1')
    end

    it 'routes to #update via PATCH' do
      expect(patch: '/jobs/1').to route_to('jobs#update', id: '1')
    end

    it 'routes to #destroy' do
      expect(delete: '/jobs/1').to route_to('jobs#destroy', id: '1')
    end
  end
end
