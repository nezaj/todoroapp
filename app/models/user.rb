require 'bcrypt'

class User < ActiveRecord::Base
  attr_accessible :username, :password
  
  validates :username, :presence => true, :uniqueness => true
  validates :password_hash, :presence => { :message => "Password can't be blank"}
  validates :password, :length => { minimum: 6, 
            :message => "password must be at least %{count} characters" }
            
  include BCrypt
  
  def password
    @password ||= BCrypt::Password.new(password_hash)
  end
  
  def password=(password)
    @password = password
    self.password_hash = BCrypt::Password.create(password)
  end
end
