# frozen_string_literal: true

require 'rails_helper'

# This spec was generated by rspec-rails when you ran the scaffold generator.
# It demonstrates how one might use RSpec to test the controller code that
# was generated by Rails when you ran the scaffold generator.
#
# It assumes that the implementation code is generated by the rails scaffold
# generator. If you are using any extension libraries to generate different
# controller code, this generated spec may or may not pass.
#
# It only uses APIs available in rails and/or rspec-rails. There are a number
# of tools you can use to make these specs even more expressive, but we're
# sticking to rails and rspec-rails APIs to keep things simple and stable.

RSpec.describe '/jobs' do
  # This should return the minimal set of attributes required to create a valid
  # Job. As you add validations to Job, be sure to
  # adjust the attributes here as well.
  let(:valid_attributes) do
    skip('Add a hash of attributes valid for your model')
  end

  let(:invalid_attributes) do
    skip('Add a hash of attributes invalid for your model')
  end

  # This should return the minimal set of values that should be in the headers
  # in order to pass any filters (e.g. authentication) defined in
  # JobsController, or in your router and rack
  # middleware. Be sure to keep this updated too.
  let(:valid_headers) do
    {}
  end

  describe 'GET /index' do
    it 'renders a successful response' do
      Job.create! valid_attributes
      get jobs_url, headers: valid_headers, as: :json
      expect(response).to be_successful
    end
  end

  describe 'GET /show' do
    it 'renders a successful response' do
      job = Job.create! valid_attributes
      get job_url(job), as: :json
      expect(response).to be_successful
    end
  end

  describe 'POST /create' do
    context 'with valid parameters' do
      it 'creates a new Job' do
        expect {
          post jobs_url,
               params: { job: valid_attributes }, headers: valid_headers, as: :json
        }.to change(Job, :count).by(1)
      end

      it 'renders a JSON response with the new job' do
        post jobs_url,
             params: { job: valid_attributes }, headers: valid_headers, as: :json
        expect(response).to have_http_status(:created)
        expect(response.content_type).to match(a_string_including('application/json'))
      end
    end

    context 'with invalid parameters' do
      it 'does not create a new Job' do
        expect {
          post jobs_url,
               params: { job: invalid_attributes }, as: :json
        }.not_to change(Job, :count)
      end

      it 'renders a JSON response with errors for the new job' do
        post jobs_url,
             params: { job: invalid_attributes }, headers: valid_headers, as: :json
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to match(a_string_including('application/json'))
      end
    end
  end

  describe 'PATCH /update' do
    context 'with valid parameters' do
      let(:new_attributes) do
        skip('Add a hash of attributes valid for your model')
      end

      it 'updates the requested job' do
        job = Job.create! valid_attributes
        patch job_url(job),
              params: { job: new_attributes }, headers: valid_headers, as: :json
        job.reload
        skip('Add assertions for updated state')
      end

      it 'renders a JSON response with the job' do
        job = Job.create! valid_attributes
        patch job_url(job),
              params: { job: new_attributes }, headers: valid_headers, as: :json
        expect(response).to have_http_status(:ok)
        expect(response.content_type).to match(a_string_including('application/json'))
      end
    end

    context 'with invalid parameters' do
      it 'renders a JSON response with errors for the job' do
        job = Job.create! valid_attributes
        patch job_url(job),
              params: { job: invalid_attributes }, headers: valid_headers, as: :json
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to match(a_string_including('application/json'))
      end
    end
  end

  describe 'DELETE /destroy' do
    it 'destroys the requested job' do
      job = Job.create! valid_attributes
      expect {
        delete job_url(job), headers: valid_headers, as: :json
      }.to change(Job, :count).by(-1)
    end
  end
end
