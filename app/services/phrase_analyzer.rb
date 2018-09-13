# frozen_string_literal: true

require "yahoo-japanese-analysis"

# Use Yahoo JLP to analyze Japanese phrase into corresponding term
#
# @!attribute [r] phrase
#   @return [String] the input phrase
# @!attribute [r] terms
#   @return [Array<Term>] array of created Terms
# @example
#   service = PhraseAnalyzer.new("This is a long term")
#   service.call
#   service.terms
class PhraseAnalyzer
  attr_reader :phrase, :terms

  # @param phrase [String] target phrase
  # @param analyzer [Symbol] One of `:morpheme` or `:dependency`
  # @param filter [Bool] (true) TRUE to filter returned terms by removeHiragana
  #   only terms
  def initialize(phrase, analyzer: :morpheme, filter: true)
    @phrase = phrase
    case analyzer
    when :morpheme
      @analyzer = :morpheme_analyze
    when :dependency
      @analyzer = :dependency_analyze
    else
      @analyzer = :morpheme_analyze
    end
    @filter = filter
  end

  # return [self]
  # @todo return self
  def call
    send analyzer
    filter_term_list if filter
    terms
  end

  private

  # @!attribute [r] analyzer
  #   @return [Symbol] analyzer method name
  # @!attribute [r] filter
  #   @return [Boolean] TRUE for filtering result terms
  attr_reader :analyzer, :filter

  # @return [Object] Cachable YahooJA client instance
  def client
    return @client if @client
    @client = YahooJA::Client.new

    @client.configure do |config|
      config.app_key = Chamber.env.yahoo.analyzer_client_id
    end
    @client
  end

  # Analyze phrase by dependency
  # @return [Array<Hash>]
  def dependency_analyze
    result = client.kakari_uke phrase
    return unless result
    dependencies = result.dig :Result, :ChunkList, :Chunk
    return unless dependencies
    dependencies = [dependencies] unless dependencies.is_a?(Array)

    @terms = [*dependencies].map { |data_set| dependency_analyze_each_one(data_set) }.flatten
  end

  # Transform the raw hash data to a set of hash term
  # @param result [Hash] a hash presented from XML response from Yahoo JLP
  # @return [Array<Hash>]
  def dependency_analyze_each_one(result)
    data_set = result.dig :MorphemList, :Morphem
    return unless data_set
    data_set = [data_set] unless data_set.is_a?(Array)

    [*data_set].map do |word_data|
      {
        term:     word_data[:Baseform],
        reading: word_data[:Reading],
        surface:  word_data[:Surface]
      }
    end
  end

  # Analyze phrase by morpheme
  # @return [Array<Hash>]
  def morpheme_analyze
    result = client.morpheme_analysis(phrase, {
      results:  "ma,uniq",
      response: "surface,reading,baseform,pos,feature",
      ma_response: "baseform,surface,reading",
      uniq_by_baseform: true,
      # filter:   "1|2|3|4|5|6|7|8|9|10"
      # filter:   "1|2|3|4|5|6|7|8|9|10|11|12|13"
      filter:   "1|2|3|4|6|8|9|10"
    })
    return unless result
    word_list = result.dig :ma_result, :word_list, :word
    return unless word_list
    word_list = [word_list] unless word_list.is_a?(Array)

    @terms = word_list.map do |word|
      {
        term:     word[:baseform],
        reading:  word[:reading],
        surface:  word[:surface]
      }
    end
  end

  # Only allows term with Kanji character
  # @return [Array<Hash>]
  def filter_term_list
    @terms.reject! { |term| /\p{Han}|\p{Hiragana}|\p{Katakana}/ !~ term[:term] }
  end
end
