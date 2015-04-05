Template.landing.helpers({
  iteration: function() {
    return iteration();
  },
  maze: function() {
    console.log(iteration);
    return Maze.findOne({mazeId: iteration()});
  }
});

Template.landing.events({
  'click .js-start': function() {
    Session.set('wait', 5); // in seconds
    Session.set('waitLeftPercentage', 100);

    Router.go('decision');
  }
});

function iteration() {
  if (!Progress.findOne({userId: Meteor.userId()})) {
    Progress.insert({userId: Meteor.userId(), iteration: 1});
  }
  return Progress.findOne({userId: Meteor.userId()}).iteration;
}