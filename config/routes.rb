App::Application.routes.draw do
  resource :session, :only => [:create, :destroy, :new]
<<<<<<< HEAD
  resource :dashboard, :only => [:show]
=======
>>>>>>> 08ffde3854ab93b4a0b2d6dcb96bfa84b228405f
  
  resources :users, :only => [:create, :new]
end
