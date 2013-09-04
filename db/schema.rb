# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130904035905) do

  create_table "lists", :force => true do |t|
    t.integer  "author_id",  :null => false
    t.string   "title",      :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "lists", ["author_id"], :name => "index_on_author_id"

  create_table "tasks", :force => true do |t|
    t.integer  "list_id",                       :null => false
    t.string   "title",                         :null => false
    t.integer  "pomodoro",   :default => 1,     :null => false
    t.datetime "created_at",                    :null => false
    t.datetime "updated_at",                    :null => false
    t.boolean  "today",      :default => false
  end

  add_index "tasks", ["list_id", "title"], :name => "index_tasks_on_list_id_and_title"
  add_index "tasks", ["list_id"], :name => "index_on_list_id"

  create_table "users", :force => true do |t|
    t.string   "username",      :null => false
    t.string   "password_hash", :null => false
    t.string   "session_token"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
  end

  add_index "users", ["session_token"], :name => "index_on_session_token"
  add_index "users", ["username"], :name => "index_on_username"

end
