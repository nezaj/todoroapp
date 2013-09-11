class RenamePomdoroExpectedInTasks < ActiveRecord::Migration
  def change
    rename_column :tasks, :pomdoro_expected, :pomodoro_expected
  end
end
