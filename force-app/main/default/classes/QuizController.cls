public without sharing class QuizController {
    @AuraEnabled
    public static Quiz__c getQuizById(string quizId){
        try {
            list<Quiz__c> quiz = [SELECT BeginTime__c, ExpireTime__c FROM Quiz__c WHERE Id = :quizId LIMIT 1];
            if(quiz.size() > 0) return quiz[0];
            return null;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

     @AuraEnabled
     public static List<Question__c> getQuizQuestions(string quizId){
         try {
            List<Question__c> QuestionList = [SELECT Value__c, duration__c , (SELECT Id, Value__c FROM Options__r)
                                                FROM Question__c WHERE Id IN (
                                                    SELECT Question__c
                                                    FROM Questionquiz__c
                                                    WHERE Quiz__c = :quizId)
                                            ];
            System.debug(QuestionList);
            System.debug('test');
            return QuestionList;

     } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}