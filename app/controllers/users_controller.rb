class UsersController < ApplicationController
  
  def create
    @user = User.new(params[:user])

    if @user.save
      login(@user)
      redirect_to dashboard_url
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
