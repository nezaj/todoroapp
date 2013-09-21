class UnplannedTasksController < ApplicationController
  before_filter :require_login!
  respond_to :json

  def create
    @task = Task.new(params[:unplanned_task])
    @task.list_id = current_user.unplanned_list.id
    @task.unplanned = true
    if @task.save
      respond_with(current_user.unplanned_list, @task)
    else
      render :json => @task.errors.full_messages, :status => 422
    end
  end
  
  def destroy
    @task = Task.find_by_id(params[:id]);
    @task.destroy
    respond_with(@task)
  end
    
  def index
    @tasks = current_user.unplanned_list.tasks
    respond_with(@tasks)
  end
  
  def update
    @task = Task.find_by_id(params[:id]);
    @task.update_attributes(params[:unplanned_task])
    respond_with(@task)
  end
end
