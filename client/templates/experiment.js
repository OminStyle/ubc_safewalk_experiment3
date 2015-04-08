Template.experiment.helpers({
  experiment: function() {
    Session.set('experiment', experiment());
    return Session.get('experiment');
  }
});

Template.experiment.events({
  'click .js-start': function() {
    var wait = Session.get('experiment').wait;
    var randomWait = randomInRange(wait, wait+3);
    Session.set('wait', randomWait); // in seconds
    Session.set('waitLeftPercentage', 100);
    Session.set('startTime', new Date().getTime());
    Router.go('decision');
  }
});

function experiment() {
  if (!Progress.findOne({userId: Meteor.userId()})) {
    var type = Distribution.findOne({userId: Meteor.userId()}).type;
    var start = {};
    switch(type) {
      case 1:
        start.feedback = false;
        start.wait = Session.get('shortWait');
        break;
      case 2:
        start.feedback = true;
        start.wait = Session.get('longWait');;
        break;
      case 3:
        start.feedback = false;
        start.wait = Session.get('longWait');;
        break;
      case 4:
        start.feedback = true;
        start.wait = Session.get('shortWait');;
        break;
    }
    start.userId = Meteor.userId();
    start.iteration = 1;
    Progress.insert(start);
    UserData.insert({userId: Meteor.userId(), score: 0});
  }
  return Progress.findOne({userId: Meteor.userId()}, {sort: {iteration: -1}});
}

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}