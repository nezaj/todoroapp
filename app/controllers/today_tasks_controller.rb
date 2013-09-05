class TodayTasksController < ApplicationController
  before_filter :require_login!
  respond_to :json
  
  def create
    @task = Task.find_by_id(params[:id]);
    @task.today = true;
    @task.save
    respond_with(@task)
  end
  
  def destroy
    @task = Task.find_by_id(params[:id]);
    @task.today = false;
    @task.save
    respond_with(@task)
  end
    
  def index
    @tasks = current_user.tasks.where(:today => true)
    respond_with(@tasks)
  end
  
end
