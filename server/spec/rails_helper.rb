# frozen_string_literal: true

ENV['RAILS_ENV'] ||= 'test'
require 'simplecov'

SimpleCov.start 'rails' do
  add_group 'Forms', 'app/forms'
  add_group 'Policies', 'app/policies'
  add_group 'Presenters', 'app/presenters'
  add_filter 'app/admin'
  add_filter 'config'
  add_filter 'spec'
  add_filter 'lib/tasks/code_analysis.rake'
end
require File.expand_path('../config/environment', __dir__)
# Prevent database truncation if the environment is production
abort('The Rails environment is running in production mode!') if Rails.env.production?
require 'rspec/core'
require 'spec_helper'
require 'rspec/rails'
require 'rspec/retry'
require 'support/retry/message_formatter'

ActiveRecord::Migration.maintain_test_schema!
WebMock.disable_net_connect!(
  allow_localhost: true,
  allow: ['api.github.com']
)

begin
  ActiveRecord::Migration.maintain_test_schema!
rescue ActiveRecord::PendingMigrationError => e
  abort e.to_s.strip
end
RSpec.configure do |config|
  config.render_views = true
  config.include Devise::Test::ControllerHelpers, type: :controller
  config.include Devise::Test::IntegrationHelpers, type: :request
  config.include ActiveJob::TestHelper
  config.use_transactional_fixtures = true
  config.infer_spec_type_from_file_location!

  # Form objects specs
  config.define_derived_metadata(file_path: Regexp.new('/spec/forms/')) do |metadata|
    metadata[:type] = :form
  end
  # Only build the API Docs from files in spec/requests/api, and ignore the rest
  config.define_derived_metadata(file_path: Regexp.new('/spec/requests/')) do |metadata|
    metadata[:openapi] = false unless metadata[:file_path].match?(Regexp.new('/spec/requests/api/'))
  end

  config.include Shoulda::Matchers::ActiveModel, type: :form
  config.include Shoulda::Matchers::ActiveRecord, type: :form
  # Detects N+1 queries
  config.before { Prosopite.scan }
  config.after { Prosopite.finish }

  # Reset previous flipper instance
  config.before { Flipper.instance = nil }

  # Fixes ActionView::MissingTemplate error in tests
  config.before(:each, type: %i[controller request]) do
    request.accept = 'application/json'
  end
  # rspec-retry gem
  # Show retry status in spec process
  config.verbose_retry = true
  # Print what reason forced the retry
  config.display_try_failure_messages = true
  # Try tests twice in the CI and once locally
  config.default_retry_count = ENV.fetch('CI', false) ? 2 : 1
  # Callback for intermittent tests
  # Filter lines from Rails gems in backtraces.
  config.filter_rails_from_backtrace!
end

Shoulda::Matchers.configure do |config|
  config.integrate do |with|
    with.test_framework :rspec
    with.library :rails
  end
end

Rails.application.executor.to_complete do
  ActiveStorage::Current.url_options = { host: ENV.fetch('SERVER_HOST', nil),
                                         port: ENV.fetch('PORT', 3001) }
end

Flipper.configure do |config|
  config.default { Flipper.new(Flipper::Adapters::Memory.new) }
end