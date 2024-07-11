import { flatMap, get, map } from "lodash";
import { Question } from "./types";

const CDN_ENDPOINT = "https://cdn.tihomir-selak.from.hr/assets/api/ollama";
const QUIZ_ROUTE = "quiz";

const AVAILABLE_QUIZES_PATH = "quizes.json";

export const fetchCdnAvailableQuizes = async () => {
  const response = await fetch(`${CDN_ENDPOINT}/${AVAILABLE_QUIZES_PATH}`);
  const jsonResponse = await response.json();
  const availableQuizes: string[] = flatMap(jsonResponse);
  const output = map(availableQuizes, (path: string) => {
    return path;
  });
  return output;
};

export const getAllQuestions = async () => {
  const awailablePaths = await fetchCdnAvailableQuizes();
  const responses = await Promise.all(
    map(awailablePaths, async (path: string) => {
      const response = await fetch(`${CDN_ENDPOINT}/${QUIZ_ROUTE}/${path}.json`);
      return response.json();
    })
  );

  const data = flatMap(
    map(flatMap(responses), (values) => {
      const difficulty = get(values, "difficulty");
      const topic = get(values, "topic");
      const questions = get(values, "questions");

      return map(questions, (question: any) => ({
        ...question,
        difficulty,
        topic,
      }));
    })
  );

  return data as Question[];
};
