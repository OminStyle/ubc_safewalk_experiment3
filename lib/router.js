Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'spinner',
  waitOn: function() {
    return [
      Meteor.subscribe('mazes'),
      Meteor.subscribe('progresses'),
      Meteor.subscribe('experiments')
    ]
  }
});
Router.route('/', function() {
  Session.set('countDown', 60);
  this.render('landing');
}, {
  name: 'landing'
});
Router.route('/decision', function() {
  var timerId = Meteor.setInterval(function() {
    var wait = Session.get('wait');
    var waitLeft = Session.get('waitLeftPercentage');
    if (waitLeft > 0) {
      Session.set('waitLeftPercentage', waitLeft - 10/wait);
    } else {
      Meteor.clearInterval(timerId);
      Meteor.setTimeout(function() {
        document.getElementById("solution").disabled = false;
      }, 500)
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

  this.render('decision');
}, {
  name: 'decision'
});
Router.route('/maze', {name: 'maze'});