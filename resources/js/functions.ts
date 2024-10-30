import { shuffle } from "lodash";
import { Expression } from "./types/Expressions";

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
