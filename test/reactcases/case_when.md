```jade
- var friends = 10
case friends
  when 0
    p you have no friends
  when 1
    p you have a friend
  default
    p you have #{friends} friends
```
```javascript
function src(){
  var friends = 10
  switch (friends) {
    case 0:
      return React.createElement('p', null, "you have no friends");
    case 1:
      return React.createElement('p', null, "you have a friend");
    default:
      return React.createElement('p', null, "you have ", friends,  " friends");
  }
}
```