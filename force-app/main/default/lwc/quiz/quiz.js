import { LightningElement, track } from "lwc";

export default class Quiz extends LightningElement {
  @track idx = 0;
  @track question = {};

  dataIsLoaded = false;
  isLoading = true;
  quizId;
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
    this.getQuizId();
  }

  getQuizId() {
    /* eslint-disable @lwc/lwc/no-async-operation */
    setTimeout(() => {
      const url = new URL(window.location.href);
      this.quizId = url.searchParams.get("quiz");
      if (this.quizId) {
        console.log(this.quizId);
        this.isLoading = false;
        this.dataIsLoaded = true;
        this.question = this.questions[this.idx];
      } else {
        this.isLoading = false;
        this.dataIsLoaded = false;
      }
    }, 2000);
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
