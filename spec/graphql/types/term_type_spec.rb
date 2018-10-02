# frozen_string_literal: true

module Types
  RSpec.describe TermType do
    subject { TermType }

    it { is_expected.to have_field(:id).that_returns(GraphQL::Types::ID) }
    it { is_expected.to have_field(:term).that_returns(GraphQL::Types::String) }
    it { is_expected.to have_field(:meaning).that_returns(GraphQL::Types::String) }
    it { is_expected.to have_field(:reading).that_returns(GraphQL::Types::String) }
    # it { is_expected.to have_field :sample_phrases }
    it { is_expected.to have_field :similars }

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
        if res["errors"].present?
          pp res
        else
          res
        end
      }

      describe "showTerm query" do
        let(:query_string) { %| query showTerm($id: ID!) { term(id: $id) { id } } | }
        let(:term) { create :term, user: user }
        let(:variables) { {id: term.id} }

        subject { result.dig("data", "term") }

        it do
          is_expected.to have_key("id")
          expect(subject["id"]).to eq(term.id.to_s)
        end

        context "when no logged-in user" do
          let(:context) { { } }

          # FIXME: class level authorized? message
          it { is_expected.to be_nil }
        end
      end

      describe "indexTerms query" do
        let(:query_string) { %| query indexTerms { terms { id } } | }
        let!(:terms) { create_list :term, 2, user: user }

        subject { result.dig("data", "terms") }

        it do
          expect(subject.length).to eq 2
          expect(subject.map { |record| record["id"] }).to eq(terms.map { |t| t.id.to_s })
        end

        context "when no logged-in user" do
          let(:context) { { } }

          # FIXME: class level authorized? message
          it { is_expected.to be_nil }
        end
      end
    end
  end
end
