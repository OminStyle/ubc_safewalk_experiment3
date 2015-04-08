Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});

if (Meteor.isClient) {
  Meteor.startup(function () {
    Session.set('shortWait', 12);
    Session.set('longWait', 22);
    Session.set('loseRate', 0.65); // 1 = 100%, 0.5 = 50%meteor
    Session.set('gameLength', 999); 
  });
}
