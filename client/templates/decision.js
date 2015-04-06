Template.decision.helpers({
  experiment: function() {
    return Session.get('experiment');
  },
  percentage: function() {
    return Session.get('waitLeftPercentage');
  },
  solutionAvailable: function() {
    return Session.get('waitLeftPercentage')<= 0;
  },
  actualWait: function() {
    return Session.get('wait');
  }
});

Template.decision.events({
  'click .js-solution': function() {
    Session.set('showSolution', true);
    Progress.update({_id: Session.get('experiment')._id}, {$set: {decisionTime: decisionTime(), decision: 'solution'}});
    Router.go('maze');
  },
  'click .js-skip': function() {
    Session.set('showSolution', false);
    var beaten = (Math.random() < 0.5) ? true : false;
    Progress.update({_id: Session.get('experiment')._id}, {$set: {decisionTime: decisionTime(), decision: 'skip', beaten: beaten}});
    Router.go('maze');
  }
});

function decisionTime() {
  return (new Date().getTime() - Session.get('startTime'))/1000;
}