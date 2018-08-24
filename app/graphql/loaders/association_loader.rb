# frozen_string_literal: true

module Loaders
  class AssociationLoader < BaseLoader
    def self.validate(model, association_name)
      new(model, association_name)
      nil
    end

    def initialize(model, association_name, limit: nil, order: nil)
      @model = model
      @association_name = association_name
      @limit = limit
      @order = order
      validate
    end

    def load(record)
      raise TypeError, "#{@model} loader can't load association for #{record.class}" unless record.is_a?(@model)
      if association_loaded? record
        return Promise.resolve(read_association(record))
      end
      super
    end

    # We want to load the associations on all records, even if they have the same id
    def cache_key(record)
      record.object_id
    end

    def perform(records)
      preload_association(records)
      records.each { |record| fulfill(record, read_association(record)) }
    end

    private

    def validate
      unless @model.reflect_on_association(@association_name)
        raise ArgumentError, "No association #{@association_name} on #{@model}"
      end
    end

    def preload_association(records)
      ::ActiveRecord::Associations::Preloader.new.preload(records, @association_name)
    end

    def read_association(record)
      association = record.public_send(@association_name)
      association = association.order(id: @order) if @order
      association = association.limit(@limit) if @limit
      association
    end

    def association_loaded?(record)
      record.association(@association_name).loaded?
    end
  end
end
