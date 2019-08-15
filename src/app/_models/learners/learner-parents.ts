import { Parent } from '../parent.model';
import { Learner } from '.';

export interface LearnerParents extends Learner {
  parents: Parent[];
  errors: any[];
}
