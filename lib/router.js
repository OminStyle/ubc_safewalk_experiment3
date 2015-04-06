Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'spinner',
  waitOn: function() {
    return [
      Meteor.subscribe('mazes'),
      Meteor.subscribe('progresses'),
      Meteor.subscribe('experiments'),
      Meteor.subscribe('distributions')
    ]
  }
});

Router.route('/', function() {
  var interrupts = Session.get('interrupts');
  if (interrupts) {
    for (var i=0; i < interrupts.length; i++) {
      Meteor.clearInterval(interrupts[i]);
    }
  }
  Session.set('countDown', 40);
  this.render('experiment');
}, {
  name: 'experiment'
});

Router.route('/decision', function() {
  var timerId = Meteor.setInterval(function() {
    var wait = Session.get('wait');
    var waitLeft = Session.get('waitLeftPercentage');
    if (waitLeft > 0) {
      Session.set('waitLeftPercentage', waitLeft - 10/wait);
    } else {
      Meteor.clearInterval(timerId);
      if (document.getElementById("solution")) {
        Meteor.setTimeout(function() {
          document.getElementById("solution").disabled = false;
        }, 500)
      }
    }
  },100);

  var countDownId = Meteor.setInterval(function() {
    var time = Session.get('countDown');
    if (time > 0) {
      Session.set('countDown', time - 1);
    } else {
      Meteor.clearInterval(countDownId);
    }
  },1000);
  var interrupts = [timerId, countDownId];
  Session.set('interrupts', interrupts);
  this.render('decision');
}, {
  name: 'decision'
});
Router.route('/maze', {name: 'maze'});

Router.onBeforeAction(function () {
  // all properties available in the route function
  // are also available here such as this.params

  if (!Meteor.userId()) {
    // if the user is not logged in, render the Login template
    this.render('welcome');
  } else {
    // otherwise don't hold up the rest of hooks or our route/action function
    // from running
    this.next();
  }
});