class ListsController < ApplicationController
  before_filter :require_login
  respond_to :json
  
  def create
  end
  
  def destroy
  end
  
  def index
    @lists = current_user.lists
    respond_with(@lists)
  end
  
  def new
  end
  
  def show
  end
  
  def update
  end
  
end
