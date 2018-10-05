# frozen_string_literal: true

module Types
  RSpec.describe MessageType do
    subject { MessageType }

    context "fields" do
      describe "field `id'" do
        subject { MessageType.fields["id"].type }
        it { expect(subject.of_type).to eq GraphQL::Types::ID }
        it { expect(subject.non_null?).to be_truthy }
      end
      describe "field `content'" do
        subject { MessageType.fields["content"].type }
        it { expect(subject.of_type).to eq GraphQL::Types::String }
        it { expect(subject.non_null?).to be_truthy }
      end
      describe "field `characterId'" do
        subject { MessageType.fields["characterId"].type }
        it { expect(subject.of_type).to eq GraphQL::Types::ID }
        it { expect(subject.non_null?).to be_truthy }
      end
      describe "field `conversationId'" do
        subject { MessageType.fields["conversationId"].type }
        it { expect(subject.of_type).to eq GraphQL::Types::ID }
        it { expect(subject.non_null?).to be_truthy }
      end
    end

    context "queries" do
      let(:user) { nil }
      let(:context) { { current_user: user } }
      let(:variables) { {} }
      let(:result) {
        res = TaroFaceSchema.execute(
          query_string,
          context: context,
          variables: variables
        )
        res
      }

      before do
        create_list :message, 2
      end

      describe "indexMessages query" do
        let(:query_string) { %| query indexMessages { messages { id } } | }

        subject { result.dig("data", "messages") }

        it { expect(subject).to be_kind_of Array }
        it { expect(subject.length).to eq 2 }
      end
    end
  end
end
