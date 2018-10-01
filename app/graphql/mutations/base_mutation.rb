# frozen_string_literal: true

module Mutations
  class BaseMutation < GraphQL::Schema::Mutation
    protected

    # NOTE:
    # Try to authenticate at high level
    def authenticate_user!
      unless context[:current_user]
        raise GraphQL::ExecutionError, "Unauthenticated"
      end
    end
  end
end
