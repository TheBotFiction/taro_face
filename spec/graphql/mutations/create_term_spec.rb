# frozen_string_literal: true

module Mutations
  RSpec.describe CreateTerm do
    let(:context) { { current_user: create(:user) } }
    let(:variables) { {} }
    let(:query_string) {
      %|
        mutation createTerm($term: String!, $meaning: String, $reading: String) {
          createTerm(term: $term, meaning: $meaning, reading: $reading) {
            code
            term {
              id
              term
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
      let(:term_params) { attributes_for :term }
      let(:variables) { term_params }
    end

    describe "createTerm with valid params" do
      let(:term_params) { attributes_for :term }
      let(:variables) { term_params }

      subject { result.dig("data", "createTerm", "term") }

      it { expect(result.dig("data", "createTerm", "code")).to eq 201 }
      it do
        is_expected.to have_key("id")
        expect(subject["term"]).to eq term_params[:term]
      end
    end

    context "createTerm with invalid params" do
      let(:term_params) { attributes_for :term }

      describe "missing params" do
        let(:variables) { term_params.merge("term": nil) }
        subject { result.dig("errors").map { |e| e["message"] } }

        it { is_expected.to include "Variable term of type String! was provided invalid value" }
      end

      describe "blank term param" do
        let(:variables) { term_params.merge("term": "") }
        subject { result.dig("data", "createTerm", "errors") }

        it { expect(result.dig("data", "createTerm", "code")).to eq 422 }
        it { is_expected.to include "Term can't be blank" }
      end
    end
  end
end
