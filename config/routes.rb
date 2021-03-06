App::Application.routes.draw do
  resource :session, :only => [:create, :destroy, :new]
  resource :dashboard, :only => [:show]
  
  resources :users, :only => [:create, :new] do
  	collection do
  		get 'demo'
  	end
  end

  resources :lists do
    resources :tasks
  end
  
  resources :today_tasks, :only => [:destroy, :index, :update]
  resources :unplanned_tasks, :only => [:create, :destroy, :index, :update]
  
  root :to => 'dashboards#show'
end
