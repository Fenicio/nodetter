app.get('/logout', function(req, res, params) {
  req.logout();
  if(req.headers.referer) {
    res.redirect(req.headers.referer);
  } else {
    res.redirect('/');
  }
});

app.get('/auth/facebook', function(req, res) {
  req.authenticate(['Faceboook'], function(err, ath) {
    loadAccount(req, function(account) {
      if(req.headers.referer && req.headers.referer.substring(0,23)=='http://www.facebook.com') {
        if(account && !account.username) {
          res.redirect('/edit/username');
        } else {
          res.redirect('/');
        }
      } else {
        res.redirect('/');
      }
    });
  });
});