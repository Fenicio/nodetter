app.post('/tweet', function(req, res) {
  loadAccount(req, function(account) {
    if(account && account.username) {
      var t = new Tweet();
      t.username=account.username;
      t.text=req.body.tweet;
      t.date= new Date();
      t.save(function(err) {
        res.redirect('/');
      });
    }
  });
});