class CreateLists < ActiveRecord::Migration
  def change
    create_table :lists do |t|
      t.integer :author_id, :null => false
      t.string :title, :null => false

      t.timestamps
    end
    add_index :lists, :author_id, :name => "index_on_author_id"
  end
end
