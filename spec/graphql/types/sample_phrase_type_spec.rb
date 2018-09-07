# frozen_string_literal: true

module Types
  RSpec.describe SamplePhraseType do
    subject { SamplePhraseType }

    it { is_expected.to have_field(:id).that_returns(GraphQL::Types::ID) }
    it { is_expected.to have_field(:phrase).that_returns(GraphQL::Types::String) }
    it { is_expected.to have_field(:term).that_returns(TermType) }
  end
end
