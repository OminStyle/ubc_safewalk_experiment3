Accounts.onCreateUser(function(options, user) {
  var system = Distribution.findOne({'system': true});
  if (!system) {
    Distribution.insert({'system': true, 'nextType': 1});
    system = Distribution.findOne({'system': true});
  }
  Distribution.insert({'type': system.nextType, userId: user._id, username: user.username});
  var nextType = system.nextType + 1;
  if (nextType > 4) {
    nextType = 1;
  }
  Distribution.update(system, {$set: {'nextType': nextType}});
  return user;
});