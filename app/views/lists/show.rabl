object @list

attributes :id, :title, :author_id, :created_at
child :tasks do
  attributes *Task.column_names
end