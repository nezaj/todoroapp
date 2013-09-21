require 'bcrypt'

class User < ActiveRecord::Base
  attr_accessible :username, :password
  
  validates :username, :presence => true, :uniqueness => { :message => "already taken"}
  validates :password_hash, :presence => { :message => "Password can't be blank"}
  validates :password, :length => { minimum: 6, 
            :message => "password must be at least %{count} characters" }
            
  has_many(
    :lists,
    :class_name => "List",
    :foreign_key => :author_id,
    :dependent  => :destroy
  )
  
  has_many(
    :tasks,
    :through => :lists,
    :source => :tasks
  )
  
  include BCrypt

  def unplanned_list
    List.find_by_author_id_and_title(self.id, "Unplanned")
  end
  
  def password
    @password ||= BCrypt::Password.new(password_hash)
  end
  
  def password=(password)
    @password = password
    self.password_hash = BCrypt::Password.create(password)
  end
end
