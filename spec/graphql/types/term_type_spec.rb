# frozen_string_literal: true

module Types
  RSpec.describe TermType do
    # avail type definer in our tests
    # types = GraphQL::Define::TypeDefiner.instance
    subject { TermType }

    it { is_expected.to have_field(:id).that_returns(GraphQL::Types::ID) }
    it { is_expected.to have_field(:term).that_returns(GraphQL::Types::String) }
    it { is_expected.to have_field(:meaning).that_returns(GraphQL::Types::String) }
    it { is_expected.to have_field(:reading).that_returns(GraphQL::Types::String) }
    # it { is_expected.to have_field :sample_phrases }
    it { is_expected.to have_field :similars }
  end
end
