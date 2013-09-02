class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username, :null => false
      t.string :password_hash, :null => false
      t.string :session_token, :null => false

      t.timestamps
    end
    add_index :users, :username, :name => "index_on_username", 
              :uniqueness => true
    add_index :users, :session_token, :name => "index_on_session_token",
              :uniqueness => true
  end
end
