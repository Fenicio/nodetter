var TweetSchema = new Schema({
	username: String,
	text: String,
	date: Date
});

mongoose.model('Tweet', TweetSchema);