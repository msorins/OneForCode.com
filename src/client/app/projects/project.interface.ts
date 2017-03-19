import {FeaturesProjectInterface} from "./features-project.interface";
import {NewsInterface} from "./news.interface";
import {ContributionInterface} from "./contribution.interface";
/**
 * Created by sorynsoo on 16/12/2016.
 */
export interface ProjectInterface {
  title: string;
  gitProject: string;
  tags: string
  description: string
  ch: string
  gitUID: string,
  features: FeaturesProjectInterface[],
  contributions: ContributionInterface[],
  news: NewsInterface[],
  byFirebaseUID: string,
  byUserName: string,
  hasHeader: boolean,
  creationTimeStamp: string,
  new?: boolean
}
