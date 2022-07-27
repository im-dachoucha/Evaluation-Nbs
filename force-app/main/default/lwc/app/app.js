import { LightningElement } from "lwc";

export default class App extends LightningElement {
  dataIsLoaded = false;
  isLoading = true;
  quizId;
  connectedCallback() {
    this.getQuizId();
  }
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
      duration: 5,
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
      duration: 5,
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
  getQuizId() {
    /* eslint-disable @lwc/lwc/no-async-operation */
    setTimeout(() => {
      const url = new URL(window.location.href);
      this.quizId = url.searchParams.get("quiz");
      console.log(this.quizId);
      this.isLoading = false;
      this.dataIsLoaded = true;
    }, 4000);
  }
}
