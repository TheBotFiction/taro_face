# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require "faker"

# create 20 Todo Lists
20.times do
  term = Term.create(
    term: Faker::Lorem.word,
    reading: Faker::Lorem.word,
    meaning: Faker::Lorem.word
  )
  puts "Created term #{term.term}"
end

Term.all.each do |term|
  puts "Creating sample for #{term.term}"
  5.times do
    phrase = term.sample_phrases.create(phrase: Faker::Lorem.sentence)
    puts "\tCreated sample phrase #{phrase.phrase}"
  end
end

10.times { Character.create name: Faker::DragonBall.character }
