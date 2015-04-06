Template.maze.helpers({
  experiment: function() {
    return Session.get('experiment');
  },
  showSolution: function() {
    return Session.get('showSolution');
  }
});

Template.maze.events({
  'click .js-done': function() {
    var experiment = Progress.findOne({userId: Meteor.userId()}, {sort: {iteration: -1}});
    if (!experiment.pass) {
      $('#beatenModal').modal('show');
    } else {
      var userData = UserData.findOne({userId: Meteor.userId()});
      newScore = userData.score + Session.get('countDown');
      UserData.update({_id: userData._id}, {$set: {score: newScore}});
    }
    if (experiment.iteration >= 32) {
      Router.go('complete');
    }

    var next = {};
    next.iteration = experiment.iteration + 1;
    next.userId = Meteor.userId();
    if (experiment.iteration === 16) {
      next.feedback = !experiment.feedback;
    } else {
      next.feedback = experiment.feedback;
    }
    if (experiment.wait === 10) {
      next.wait = 17;
    } else {
      next.wait = 10;
    }
    Progress.insert(next);

    Router.go('experiment');
  }
});