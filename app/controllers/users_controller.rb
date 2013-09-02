class UsersController < ApplicationController
  
  def create
    @user = User.new(params[:user])

    if @user.save
      login(@user)
<<<<<<< HEAD
      redirect_to dashboard_url
=======
      render :json => "Success"
>>>>>>> 08ffde3854ab93b4a0b2d6dcb96bfa84b228405f
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new    
    end
      
  end
  
  def new
    @user = User.new
    render :new
  end
end
