# frozen_string_literal: true

module Types
  class BaseObject < GraphQL::Schema::Object
    include ContextAuthenticatable
    field_class BaseField
  end
end
