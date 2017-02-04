import {FeaturesProjectInterface} from "./features-project.interface";
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
  byFirebaseUID: string
}
