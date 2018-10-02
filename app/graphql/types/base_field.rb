# frozen_string_literal: true

module Types
  class BaseField < GraphQL::Schema::Field
    def initialize(auth: false, **kwargs, &block)
      @auth = auth
      super(**kwargs, &block)
    end

    def accessible?(context)
      super
    end

    def visible?(context)
      super
    end

    def authorized?(object, context)
      return super unless @auth
      return false unless is_authenticated?(context)
      if @auth.is_a?(Symbol) || @auth.is_a?(String)
        is_authorized?(context)
      else
        true
      end
    end

    private

    def is_authenticated?(context)
      if context[:current_user].present?
        true
      else
        # raise GraphQL::ExecutionError, "Unauthenticated"
        false
      end
    end

    def is_authorized?(context)
      # Logic to check authorization
      false
    end
  end
end
