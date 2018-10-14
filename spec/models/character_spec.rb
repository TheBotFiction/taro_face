# frozen_string_literal: true

require "rails_helper"

RSpec.describe Character, type: :model do
  context "associations" do
  end

  context "validations" do
    it { should validate_presence_of :name }
    it { should validate_uniqueness_of :name }
  end

  describe ".new" do
    it { expect(described_class).to respond_to(:new) }
  end

  describe ".create" do
    it { expect(described_class).to respond_to(:create) }
    it do
      action = -> { described_class.create(attributes_for(:character)) }
      behavior = -> { described_class.count }
      expect { action.call }.to change { behavior.call }.by(1)
    end
  end

  describe ".find" do
    let(:record) { create(:character) }
    it { expect(described_class).to respond_to(:find) }
    it { expect(described_class.find(record.id)).to eq(record) }
  end

  describe "#save" do
    subject { build(:character) }
    it { is_expected.to respond_to(:save) }
    it { expect { subject.save }.to change { described_class.count }.by(1) }
  end

  describe "#update" do
    subject { create(:character) }
    it { is_expected.to respond_to(:update) }
    it { expect(subject.update(name: "New Name")).to be_truthy }
  end

  describe "#destroy" do
    let!(:record) { create(:character) }
    subject { record }
    it { is_expected.to respond_to(:destroy) }
    it { expect { subject.destroy }.to change { described_class.count }.by(-1) }
  end
end
