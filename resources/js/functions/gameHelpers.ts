import axios from 'axios';
import { Expression } from '@/Types/Expressions';
import { shuffle } from 'lodash';

export async function fetchExpressions(gameMode: string, numberOfExpressions: number): Promise<Expression[]> {
  const response = await axios.get(`/random-expressions?mode=${gameMode}&numberOfExpressions=${numberOfExpressions}`);
  return response.data;
}

export async function updateExperience(experienceToAdd: number): Promise<void> {
  try {
    await axios.post('/update-experience', { experienceToAdd });
  } catch (error) {
    console.error('Error updating experience:', error);
  }
}

export function getChoicesInShuffledOrder(activeExpressionWithAnswers: Expression) {
  const shuffledOrders = shuffle([1, 2, 3]);

  const activeExpressionChoices = [
    {
      answer: activeExpressionWithAnswers?.right_answer,
      order: shuffledOrders[0],
      correct: true,
      highlight: false
    },
    {
      answer: activeExpressionWithAnswers?.false_answer_one,
      order: shuffledOrders[1],
      correct: false,
      highlight: false
    },
    {
      answer: activeExpressionWithAnswers?.false_answer_two,
      order: shuffledOrders[2],
      correct: false,
      highlight: false
    }
  ];

  // sort activeExpressionChoices by order number
  activeExpressionChoices.sort((a, b) => a.order - b.order);

  return activeExpressionChoices;
}
