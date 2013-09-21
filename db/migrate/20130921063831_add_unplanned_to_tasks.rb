class AddUnplannedToTasks < ActiveRecord::Migration
  def change
    add_column :tasks, :unplanned, :boolean, :default => false
  end
end
