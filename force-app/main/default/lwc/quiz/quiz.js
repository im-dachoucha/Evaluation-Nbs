import { LightningElement, track } from "lwc";
import getQuizById from "@salesforce/apex/QuizController.getQuizById";
import getQuizQuestions from "@salesforce/apex/QuizController.getQuizQuestions";
import NBS_LOGO from "@salesforce/resourceUrl/nbs_logo";
import SALESFORCE_LOGO from "@salesforce/resourceUrl/salesforce_logo";

export default class Quiz extends LightningElement {
  @track idx = 0;
  @track question = {};
  nbsLogo = NBS_LOGO;
  salesforceLogo = SALESFORCE_LOGO;

  dataIsLoaded = false;
  isLoading = true;
  quizId = null;
  end = false;

  // test = [
  //   { id: 1, idx: 1 },
  //   { id: 2, idx: 2 },
  //   { id: 3, idx: 3 },
  //   { id: 4, idx: 4 },
  //   { id: 5, idx: 5 },
  //   { id: 6, idx: 6 },
  //   { id: 7, idx: 7 },
  //   { id: 8, idx: 8 },
  //   { id: 9, idx: 9 },
  //   { id: 10, idx: 10 },
  //   { id: 11, idx: 11 },
  //   { id: 12, idx: 12 },
  //   { id: 13, idx: 13 },
  //   { id: 14, idx: 14 },
  //   { id: 15, idx: 15 },
  //   { id: 16, idx: 16 },
  //   { id: 17, idx: 17 },
  //   { id: 18, idx: 18 },
  //   { id: 19, idx: 19 },
  //   { id: 20, idx: 20 },
  //   { id: 21, idx: 21 },
  //   { id: 22, idx: 22 },
  //   { id: 23, idx: 23 },
  //   { id: 24, idx: 24 },
  //   { id: 25, idx: 25 },
  //   { id: 26, idx: 26 },
  //   { id: 27, idx: 27 },
  //   { id: 28, idx: 28 },
  //   { id: 29, idx: 29 },
  //   { id: 30, idx: 30 },
  //   { id: 31, idx: 31 },
  //   { id: 32, idx: 32 },
  //   { id: 33, idx: 33 },
  //   { id: 34, idx: 34 },
  //   { id: 35, idx: 35 },
  //   { id: 36, idx: 36 },
  //   { id: 37, idx: 37 },
  //   { id: 38, idx: 38 },
  //   { id: 39, idx: 39 },
  //   { id: 40, idx: 40 }
  // ];

  questions = [];

  @track duration = 0;

  connectedCallback() {
    this.startQuiz();
  }

  async startQuiz() {
    const url = new URL(window.location.href);
    this.quizId = url.searchParams.get("quiz");
    if (this.quizId === null) {
      this.isLoading = false;
      this.dataIsLoaded = false;
      return;
    }

    try {
      const res = await getQuizById({ quizId: this.quizId });
      if (res !== null) {
        const currentTime = new Date(new Date().getTime());
        const beginTime = new Date(res.BeginTime__c);
        const expireTime = new Date(res.ExpireTime__c);
        // console.log(`current time : ${currentTime}`);
        // console.log(`begin time : ${beginTime}`);
        // console.log(`expire time : ${expireTime}`);

        if (currentTime < beginTime || currentTime > expireTime) {
          console.log("not in time!!");
          this.isLoading = false;
          this.dataIsLoaded = false;
        } else {
          // done: query related questions and options
          this.duration = parseInt(res.Duration__c, 10);
          const questionsRes = await getQuizQuestions({ quizId: this.quizId });
          this.questions = JSON.parse(JSON.stringify(questionsRes));
          this.fixData();
          this.question = this.questions[this.idx];
          this.isLoading = false;
          this.dataIsLoaded = true;
          this.countDown();
        }
      } else {
        this.isLoading = false;
        this.dataIsLoaded = false;
      }
    } catch (err) {
      console.log(err);
      this.isLoading = false;
      this.dataIsLoaded = false;
    }
  }

  /* eslint-disable @lwc/lwc/no-async-operation */
  countDown() {
    this.timeout = setTimeout(() => {
      console.log("time's up!!");
      // this.end = true;
    }, this.duration * 1000);
  }

  fixData = () => {
    this.questions = this.questions.map((question, idx) => {
      question.idx = idx + 1;
      // this.duration += question.Duration__c;
      question.Options__r?.forEach((option) => {
        option.isChecked = false;
      });
      return question;
    });
  };

  handleJumpToQuestion = ({ detail: { index } }) => {
    this.idx = index;
    this.question = this.questions[this.idx];
  };

  handleSyncOptions = ({ detail: { res } }) => {
    this.updateQuestions(JSON.parse(JSON.stringify(res)));
  };

  next() {
    if (this.idx < this.questions.length - 1) {
      this.idx++;
      this.question = this.questions[this.idx];
    } else {
      console.log("that was the last question!!");
    }
  }

  previous() {
    if (this.idx > 0) {
      this.idx--;
      this.question = this.questions[this.idx];
    } else {
      console.log("this is the first question!!");
      // this.end = true;
    }
  }

  handleNext({ detail: { res } }) {
    this.updateQuestions(JSON.parse(JSON.stringify(res)));
    this.next();
  }
  handlePrevious({ detail: { res } }) {
    this.updateQuestions(JSON.parse(JSON.stringify(res)));
    this.previous();
  }

  updateQuestions = (qItem) => {
    this.questions = this.questions.map((q) => {
      if (q.Id === qItem.Id) q = { ...qItem };
      return q;
    });
  };
}
