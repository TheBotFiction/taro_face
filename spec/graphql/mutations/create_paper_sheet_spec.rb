# frozen_string_literal: true

module Mutations
  RSpec.describe CreateTerm do
    let(:context) { { current_user: create(:user) } }
    let(:variables) { {} }
    let(:query_string) {
      %|
        mutation createPaperSheet($questions: [QuestionInputObject!]!) {
          createPaperSheet(questions: $questions) {
            code
            paperSheet {
              id
            }
            errors
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

    it_behaves_like "unauthenticated GraphQL request" do
      let(:params) { [ attributes_for(:question) ] }
      let(:variables) { { questions: params } }
    end

    describe "createPaperSheet with valid params" do
      let(:params) do
        q = []
        2.times { q.push(attributes_for :question) }
        q
      end
      let(:variables) { {questions: params} }

      subject { result.dig("data", "createPaperSheet", "term") }

      it { expect(result.dig("data", "createPaperSheet", "code")).to eq 201 }
      it do
        expect(result.dig("data", "createPaperSheet", "paperSheet")).to have_key("id")
      end
    end

    context "createPaperSheet with invalid params" do
      describe "missing params" do
        let(:variables) { {} }
        subject { result.dig("errors").map { |e| e["message"] } }

        it { is_expected.to include "Variable questions of type [QuestionInputObject!]! was provided invalid value" }
      end

      describe "blank questions param" do
        subject { result.dig("errors").map { |e| e["message"] } }

        it { is_expected.to include "Variable questions of type [QuestionInputObject!]! was provided invalid value" }
      end

      describe "questions param with invalid question" do
        let(:variables) do
          {
            questions: [attributes_for(:question, term: nil)]
          }
        end
        subject { result.dig("errors").map { |e| e["message"] } }

        it { is_expected.to include "Variable questions of type [QuestionInputObject!]! was provided invalid value" }
      end
    end
  end
end
