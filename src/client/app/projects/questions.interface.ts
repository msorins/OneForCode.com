/**
 * Created by so on 24/02/2017.
 */
export interface QuestionsInterface {
  byFirebaseUID: string;
  byUserName: string;
  question: string;
  answer: string;
  date: string;
  editable?: boolean;
}
