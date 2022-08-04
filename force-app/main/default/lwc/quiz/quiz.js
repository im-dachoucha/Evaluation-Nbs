import { LightningElement, track } from "lwc";
import getQuizById from "@salesforce/apex/QuizController.getQuizById";
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

  questions = [
    {
      id: "question1",
      explanation: "Question one",
      duration: 5,
      points: 10,
      options: [
        {
          id: "q1op1",
          value: "Option one"
        },
        {
          id: "q1op2",
          value: "Option two"
        },
        {
          id: "q1op3",
          value: "Option three"
        },
        {
          id: "q1op4",
          value: "Option four"
        }
      ]
    },
    {
      id: "question2",
      explanation: "Question two",
      duration: 10,
      points: 10,
      options: [
        {
          id: "q2op1",
          value: "Option one"
        },
        {
          id: "q2op2",
          value: "Option two"
        },
        {
          id: "q2op3",
          value: "Option three"
        },
        {
          id: "q2op4",
          value: "Option four"
        }
      ]
    },
    {
      id: "question3",
      explanation: "Question three",
      duration: 20,
      points: 10,
      options: [
        {
          id: "q3op1",
          value: "Option one"
        },
        {
          id: "q3op2",
          value: "Option two"
        },
        {
          id: "q3op3",
          value: "Option three"
        },
        {
          id: "q3op4",
          value: "Option four"
        }
      ]
    }
  ];

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
      console.log(res);
      if (res !== null) {
        const currentTime = new Date(new Date().getTime());
        const beginTime = new Date(res.BeginTime__c);
        const expireTime = new Date(res.ExpireTime__c);

        console.log(`current time : ${currentTime}`);
        console.log(`begin time : ${beginTime}`);
        console.log(`expire time : ${expireTime}`);

        if (currentTime < beginTime || currentTime > expireTime) {
          console.log("not in time!!");
          this.isLoading = false;
          this.dataIsLoaded = false;
        } else {
          // todo: query related questions and options
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

  next() {
    if (this.idx < this.questions.length - 1) {
      this.idx++;
      this.question = this.questions[this.idx];
    } else {
      console.log("that was the last question!!");
      this.end = true;
    }
  }

  handleNext({ detail: { answers } }) {
    console.log(answers);
    this.next();
  }
}
