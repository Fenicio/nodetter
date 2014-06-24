app.get('/:username', function(req, res) {
  loadAccount(req, function(account) {
    Account.findOne({username: req.params.username}, function(err, user) {
      var search_regex = new RegExp('@'+req.params.username,'i');
      var tweets_per_page = 25;
      Tweets.find({ $or: [{username: req.params.username}, {text: search_regex}]}, {},
        {sort: {date: -1}, limit: tweets_per_page}, function(err, tweets) {
        res.local.user=user;
        res.local.tweets=tweets;
        res.local.account=account;
        res.local.title=req.params.username;
        res.render('user');
      });
    });
  });
});