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
    var experiment = Session.get('experiment');
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