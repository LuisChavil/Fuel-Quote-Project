
const registerForm = document.getElementById("registerForm");
registerForm.addEventListener("submit", registerSubmit);

function registerSubmit(e){
  e.preventDefault();
  const formData = new FormData(e.target);
  const values = Object.fromEntries(formData.entries());
  console.log(values);
  axios.post('/register',values) // axios has to be add in the register.html before use
  .then((response) => {
    console.log(response)
    window.location = 'http://localhost:3000/index.html';
  }), (error) => {
    console.log(error);
  }
}

