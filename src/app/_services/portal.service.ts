import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LOC_STUDENT_SUBJECTS_DATA, LOC_STUDENT_SUBJECT_DATA, LOC_TOPIC_CONTENT, LOC_CURRENT_TEST } from './_shared';
import { environment } from 'src/environments/environment';
import { Studentsubject } from '../_models/studentsubject.model';
import { TopicContent } from '../_models/topic.model';
import { Tests } from '../_models/tests.model';

@Injectable({
  providedIn: 'root'
})
export class PortalService {
  private studentsubjectListBehaviorSubject: BehaviorSubject<Studentsubject[]>;
  public studentsubjectListObservable: Observable<Studentsubject[]>;

  private studentsubjectBehaviorSubject: BehaviorSubject<Studentsubject>;
  public studentsubjectObservable: Observable<Studentsubject>;


  private topicContentBehaviorSubject: BehaviorSubject<TopicContent>;
  public topicContentObservable: Observable<TopicContent>;

  private testBehaviorSubject: BehaviorSubject<Tests>;
  public testObservable: Observable<Tests>;

  url: string;

  constructor(
    private http: HttpClient,
  ) {
    this.studentsubjectListBehaviorSubject = new BehaviorSubject<Studentsubject[]>(JSON.parse(localStorage.getItem(LOC_STUDENT_SUBJECTS_DATA)));
    this.studentsubjectBehaviorSubject = new BehaviorSubject<Studentsubject>(JSON.parse(localStorage.getItem(LOC_STUDENT_SUBJECT_DATA)));
    this.topicContentBehaviorSubject = new BehaviorSubject<TopicContent>(JSON.parse(localStorage.getItem(LOC_TOPIC_CONTENT)));
    this.testBehaviorSubject = new BehaviorSubject<Tests>(JSON.parse(localStorage.getItem(LOC_CURRENT_TEST)));

    this.studentsubjectListObservable = this.studentsubjectListBehaviorSubject.asObservable();
    this.studentsubjectObservable = this.studentsubjectBehaviorSubject.asObservable();
    this.topicContentObservable = this.topicContentBehaviorSubject.asObservable();
    this.testObservable = this.testBehaviorSubject.asObservable();
    this.url = environment.API_URL;
  }

  public get getCurrentStudentsubjects(): Studentsubject[] { 
    return this.studentsubjectListBehaviorSubject.value; 
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

  updateStudentsubjectListState(studentsubjects: Studentsubject[]) {
    this.studentsubjectListBehaviorSubject.next(studentsubjects);
    localStorage.setItem(LOC_STUDENT_SUBJECTS_DATA, JSON.stringify(studentsubjects));
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


}
