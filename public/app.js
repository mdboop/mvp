var getUserInfo = function(location) {
  var now = new Date().toString().split(' ');

  var day = now[0];
  var hour = now[4];

  return {
    day: day,
    hour: hour
  };

};