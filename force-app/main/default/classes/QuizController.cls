public with sharing class QuizController {
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

    // @AuraEnabled
    // public static string getQuizQuestions(Id quizId){
    //     try {
    //     } catch (Exception e) {
    //         throw new AuraHandledException(e.getMessage());
    //     }
    // }
}

