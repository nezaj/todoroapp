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

  def demo
    @user = User.new
    @user.username = "demo" + (0..5).map {rand(9)}.join
    @user.password = (0...10).map { (97 + rand(26)).chr }.join
    if @user.save
      login(@user)
      List.create(:author_id => @user.id, :title => "My First List")
      redirect_to dashboard_url
    else
      redirect_to demo_users_url
    end
  end
  
  def new
    @user = User.new
    render :new
  end
end
