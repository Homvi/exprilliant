import { User } from './User';

export interface Expression {
  answer_language: string;
  created_at: string;
  example_usage: string | null;
  expression: string;
  expression_language: string;
  false_answer_one: string;
  false_answer_two: string;
  id: number;
  is_validated: number;
  right_answer: string;
  user: User;
  updated_at: string;
}
