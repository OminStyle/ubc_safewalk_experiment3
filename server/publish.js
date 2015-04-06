Meteor.publish('mazes', function() {
  return Maze.find();
});

Meteor.publish('progresses', function() {
  return Progress.find();
});

Meteor.publish('distributions', function() {
  return Distribution.find();
});