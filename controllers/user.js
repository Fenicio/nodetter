app.get('/:username', function(req, res) {
  loadAccount(req, function(account) {
    Account.findOne({username: req.params.username}, function(err, user) {
      var search_regex = new RegExp('@'+req.params.username,'i');
      var tweets_per_page = 25;
      res.locals.username=req.params.username;
      Tweet.find({ $or: [{username: req.params.username}, {text: search_regex}]}, {},
        {sort: {date: -1}, limit: tweets_per_page}, function(err, tweets) {
        res.locals.user=user;
        res.locals.tweets=tweets;
        res.locals.account=account;
        res.locals.title=req.params.username;
        res.locals.haceCuanto = haceCuanto;
        res.render('user');
      });
    });
  });
});