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
  Session.set('countDown', Session.get('gameLength'));
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
      var experiment = Progress.findOne({_id: Session.get('experiment')._id});
      if (experiment.beaten) {
        $('#beatenModal').modal('show');
      } else {
        $('#timeoutModal').modal('show');
      }
      Meteor.clearInterval(countDownId);
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
  },1000);
  var interrupts = [timerId, countDownId];
  Session.set('interrupts', interrupts);
  this.render('decision');
});
Router.route('/maze', {name: 'maze'});
Router.route('/complete', {name: 'complete'});
Router.route('/results', {name: 'results'});