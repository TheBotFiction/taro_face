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
end
