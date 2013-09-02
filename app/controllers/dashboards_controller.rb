class DashboardsController < ApplicationController
  before_filter :require_login!
  
  def show
    render :show
  end
end
