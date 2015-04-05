Maze = new Mongo.Collection('mazes');
Experiment = new Mongo.Collection('experiments');
Progress = new Mongo.Collection('progresses');

if (Meteor.isClient) {
  Session.set("MeteorToys_display", true);
}