# frozen_string_literal: true

module Loaders
  class BaseLoader < GraphQL::Batch::Loader
    def initialize(model)
      @model = model
    end

    def perform(ids)
      @model.where(id: ids).each do |record|
        fulfill(record.id, record)
      end
      ids.each do |id|
        fulfill(id, nil) unless fulfilled?(id)
      end
    end
  end
end
