# frozen_string_literal: true

require "rails_helper"

RSpec.describe Message, type: :model do
  context "associations" do
    it { should belong_to :character }
    it { should belong_to :conversation }
  end

  context "validations" do
    it { should validate_presence_of :content }
  end

  describe ".new" do
    it { expect(described_class).to respond_to(:new) }
  end

  describe ".create" do
    it { expect(described_class).to respond_to(:create) }
    it do
      character_id = create(:character).id
      conversation_id = create(:conversation).id
      action = -> { described_class.create(attributes_for(:message).merge(character_id: character_id, conversation_id: conversation_id)) }
      behavior = -> { described_class.count }
      expect { action.call }.to change { behavior.call }.by(1)
    end
  end

  describe ".find" do
    let(:record) { create(:message) }
    it { expect(described_class).to respond_to(:find) }
    it { expect(described_class.find(record.id)).to eq(record) }
  end

  describe "#save" do
    subject { build(:message) }
    before do
      subject.character = create(:character, name: "Test character")
      subject.conversation = create :conversation
    end
    it { is_expected.to respond_to(:save) }
    it { expect { subject.save }.to change { described_class.count }.by(1) }
  end

  describe "#update" do
    subject { create(:message) }
    it { is_expected.to respond_to(:update) }
    it { expect(subject.update(content: "New Content")).to be_truthy }
  end

  describe "#destroy" do
    let!(:record) { create(:message) }
    subject { record }
    it { is_expected.to respond_to(:destroy) }
    it { expect { subject.destroy }.to change { described_class.count }.by(-1) }
  end
end
