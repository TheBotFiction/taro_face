# frozen_string_literal: true

module Mutations
  RSpec.describe CreateConversation do
    let(:context) { { current_user: create(:user) } }
    let(:variables) { {} }
    let(:query_string) {
      %|
        mutation createConversation($messages: [MessageInputObject!]!, $title: String, $description: String) {
          createConversation(messages: $messages, title: $title, description: $description) {
            conversation {
              id
              title
              messages {
                id
                characterId
                content
              }
            }
          }
        }
      |
    }
    let(:result) {
      res = TaroFaceSchema.execute(
        query_string,
        context: context,
        variables: variables
      )
      res
    }

    let(:messages) do
      3.times.inject([]) do |arr, i|
        arr.push(attributes_for(:message).merge(characterId: create(:character).id))
      end
    end
    let(:conversation_params) { attributes_for(:conversation).merge(messages: messages) }

    it_behaves_like "unauthenticated GraphQL request" do
      let(:variables) { conversation_params }
    end

    describe "createConversation with valid params" do
      let(:variables) { conversation_params }

      subject { result.dig("data", "createConversation", "conversation") }

      it { is_expected.not_to be_nil }
      it { is_expected.to have_key "id" }
      it { expect(result).not_to have_key "errors" }
    end

    context "createConversation with invalid params" do
      shared_examples "invalid createConversation" do
        subject { result.dig("errors").map { |e| e["message"] } }

        it { expect(result).to have_key "errors" }
        it { is_expected.to include "Variable messages of type [MessageInputObject!]! was provided invalid value" }
      end

      describe "missing params" do
        let(:variables) { conversation_params.merge(messages: nil) }
        include_examples "invalid createConversation"
      end

      describe "blank conversation param" do
        let(:variables) { { conversation: nil } }
        include_examples "invalid createConversation"
      end
    end
  end
end
