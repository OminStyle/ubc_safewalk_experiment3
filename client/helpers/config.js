Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});

if (Meteor.isClient) {
  Meteor.startup(function () {
    Session.set('shortWait', 22);
    Session.set('longWait', 30);
    Session.set('loseRate', 1); // 1 = 100%, 0.5 = 50%
    Session.set('gameLength', 20);
  });
}