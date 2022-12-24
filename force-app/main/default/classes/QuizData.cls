public class QuizData {

	public class User {
		public String fname;
		public String lname;
		public String email;
	}

	public class Answers {
		public String qId;
		public List<String> data;
	}

	public String quizId;
	public User user;
	public List<Answers> answers;

	
	public static QuizData parse(String json) {
		return (QuizData) System.JSON.deserialize(json, QuizData.class);
	}
}