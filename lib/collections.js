UserData = new Mongo.Collection('userDatas');
Progress = new Mongo.Collection('progresses');
Distribution = new Mongo.Collection('distributions');

if (Meteor.isClient) {
  Session.set("MeteorToys_display", true);
}