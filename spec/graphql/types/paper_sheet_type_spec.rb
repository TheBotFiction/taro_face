# frozen_string_literal: true

module Types
  RSpec.describe PaperSheetType do
    subject { PaperSheetType }

    # it { is_expected.to have_field(:id).that_returns(GraphQL::Types::ID) }
    # it { is_expected.to have_field(:questions).that_returns(QuestionType) }

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

      describe "showPaperSheet query" do
        let(:query_string) {
          %|
            query showPaperSheet($id: ID!) {
              paperSheet(id: $id) { id questions { id } }
            }
          |
        }
        let(:record) { create :paper_sheet, user: user }
        let(:variables) { {id: record.id} }

        subject { result.dig("data", "paperSheet") }

        it do
          is_expected.to have_key("id")
          is_expected.to have_key("questions")
          expect(subject["id"]).to eq(record.id.to_s)
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
