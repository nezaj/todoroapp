object @list

attributes :id, :title, :author_id, :created_at
child :tasks do
  attributes :id, :title, :list_id, :today, :complete, 
             :pomodoro_expected, :pomodoro_actual
end