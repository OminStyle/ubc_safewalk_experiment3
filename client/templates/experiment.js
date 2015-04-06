Template.experiment.helpers({
  iteration: function() {
    return iteration().iteration;
  }
});

Template.experiment.events({
  'click .js-start': function() {
    Session.set('wait', 5); // in seconds
    Session.set('waitLeftPercentage', 100);

    Router.go('decision');
  }
});

function iteration() {
  if (!Progress.findOne({userId: Meteor.userId()})) {
    var type = Distribution.findOne({userId: Meteor.userId()}).type;
    var start = {};
    switch(type) {
      case 1:
        start.feedback = false;
        start.wait = 10;
        break;
      case 2:
        start.feedback = true;
        start.wait = 20;
        break;
      case 3:
        start.feedback = false;
        start.wait = 20;
        break;
      case 4:
        start.feedback = true;
        start.wait = 10;
        break;
    }
    start.userId = Meteor.userId();
    start.iteration = 1;
    Progress.insert(start);
  }
  return Progress.findOne({userId: Meteor.userId()}, {sort: {iteration: -1}});
}