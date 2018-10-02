# frozen_string_literal: true

module Types
  class BaseEnum < GraphQL::Schema::Enum
    include ContextAuthenticatable
  end
end
