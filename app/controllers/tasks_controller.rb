class TasksController < ApplicationController
  before_filter :require_login!
  respond_to :json
  
  def create
    @task = Task.new(params[:task])
    if @task.save
      respond_with(@task)
    else
      respond_with(@task.error.full_messages, :status => 422)
    end
  end
  
  def destroy
    @task = Task.find_by_id(params[:id])
    @task.destroy
    head :ok
  end
  
  def index
    @list = List.find_by_id(params[:list_id])
    @tasks = @list.tasks
    respond_with(@tasks)
  end
  
  def update
  end
  
end
