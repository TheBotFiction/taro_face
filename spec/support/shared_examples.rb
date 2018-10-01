# frozen_string_literal: true

RSpec.shared_examples "unauthenticated GraphQL request" do
  context "action without user context" do
    let(:context) { { } }

    subject { result.dig("errors").map { |e| e["message"] }.uniq }

    it { expect(subject).to include "Unauthenticated" }
  end
end
