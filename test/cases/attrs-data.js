module.exports = function() {
  var user = {
    name: "tobi"
  };
  return React.DOM.div(null, (user = {
    name: "tobi"
  }, null), React.DOM.p({
    "data-user": JSON.stringify(user)
  }), React.DOM.p({
    "data-items": JSON.stringify([ 1, 2, 3 ])
  }), React.DOM.p({
    "data-username": '"tobi"'
  }), React.DOM.p({
    "data-escaped": JSON.stringify({
      message: "Let's rock!"
    })
  }));
};