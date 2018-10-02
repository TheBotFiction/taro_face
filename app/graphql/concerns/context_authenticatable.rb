# frozen_string_literal: true

module ContextAuthenticatable
  extend ActiveSupport::Concern

  def authenticate_user!
    unless current_user
      raise GraphQL::ExecutionError, "Unauthenticated"
    end
  end

  def current_user
    context[:current_user]
  end

  # TODO: watch this bug https://github.com/rmosolgo/graphql-ruby/issues/1853
  # - Class level authorized? still has bug
  # - Class level -> instance level -> resolver
  # module ClassMethods
  #   def authorized?(object, context)
  #     return super unless @auth
  #     return false unless is_authenticated?(context)
  #     if @auth.is_a?(Symbol) || @auth.is_a?(String)
  #       is_authorized?(context)
  #     else
  #       true
  #     end
  #   end
  # end
end
