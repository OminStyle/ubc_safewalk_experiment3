Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'spinner',
  waitOn: function() {
    return [
      Meteor.subscribe('userDatas'),
      Meteor.subscribe('progresses'),
      Meteor.subscribe('distributions')
    ]
  }
});

Router.onBeforeAction(function () {
  // all properties available in the route function
  // are also available here such as this.params

  if (!Meteor.user()) {
    // if the user is not logged in, render the welcome template
    this.redirect('welcome');
  }
  this.next();
});

Router.route('/', {
  name: 'welcome',
  action: function() {
    if (Meteor.user()) {
      this.redirect('experiment');
    }
    this.render('welcome');
  }
});

Router.route('/experiment', function() {
  var interrupts = Session.get('interrupts');
  if (interrupts) {
    for (var i=0; i < interrupts.length; i++) {
      Meteor.clearInterval(interrupts[i]);
    }
  }
  Session.set('countDown', 30);
  this.render('experiment');
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
});
Router.route('/maze', {name: 'maze'});
Router.route('/complete', {name: 'complete'});
Router.route('/results', {name: 'results'});