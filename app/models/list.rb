class List < ActiveRecord::Base
  attr_accessible :author_id, :title
  
  validates :author_id, :title, :presence => true
  
  belongs_to(
    :author,
    :class_name => "User",
    :foreign_key => :author_id
  )
  
end
