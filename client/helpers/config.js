Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});

if (Meteor.isClient) {
  Meteor.startup(function () {
    Session.set('shortWait', 10);
    Session.set('longWait', 20);
    Session.set('loseRate', 0.65); // 1 = 100%, 0.5 = 50%meteor
    Session.set('gameLength', 60);
  });
}