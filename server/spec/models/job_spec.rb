# frozen_string_literal: true

# == Schema Information
#
# Table name: jobs
#
#  id               :bigint           not null, primary key
#  logo             :string
#  longDescription  :string
#  name             :string
#  shortDescription :string
#  status           :string
#  title            :string
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#
require 'rails_helper'

RSpec.describe Job do
  pending "add some examples to (or delete) #{__FILE__}"
end
