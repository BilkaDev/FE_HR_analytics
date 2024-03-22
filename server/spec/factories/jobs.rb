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
FactoryBot.define do
  factory :job do
    name { Faker::Company.name }
    title { Faker::Job.title }
    shortDescription { Faker::Lorem.sentence }
    longDescription { Faker::Lorem.paragraph }
    logo { Faker::Company.logo }
    status { %w[open closed pending].sample }
  end
end
