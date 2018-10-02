# frozen_string_literal: true

require "rails_helper"

RSpec.describe PaperSheet, type: :model do
  context "associations" do
    it { should have_many :questions }
    it { should belong_to :user }
  end

  describe ".new" do
    it { expect(described_class).to respond_to :new }
  end

  describe ".create" do
    it { expect(described_class).to respond_to :create }
    it do
      action = -> { described_class.create(attributes_for(:paper_sheet).merge({user: create(:user)})) }
      behavior = -> { described_class.count }
      expect { action.call }.to change { behavior.call }.by(1)
    end
  end

  describe ".find" do
    let(:record) { create(:paper_sheet) }
    it { expect(described_class).to respond_to(:find) }
    it { expect(described_class.find(record.id)).to eq(record) }
  end

  describe "#save" do
    subject { build(:paper_sheet) }
    it { is_expected.to respond_to(:save) }
    it { expect { subject.save }.to change { described_class.count }.by(1) }
  end

  describe "#update" do
    subject { create(:paper_sheet) }
    it { is_expected.to respond_to(:update) }
  end

  describe "#destroy" do
    let!(:record) { create(:paper_sheet) }
    subject { record }
    it { is_expected.to respond_to(:destroy) }
    it { expect { subject.destroy }.to change { described_class.count }.by(-1) }
  end
end
