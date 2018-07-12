import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  constructor(private quiz: QuizService) { 
    this.quiz = quiz;
    // console.log(this.quiz.description);
  }

  ngOnInit() {
  }

}
