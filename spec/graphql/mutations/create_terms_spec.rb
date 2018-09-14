# frozen_string_literal: true

module Mutations
  RSpec.describe CreateTerms do
    let(:context) { {} }
    let(:variables) { {} }
    let(:query_string) {
      %|
        mutation createTerms($terms: [TermInputObject!]!) {
          createTerms(terms: $terms) {
            code
            errors
            terms {
              id
              term
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

    describe "createTerms with valid params" do
      let(:terms_params) { (1..3).map { attributes_for :term } }
      let(:variables) { { terms: terms_params } }

      subject { result.dig("data", "createTerms", "terms") }

      it { expect(result.dig("data", "createTerms", "code")).to eq 201 }
      it do
        expect(subject.size).to eq 3
        expect(subject.map { |t| t["term"] }.sort).to eq(terms_params.map { |a| a[:term] }.sort)
      end
    end

    context "createTerms with invalid params" do
      describe "missing params" do
        let(:variables) { {} }
        subject { result.dig("errors").map { |e| e["message"] } }

        it { is_expected.to include "Variable terms of type [TermInputObject!]! was provided invalid value" }
      end

      describe "missing required field `term'" do
        let(:invalid_params) {(1..3).map { attributes_for :term, term: nil } }
        let(:variables) { { terms: invalid_params } }
        subject { result.dig("errors").map { |e| e["message"] } }

        it { is_expected.to include "Variable terms of type [TermInputObject!]! was provided invalid value" }
      end

      describe "term had already created" do
        let(:terms_params) {
          (1..3).map { create(:term).attributes.slice("term", "reading", "meaning") }
        }
        let(:variables) { { terms: terms_params } }

        subject { result.dig("data", "createTerms", "errors") }

        it { expect(result.dig("data", "createTerms", "code")).to eq 422 }
        it { is_expected.to include "Term has already been taken" }
      end

      describe "term had already created along with new terms" do
        let(:terms_params) { (1..3).map { attributes_for :term } }
        let(:variables) { { terms: terms_params } }

        before { create :term, terms_params[0] }

        subject { result.dig("data", "createTerms") }

        it { expect(subject["code"]).to eq 201 }
        it { expect(subject["errors"]).to include "Term has already been taken" }
        it { expect(subject["terms"].size).to eq 2 }
      end
    end
  end
end
