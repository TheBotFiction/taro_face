# frozen_string_literal: true

module Types
  RSpec.describe CharacterType do
    subject { CharacterType }

    context "fields" do
      describe "field `id'" do
        subject { CharacterType.fields["id"].type }
        it { expect(subject.of_type).to eq GraphQL::Types::ID }
        it { expect(subject.non_null?).to be_truthy }
      end
      describe "field `name'" do
        subject { CharacterType.fields["name"].type }
        it { is_expected.to eq GraphQL::Types::String }
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

      before :all do
        create_list :character, 2
      end

      describe "indexCharacters query" do
        let(:query_string) { %| query indexCharacters { characters { id } } | }

        subject { result.dig("data", "characters") }

        it { expect(subject).to be_kind_of Array }
        it { expect(subject.length).to eq 2 }

        # FIXME: it acts differ than thought
        # context "when query did not ask for `id'" do
        #   let(:query_string) { %| query indexCharacters { characters { name } } | }
        #   subject { result.dig("errors") }

        #   it { is_expected.not_to be_empty }
        # end
      end
    end
  end
end
