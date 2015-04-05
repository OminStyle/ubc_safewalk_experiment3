Template.decision.helpers({
  percentage: function() {
    return Session.get('waitLeftPercentage');
  },
  solutionAvailable: function() {
    return Session.get('waitLeftPercentage')<= 0;
  }
});

Template.decision.events({
  'click .js-solution': function() {
    Session.set('showSolution', true);
    Router.go('maze');
  },
  'click .js-skip': function() {
    Session.set('showSolution', false);
    Router.go('maze');
  }
});

