# frozen_string_literal: true

require "rails_helper"

RSpec.describe Conversation, type: :model do
  context "associations" do
    it { should belong_to :user }
    it { should have_many :messages }
  end

  context "validations" do
  end

  describe ".new" do
    it { expect(described_class).to respond_to(:new) }
  end

  describe ".create" do
    it { expect(described_class).to respond_to(:create) }
    it do
      action = -> { described_class.create(attributes_for(:conversation).merge(user_id: create(:user).id)) }
      behavior = -> { described_class.count }
      expect { action.call }.to change { behavior.call }.by(1)
    end
  end

  describe ".find" do
    let(:record) { create(:conversation) }
    it { expect(described_class).to respond_to(:find) }
    it { expect(described_class.find(record.id)).to eq(record) }
  end

  describe "#save" do
    subject { build(:conversation) }
    before { subject.user = create :user }
    it { is_expected.to respond_to(:save) }
    it { expect { subject.save }.to change { described_class.count }.by(1) }
  end

  describe "#update" do
    subject { create(:conversation) }
    it { is_expected.to respond_to(:update) }
    it { expect(subject.update(title: "New Title")).to be_truthy }
  end

  describe "#destroy" do
    let!(:record) { create(:conversation) }
    subject { record }
    it { is_expected.to respond_to(:destroy) }
    it { expect { subject.destroy }.to change { described_class.count }.by(-1) }
  end
end
