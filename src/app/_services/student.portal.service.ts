import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../_models/user.model';
import { map } from 'rxjs/operators';
import { Studentsubject } from '../_models/studentsubject.model';
import { GET_STUDENT_SUBJECTS_URL } from './_shared/constants';
import { Tests } from '../_models/tests.model';
import { TopicContent } from '../_models/topic.model';
import { LOC_STUDENT_SUBJECTS_DATA, LOC_STUDENT_SUBJECT_DATA, LOC_TOPIC_CONTENT, LOC_CURRENT_TEST, LOC_ASSIGNMENT_DATA } from './_shared';
import { Assignment } from '../_models/assignment.model';


@Injectable({
  providedIn: 'root'
})
export class StudentPortalService {


  private studentSubjectListBehaviorSubject: BehaviorSubject< Studentsubject[]>;
  public studentSubjectListObservable: Observable< Studentsubject[]>;

  
  private studentsubjectBehaviorSubject: BehaviorSubject<Studentsubject>;
  public studentsubjectObservable: Observable<Studentsubject>;


  private topicContentBehaviorSubject: BehaviorSubject<TopicContent>;
  public topicContentObservable: Observable<TopicContent>;

  private testBehaviorSubject: BehaviorSubject<Tests>;
  public testObservable: Observable<Tests>;

  private assignmentBehaviorSubject: BehaviorSubject<Assignment>;
  public assignmentObservable: Observable<Assignment>;
  url: string;

  constructor(
    private http: HttpClient
  ) {
    this.studentSubjectListBehaviorSubject = new BehaviorSubject< Studentsubject[]>(JSON.parse(localStorage.getItem(LOC_STUDENT_SUBJECTS_DATA)) || []);
    this.studentSubjectListObservable = this.studentSubjectListBehaviorSubject.asObservable();
    

    this.studentsubjectBehaviorSubject = new BehaviorSubject<Studentsubject>(JSON.parse(localStorage.getItem(LOC_STUDENT_SUBJECT_DATA)));
    this.topicContentBehaviorSubject = new BehaviorSubject<TopicContent>(JSON.parse(localStorage.getItem(LOC_TOPIC_CONTENT)));
    
    this.testBehaviorSubject = new BehaviorSubject<Tests>(JSON.parse(localStorage.getItem(LOC_CURRENT_TEST)));

    this.assignmentBehaviorSubject = new BehaviorSubject<Assignment>(JSON.parse(localStorage.getItem(LOC_ASSIGNMENT_DATA)));
    this.assignmentObservable = this.assignmentBehaviorSubject.asObservable();



    this.url = environment.API_URL;
  }

  public get currentStudentSubjectListValue():  Studentsubject[] {
    return this.studentSubjectListBehaviorSubject.value;
  }

  public get getCurrentStudentsubject(): Studentsubject { 
    return this.studentsubjectBehaviorSubject.value; 
  }

  public get getCurrentTopicContent(): TopicContent { 
    return this.topicContentBehaviorSubject.value; 
  }
  public get getCurrentTest(): Tests { 
    return this.testBehaviorSubject.value; 
  }
  public get getCurrentAssignment(): Assignment { 
    return this.assignmentBehaviorSubject.value; 
  }

  updateStudentubjectState(studentsubject: Studentsubject) {
    this.studentsubjectBehaviorSubject.next(studentsubject);
    localStorage.setItem(LOC_STUDENT_SUBJECT_DATA, JSON.stringify(studentsubject));
  }


  updateTopicContentState(content: TopicContent) {
    this.topicContentBehaviorSubject.next(content);
    localStorage.setItem(LOC_TOPIC_CONTENT, JSON.stringify(content));
  }

  updateTestState(test: Tests) {
    this.testBehaviorSubject.next(test);
    localStorage.setItem(LOC_CURRENT_TEST, JSON.stringify(test));
  }
  updateAssignmentState(assignment: Assignment) {
    this.assignmentBehaviorSubject.next(assignment);
    localStorage.setItem(LOC_ASSIGNMENT_DATA, JSON.stringify(assignment));
  }

  updateStudentSubjectListState(studentSubjectList:  Studentsubject[]) {
    this.studentSubjectListBehaviorSubject.next(studentSubjectList);
    localStorage.setItem(LOC_STUDENT_SUBJECTS_DATA, JSON.stringify(studentSubjectList));
  }

  getStudentSubjectList(userId: string) {
    this.http.get< Studentsubject[]>(`${this.url}/${GET_STUDENT_SUBJECTS_URL}?UserId=${userId}`).subscribe(data => {
      if (data) {
        this.updateStudentSubjectListState(data);
      }
    });
  }


}
