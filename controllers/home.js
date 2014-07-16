app.get('/', function(req, res) {
  loadAccount(req, function(account) {
    var tweetsPerPage = 25;//,
    Tweet.find({}, {}, {sort: {'date': -1}, limit: tweetsPerPage}, function(err, tweets) {
      res.locals.tweets= tweets;
      res.locals.account= account;
      res.locals.title= 'Nodetter';
      res.locals.haceCuanto = haceCuanto;
      try {
        res.render('home');
      } catch(err) {}
    });
  })
});
