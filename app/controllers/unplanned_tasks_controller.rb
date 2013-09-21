class UnplannedTasksController < ApplicationController
  before_filter :require_login!
  respond_to :json
  
  def destroy
    @task = Task.find_by_id(params[:id]);
    @task.destroy
    respond_with(@task)
  end
    
  def index
    @tasks = current_user.tasks.where(:unplanned => true)
    respond_with(@tasks)
  end
  
  def update
    @task = Task.find_by_id(params[:id]);
    @task.update_attributes(params[:unplanned_task])
    respond_with(@task)
  end
end
