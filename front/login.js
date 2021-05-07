document.getElementById('form').addEventListener('submit', function(e){
    e.preventDefault();
    var name= document.getElementById('username_input').value;
    fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'GET',
  body: JSON.stringify({
    username: name,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  }
})
.then((response) => response.json())
.then((json) => console.log(json));
})


