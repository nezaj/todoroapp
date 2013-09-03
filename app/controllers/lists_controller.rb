class ListsController < ApplicationController
  before_filter :require_login!
  respond_to :json
  
  def create
    @list = List.new(params[:list])
    @list.author_id = current_user.id
    
    if @list.save
      respond_with(@list)
    else
      respond_with(@list.errors.full_messages, :status => 422)
    end
  end
  
  def destroy
    @list = List.find_by_id(params[:id])
    @list.destroy
    head :ok
  end
  
  def index
    @lists = current_user.lists
    respond_with(@lists)
  end
  
  def new
  end
  
  def show
    @list = List.find_by_id(params[:id])
    if @list
      respond_with(@list)
    else
      redirect_to dashboard_url
    end
  end
  
  def update
  end
  
end
