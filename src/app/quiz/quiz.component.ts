import { Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { Option, Question, Quiz, QuizConfig} from '../models/index';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  providers: [QuizService]
})
export class QuizComponent implements OnInit {
  tally = 0;
  quizes: any[];
  quiz: Quiz = new Quiz(null);
  mode = 'home';
  quizName: string;
  config: QuizConfig = {
    'allowBack': true,
    'allowReview': true,
    'autoMove': true,  // if true, it will move to next question automatically when answered.
    'duration': 120,  // indicates the time (in secs) in which quiz needs to be completed. 0 means unlimited.
    'pageSize': 1,
    'requiredAll': true,  // indicates if you must answer all the questions before submitting.
    'richText': false,
    'shuffleQuestions': true,
    'shuffleOptions': false,
    'showClock': true,
    'showPager': true,
    'theme': 'none'
  };

  pager = {
    index: 0,
    size: 1,
    count: 1
  };
  timer: any = null;
  startTime: Date;
  endTime: Date;
  ellapsedTime = '00:00';
  duration = '';

  constructor(private quizService: QuizService) { }

  ngOnInit() {
    this.quizes = this.quizService.getAll();
    this.quizName = this.quizes[0].id;
    this.loadQuiz(this.quizName);
  }

  loadQuiz(quizName: string) {
    this.quizService.get(quizName).subscribe(res => {
      this.quiz = new Quiz(res);
      this.pager.count = this.quiz.questions.length;
      this.startTime = new Date();
      this.timer = setInterval(() => { this.tick(); }, 1000);
      this.duration = this.parseTime(this.config.duration);
    });
    // this.mode = 'quiz';
    this.mode = 'home';
  }

  tick() {
    const now = new Date();
    const diff = (now.getTime() - this.startTime.getTime()) / 1000;
    if (diff >= this.config.duration) {
      this.onSubmit();
    }
    this.ellapsedTime = this.parseTime(diff);
  }

  parseTime(totalSeconds: number) {
    let mins: string | number = Math.floor(totalSeconds / 60);
    let secs: string | number = Math.round(totalSeconds % 60);
    mins = (mins < 10 ? '0' : '') + mins;
    secs = (secs < 10 ? '0' : '') + secs;
    return `${mins}:${secs}`;
  }

  get filteredQuestions() {
    return (this.quiz.questions) ?
      this.quiz.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }

  // Checking if it's selected
  onSelect(question: Question, option: Option) {
    console.log(this.tally);
    // let tally = question.tally;
    if (question.questionTypeId === 1) {
      question.options.forEach((x) => { if (x.id !== option.id) x.selected = false; });
      // this.tally++;
      // console.log(this.tally);
      
    }

    if(question.questionTypeId === 1){
      question.options.forEach((answer) => { 
        if(answer.selected == true && answer.isAnswer == true){
          this.tally++;
          // console.log(this.tally);


      }
    })


  }

    // this changes index to go to next question
    if (this.config.autoMove) {
      this.goTo(this.pager.index + 1);
    }
  }

  // How the index workds
  goTo(index: number) {
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
      // this.mode = 'home';
    }
  }

  isAnswered(question: Question) {
    return question.options.find(x => x.selected) ? 'Answered' : 'Not Answered';
  };

  isCorrect(question: Question) {

  let optionTest = question.options;
  //  return question.options.every(x => x.selected === x.isAnswer) ? 'correct' : 'wrong';
   let style = question.options.every(x => x.selected === x.isAnswer) ? 'correct' : 'wrong';
  //  console.log(x);
   return style;

  };

  onSubmit() {
 
    this.mode = 'result';
  }
}
// var chart = AmCharts.makeChart("chartdiv", {
//   "theme": "light",
//   "type": "gauge",
//   "axes": [{
//     // inner circle
//     "id": "axis1",
//     "labelsEnabled": false,
//     "axisColor": "#808080",
//     "axisAlpha": 1,
//     "tickAlpha": 0,
//     "radius": "20%",
//     "startAngle": 0,
//     "endAngle": 360,
//     "topTextFontSize": 20,
//     "topTextYOffset": 140,
//     "topText": "Goal: 4.0"
//   }, {
//     // red ticks
//     "id": "axis2",
//     "endAngle": 70,
//     "endValue": 400,
//     "radius": "100%",
//     "axisAlpha": 0,
//     "axisThickness": 0,
//     "valueInterval": 4,
//     "minorTickInterval": 4,
//     "tickColor": "#ff0000",
//     "tickLength": 40,
//     "labelsEnabled": true,
//     "labelFrequency": 100,
//     "labelFunction": createLabel,
//     // text inside center circle
//     "topTextFontSize": 20,
//     "topTextYOffset": 130,
//     "topTextColor": "#808080",
//   }, {
//     // green ticks
//     "id": "axis2",
//     "startAngle": 70,
//     "startValue": 400,
//     "endValue": 500,
//     "radius": "100%",
//     "valueInterval": 4,
//     "minorTickInterval": 4,
//     "axisAlpha": 0,
//     "axisThickness": 0,
//     "tickColor": "#006600",
//     "tickLength": 40,
//     "labelsEnabled": true,
//     "labelFrequency": 25,
//     "labelFunction": createLabel,
//   }],
//   "arrows": [{
//     "axis": "axis2",
//     "color": "#808080",
//     "innerRadius": "20%",
//     "nailRadius": 10,
//     "radius": "70%"
//   }],
//   "export": {
//     "enabled": true
//   }
// });

// setInterval(randomValue, 2000);

// // set random value
// function randomValue() {
//   var value = Math.round(Math.random() * 500);
//   chart.arrows[0].setValue(value);
//   chart.axes[1].setTopText(value / 100);
// }

// function createLabel(value) {
//   return value / 100.0
// }
