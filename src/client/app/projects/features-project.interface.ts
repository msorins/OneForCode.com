import {QuestionsInterface} from "./questions.interface";
/**
 * Created by so on 03/02/2017.
 */
export interface FeaturesProjectInterface {
  title: string;
  description: string;
  ch: string;
  status: string;
  largeDescription: string;
  questions: QuestionsInterface[],
}
