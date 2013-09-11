class RenamePomdoroActualInTasks < ActiveRecord::Migration
  def change
    rename_column :tasks, :pomdoro_actual, :pomodoro_actual
  end
end
