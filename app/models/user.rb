# frozen_string_literal: true

class User < ApplicationRecord
  devise :firebase_authenticatable
end
