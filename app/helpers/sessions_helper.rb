module SessionsHelper
  def assign_session_token(user)
    user.session_token = generate_unique_token
    user.save!
  end

  def current_user
    return nil if session[:session_token].nil?
    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def generate_unique_token
    token = SecureRandom.urlsafe_base64
    # Ensure unique token
    while User.find_by_session_token(token)
      token = SecureRandom.urlsafe_base64
    end

    token
  end

  def logged_in?
    !!current_user
  end

  def login(user)
    assign_session_token(user)
    session[:session_token] = user.session_token
  end

  def logout
    assign_session_token(current_user)
    session[:session_token] = nil
  end

end
