# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require "faker"
return unless ENV["USER_ID"]
user = User.find ENV["USER_ID"]

# create 20 Todo Lists
20.times do
  term = Term.create(
    term: Faker::Lorem.word,
    reading: Faker::Lorem.word,
    meaning: Faker::Lorem.word,
    user: user
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

characters = []
10.times { characters << Character.create(name: Faker::DragonBall.character) }

3.times do
  conversation = Conversation.create(user: user, title: Faker::HarryPotter.book)
  conv_chars = characters.sample(3)
  15.times do
    char = conv_chars.sample
    Message.create character: char, conversation: conversation, content: Faker::Myst.quote
  end
end
