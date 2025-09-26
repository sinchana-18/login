document.getElementById('signupForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  fetch('http://localhost:8000/api/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  })
    .then(res => res.json())
    .then(data => {
      if (data && data.message) {
        document.getElementById('result').textContent = 'Your response is saved!';
      } else {
        document.getElementById('result').textContent = JSON.stringify(data);
      }
    })
    .catch(err => {
      document.getElementById('result').textContent = 'Could not connect to server. Please try again later.';
    });
});