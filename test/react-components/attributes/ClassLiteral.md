```jade
div.content Class literal
```
```javascript
import {createClass, createElement} from "react";
var ClassLiteral = (function ()
{
  return createClass({
    displayName: "ClassLiteral",
    render: function() {
      return createElement("div", {className: "content"}, "Class literal");
    }
  })
})()
module.exports = ClassLiteral;
```
