Router.configure({
  layoutTemplate: 'layout',
  loading: 'spinner'
});
Router.route('/', {name: 'landing'});
Router.route('/decision', {name: 'decision'});
Router.route('/maze', {name: 'maze'});