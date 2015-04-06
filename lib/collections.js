Maze = new Mongo.Collection('mazes');
Experiment = new Mongo.Collection('experiments');
Progress = new Mongo.Collection('progresses');
Distribution = new Mongo.Collection('distributions');

if (Meteor.isClient) {
  Session.set("MeteorToys_display", true);
}