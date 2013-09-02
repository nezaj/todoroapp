class RemoveNullFromUsers < ActiveRecord::Migration
  def up
    change_column :users, :session_token, :string, :null => true
  end

  def down
    change_column :users, :session_token, :string, :null => false
  end
end
