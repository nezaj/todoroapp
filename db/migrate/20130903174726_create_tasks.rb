class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.integer :list_id, :null => false
      t.string :title, :null => false
      t.integer :pomodoro, :null => false, :default => 1

      t.timestamps
    end
    
    add_index :tasks, :list_id, :name => "index_on_list_id"
    add_index :tasks, [:list_id, :title], :uniquness => true
  end
end
