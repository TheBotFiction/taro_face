# frozen_string_literal: true

module Types
  RSpec.describe ConversationType do
    context "fields" do
      describe "field `id'" do
        subject { ConversationType.fields["id"].type }
        it { expect(subject.of_type).to eq GraphQL::Types::ID }
        it { expect(subject.non_null?).to be_truthy }
      end
      # NOTE: a workaround of array type
      describe "field `messages'" do
        subject { ConversationType.fields["messages"].type }
        it { expect(subject.of_type.of_type).to eq MessageType }
        it { expect(subject.non_null?).to be_falsy }
      end
    end

    context "queries" do
      let(:user) { create :user }
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
        conversations = create_list :conversation, 2, user: user
        conversations.each do |conversation|
          create_list :message, 2, conversation: conversation
        end
      end

      describe "indexConversations query" do
        let(:query_string) { %| query indexConversations { conversations { id } } | }

        subject { result.dig("data", "conversations") }

        it { expect(subject).to be_kind_of Array }
        it { expect(subject.length).to eq 2 }

        context "with messages" do
          let(:query_string) { %| query indexConversations { conversations { id messages { id } } } | }

          subject { result.dig("data", "conversations").map { |c| c["messages"] } }

          it { expect(subject).to be_kind_of Array }
          it { expect(subject.flatten.length).to eq 4 }
        end
      end
    end
  end
end
