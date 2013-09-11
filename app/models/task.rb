class Task < ActiveRecord::Base
  attr_accessible :id, :created_at, :list_id, :title, :today, 
                  :complete, :pomodoro_actual, :pomodoro_expected
  
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
