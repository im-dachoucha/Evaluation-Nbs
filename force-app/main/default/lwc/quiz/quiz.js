import { LightningElement, track } from "lwc";
import getQuizById from "@salesforce/apex/QuizController.getQuizById";
import getQuizQuestions from "@salesforce/apex/QuizController.getQuizQuestions";
import NBS_LOGO from "@salesforce/resourceUrl/nbs_logo";
import SALESFORCE_LOGO from "@salesforce/resourceUrl/salesforce_logo";

export default class Quiz extends LightningElement {
  @track idx = 0;
  @track question = {};
  timeout;
  nbsLogo = NBS_LOGO;
  salesforceLogo = SALESFORCE_LOGO;
  quizName = "";
  dataIsLoaded = false;
  isLoading = true;
  quizId = null;
  end = false;

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
          this.quizName = res.Name;
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
      this.submitQuiz();
      this.end = true;
    }, this.duration * 100);
  }

  fixData = () => {
    this.questions = this.questions.map((question, idx) => {
      question.idx = idx + 1;
      question.isAnswered = false;
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

  // handleSyncOptions = ({ detail: { res } }) => {
  //   this.updateQuestions(JSON.parse(JSON.stringify(res)));
  // };

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

  handleSubmitQuiz = () => {
    // eslint-disable-next-line no-restricted-globals, no-alert
    if (confirm("Make sure you answered all questions")) {
      this.submitQuiz();
    }
  };

  submitQuiz = () => {
    clearTimeout(this.timeout);
    const data = this.questions.map((q) => {
      const answers = q.Options__r.filter((o) => o.isChecked).map((o) => o.Id);
      return {
        qId: q.Id,
        answers
      };
    });
    console.log(data);
    this.end = true;
  };
}
