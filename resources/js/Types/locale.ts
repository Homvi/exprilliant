export interface LocalizedText {
  home_page: {
    title: string;
    get_started: string;
    login: string;
    explanation: string;
    request_new_expression: string;
  };
  choose_game_mode_page: {
    choose_language_title: string;
    spanish_to_english: string;
    english_to_spanish: string;
    english_to_hungarian: string;
  };
  navbar: {
    register: string;
    login_nav: string;
    logout: string;
    request_new_expression: string;
  };
  score_page: {
    your_score: string;
    good_job: string;
    excellent_job: string;
    go_to_main_page: string;
    give_me_more: string;
  };
  login_page: {
    title: string;
    email_label: string;
    password_label: string;
    remember_me: string;
    forgot_password: string;
    login_button: string;
  };
  register_page: {
    title: string;
    name_label: string;
    email_label: string;
    password_label: string;
    confirm_password_label: string;
    already_registered: string;
    register_button: string;
  };
  request_new_expression_page: {
    example_usage: string;
    title: string;
    expression_label: string;
    right_answer_label: string;
    false_answer_one_label: string;
    false_answer_two_label: string;
    expression_language_label: string;
    answer_language_label: string;
    submit_button: string;
    success_message: string;
    error_message: string;
  };
  confirm_password_page: {
    title: string;
    description: string;
    password_label: string;
    confirm_button: string;
  };
  forgot_password_page: {
    title: string;
    description: string;
    submit_button: string;
  };
  reset_password_page: {
    title: string;
    email_label: string;
    password_label: string;
    confirm_password_label: string;
    submit_button: string;
  };
  verify_email_page: {
    title: string;
    description: string;
    verification_link_sent: string;
    resend_button: string;
    logout_button: string;
  };
}
