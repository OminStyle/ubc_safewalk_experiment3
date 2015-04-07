Template.results.helpers({
  results: function() {
    return Progress.find({userId: Meteor.userId()});
  },
  boolString: function(input) {
    if (input) {
      return 'true';
    } else {
      return 'false';
    }
  }
});