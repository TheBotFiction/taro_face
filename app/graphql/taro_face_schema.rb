# frozen_string_literal: true

class TaroFaceSchema < GraphQL::Schema
  max_complexity 400

  query Types::QueryType
  mutation Types::MutationType

  use GraphQL::Batch
end
