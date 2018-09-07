# frozen_string_literal: true

require "rails_helper"

RSpec.describe Term, type: :model do
  it "has a valid factory" do
    expect(build(:term)).to be_valid
  end

  let(:attributes) { attributes_for :term }

  let(:term) { create(:term, **attributes) }

  describe "model validations" do
    it { expect(term).to allow_value(attributes[:term]).for(:term) }
    it { expect(term).to validate_presence_of(:term) }
    it { expect(term).to validate_uniqueness_of(:term) }
  end

  describe "model associations" do
    it { expect(term).to have_many(:sample_phrases) }
  end
end
