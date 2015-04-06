Template.maze.helpers({
  showSolution: function() {
    return Session.get('showSolution');
  }
});

Template.maze.events({
  'click .js-done': function() {
    Router.go('experiment');
  }
});