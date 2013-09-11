class AddPomodoroColumnsToTask < ActiveRecord::Migration
  def change
    rename_column :tasks, :pomodoro, :pomdoro_expected
    add_column :tasks, :pomdoro_actual, :integer, :default => 0
  end
end
