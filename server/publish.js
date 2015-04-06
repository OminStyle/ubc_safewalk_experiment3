Meteor.publish('userDatas', function() {
  return UserData.find();
});

Meteor.publish('progresses', function() {
  return Progress.find();
});

Meteor.publish('distributions', function() {
  return Distribution.find();
});