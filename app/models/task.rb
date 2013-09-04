class Task < ActiveRecord::Base
  attr_accessible :list_id, :pomodoro, :title
  
  validates :title, :list_id, :presence => true
  
  belongs_to(
    :list,
    :class_name => "List",
    :foreign_key => :list_id
  )
  
  has_one(
    :author,
    :through => :list,
    :source => :author
  )
end
