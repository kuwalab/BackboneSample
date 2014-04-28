(function() {
  // *******************************************************
  console.log('%c%s', labelStyle, label('Event'));
  
  var object = {};
  
  _.extend(object, Backbone.Events);
  
  object.on('alert', function(msg) {
    console.log('Triggered ' + msg);
  });

  object.trigger('alert', 'an event');
})();
