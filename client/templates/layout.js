Template.layout.helpers({
  currentUser: function() {
    return Meteor.user();
  },
  countDown: function() {
    return Session.get('countDown');
  },
  score: function() {
    return UserData.findOne({userId: Meteor.userId()}).score;
  },
  currentTime: function(){
    var d = new Date();
    return d.getHours()+":"+ d.getMinutes();
  }
});