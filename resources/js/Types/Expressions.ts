export interface Expression {
  id: number;
  expression: string;
  right_answer: string;
  false_answer_one: string;
  false_answer_two: string;
  expression_language: string;
  answer_language: string;
  example_usage: string | null;
  user_id: number;
  created_at: string;
  updated_at: string;
  is_validated: number;
}
