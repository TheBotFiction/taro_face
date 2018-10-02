# frozen_string_literal: true

class TaroFaceSchema < GraphQL::Schema
  max_complexity 400

  query Types::QueryType
  mutation Types::MutationType

  use GraphQL::Batch

  class << self
    def unauthorized_object(error)
      raise GraphQL::ExecutionError, "An object of type #{error.type.graphql_name} was hidden due to permissions"
    end
  end
end
