class SessionsController < ApplicationController
  
  def create
    @user = User.find_by_username(params[:user][:username])
    
    if @user and @user.password == params[:user][:password]
      login(@user)
      render :json => "Success"
    else
      @user = User.new
      flash.now[:errors] = ["Invalid username/password"]
      render :new
    end
  end
  
  def destroy
    logout
    redirect_to new_session_url
  end
  
  def new
    @user = User.new
    render :new
  end
end
