class RemoveNullConstraintFromTasks < ActiveRecord::Migration
  def change
    change_column :tasks, :list_id, :integer, :null => true
  end
end