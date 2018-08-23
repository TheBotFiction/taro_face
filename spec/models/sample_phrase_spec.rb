# frozen_string_literal: true

require "rails_helper"

RSpec.describe SamplePhrase, type: :model do
    # check that we have a factory for sample_phrases
  it "has a valid factory" do
    expect(build(:sample_phrase)).to be_valid
  end

  let(:term) { create(:term) }
  let(:attributes) do
    {
      phrase: "Sample phrase",
      term: term
    }
  end

  let(:sample_phrase) { create(:sample_phrase, **attributes) }

  describe "model validations" do
    it { expect(sample_phrase).to allow_value(attributes[:phrase]).for(:phrase) }
    it { expect(sample_phrase).to validate_presence_of(:phrase) }
  end

  describe "model associations" do
    it { expect(sample_phrase).to belong_to(:term) }
  end
end
