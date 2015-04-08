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
    if (experiment.beaten) {
      //$('#beatenModal').modal('show');
    } else {
      var userData = UserData.findOne({userId: Meteor.userId()});
      newScore = userData.score + Session.get('countDown');
      UserData.update({_id: userData._id}, {$set: {score: newScore}});
    }
    if (experiment.iteration >= 32) {
      Router.go('complete');
    } else{
      var next = {};
      next.iteration = experiment.iteration + 1;
      next.userId = Meteor.userId();
      if (experiment.iteration === 16) {
        next.feedback = !experiment.feedback;
      } else {
        next.feedback = experiment.feedback;
      }
      if (experiment.wait === Session.get('shortWait')) {
        next.wait = Session.get('longWait');
      } else {
        next.wait = Session.get('shortWait');
      }
      Progress.insert(next);

      Router.go('experiment');
    }
  }
});