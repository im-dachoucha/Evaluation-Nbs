public without sharing class QuizController {
    @AuraEnabled
    public static Quiz__c getQuizById(string quizId){
        try {
            list<Quiz__c> quiz = [SELECT Name, BeginTime__c, ExpireTime__c, Duration__c FROM Quiz__c WHERE Id = :quizId LIMIT 1];
            if(quiz.size() > 0) return quiz[0];
            return null;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

     @AuraEnabled
     public static List<Question__c> getQuizQuestions(string quizId){
         try {
            List<Question__c> QuestionList = [SELECT Value__c, answer__c, (SELECT Id, Value__c FROM Options__r)
                                                FROM Question__c WHERE Id IN (
                                                    SELECT Question__c
                                                    FROM Questionquiz__c
                                                    WHERE Quiz__c = :quizId)
                                            ];
            return QuestionList;

     } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static integer submitAnswers(string data){
        try {
            integer score = 0;
            // string quizId = data.quizId;
            QuizData quizData = QuizData.parse(data);
            
            // List<Question__c> QuestionsList = [SELECT Value__c, answer__c, (SELECT Id, isCorrect__c FROM Options__r)
            //                                     FROM Question__c WHERE Id IN (
            //                                         SELECT Question__c
            //                                         FROM Questionquiz__c
            //                                         WHERE Quiz__c = :quizId
            //                                     )
            //                                 ];
            // System.debug(QuestionsList);
            return score;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}