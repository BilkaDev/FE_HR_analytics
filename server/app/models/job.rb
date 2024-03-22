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
class Job < ApplicationRecord
end
