# frozen_string_literal: true

require "rails_helper"

RSpec.describe Question, type: :model do
  context "associations" do
    it { should belong_to :paper_sheet }
  end

  context "validations" do
    it { should validate_presence_of :term }
    it { should validate_presence_of :phrase }
    it { should validate_presence_of :answers }
  end

  describe ".new" do
    it { expect(described_class).to respond_to(:new) }
  end

  describe ".create" do
    it { expect(described_class).to respond_to(:create) }
    it do
      paper_sheet = create :paper_sheet
      action = -> { described_class.create(attributes_for(:question).merge(paper_sheet: paper_sheet)) }
      behavior = -> { described_class.count }
      expect { action.call }.to change { behavior.call }.by(1)
    end
  end

  describe ".find" do
    let(:record) { create(:question) }
    it { expect(described_class).to respond_to(:find) }
    it { expect(described_class.find(record.id)).to eq(record) }
  end

  describe "#save" do
    subject { build(:question) }
    it { is_expected.to respond_to(:save) }
    it { expect { subject.save }.to change { described_class.count }.by(1) }
  end

  describe "#update" do
    subject { create(:question) }
    it { is_expected.to respond_to(:update) }
    it { expect(subject.update(term: "Good")).to be_truthy }
  end

  describe "#destroy" do
    let!(:record) { create(:question) }
    subject { record }
    it { is_expected.to respond_to(:destroy) }
    it { expect { subject.destroy }.to change { described_class.count }.by(-1) }
  end
end
