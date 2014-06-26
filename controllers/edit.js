app.get('/edit/username', function(req, res) {
  loadAccount(req, function(account) {
    if(account && !account.username) {
      res.locals.account = account;
      res.locals.title = "Editar nombre de usuario";
      res.render('edit/username');
    }
  });
});

app.post('/edit/username', function(req, res) {
  loadAccount(req, function(account) {
    if(account && !account.username) {
      Account.findOne( {username: req.body.username }, function(err, prev) {
        if(!prev) {
          account.username=req.body.username;
          account.save(function(err) {
            res.redirect('/');
          });
        } else {
          res.redirect('/');
        }
      });
    }
  });
});