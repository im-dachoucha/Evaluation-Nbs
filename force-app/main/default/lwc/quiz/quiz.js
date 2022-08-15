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

  questions = [];

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
          const questionsRes = await getQuizQuestions({ quizId: this.quizId });
          this.questions = JSON.parse(JSON.stringify(questionsRes));
          this.fixData();
          this.question = this.questions[this.idx];
          this.isLoading = false;
          this.dataIsLoaded = true;
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

  fixData = () => {
    this.questions = this.questions.map((question, idx) => {
      question.idx = idx + 1;
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
