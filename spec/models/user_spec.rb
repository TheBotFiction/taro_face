# frozen_string_literal: true

require "rails_helper"

RSpec.describe User, type: :model do
  let(:user) { build :user }

  subject { user }

  it { should respond_to(:email) }

  it "#email returns a string" do
    expect(user.email).to match "@example.com"
  end
end
