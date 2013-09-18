class UsersController < ApplicationController
  
  def create
    @user = User.new(params[:user])
    @user.username = @user.username.downcase

    if @user.save
      login(@user)
      List.create(:author_id => @user.id, :title => "My First List")
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
