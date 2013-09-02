App::Application.routes.draw do
  resource :session, :only => [:create, :destroy, :new]
  resource :dashboard, :only => [:show]
  
  resources :users, :only => [:create, :new]
end
