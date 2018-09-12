var Account = require('./models/account');

var findOrCreateProfile = function(profileDetails, profile, done) {

  var facebook = false,
    twitter = false;

  if(profileDetails.twitterId) {
    twitter = true;
  }

  if(profileDetails.facebookId) {
    facebook = true;
  }

  Account.findOne(profileDetails, function(err, account) {
    if (err || !account) {
        // create the user
        account = new Account({
            username: profile.username,
            profile: profile
        });

        if(twitter) {
          account.twitterId = profile.id;
        } else if(facebook) {
          account.facebookId = profile.id;
        }

        account.save(done);
    } else {
        done(null, account);
    }
  });
}

module.exports = findOrCreateProfile;
