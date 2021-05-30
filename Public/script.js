// 
function openPage(pageName, elmnt, color) {
  // Hide all elements with class="tabcontent" by default */
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    //hide each page 
    tabcontent[i].style.display = "none";
  }


  tablinks = document.getElementsByClassName("tablink");
  //make all tabs have no background color
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }

  // display the page you clicked on 
  document.getElementById(pageName).style.display = "block";

  // Add the specific color to the button used to open the tab content
  elmnt.style.backgroundColor = color;
}


// const nameInput = document.querySelector('user_username');
// const passwordInput = document.querySelector('user_password');
// const loginButton = document.getElementById('#logIn');



const nameInput = document.getElementById("user_username");
const passwordInput = document.getElementById("user_password");
const loginForm = document.getElementById("regForm");

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

loginForm.addEventListener("submit",onSubmit);

function onSubmit(e) {
  e.preventDefault();
  
  console.log(nameInput.value)
  console.log(passwordInput.value)
  axios.post('/login', {
    username: nameInput.value,
    password: passwordInput.value
    
  })
    .then((response) => {
      console.log(response);
      //openPage('History', document.getElementById("historyTab"), 'orange')
      setCookie("id",response.data.id,365)
      window.location = 'http://localhost:3000/History.html';
      //location.href="History.html"
    }, (error) => {
      console.log(error);
    });
}

const contactName = document.getElementById("fname");
const contactForm = document.getElementById("form");
contactForm.addEventListener("submit", contact);

function contact(e) {
  e.preventDefault();
  axios.post('/contact', {
    name: contactName.value,
  })
  .then((response) => {
    console.log(response)
    alert(`Thank you for contacting us ${response.data.name}`)
  }), (error) => {
    console.log(error);
  }
}


const newName = document.getElementById("fname");
const newEmail = document.getElementById("email");
const newPhone = document.getElementById("telephone");
const newAddress = document.getElementById("adr");
const newCity = document.getElementById("city");
const newState = document.getElementById("state");
const newZip = document.getElementById("zip");
const newUser = document.getElementById("username");
const newPassword = document.getElementById("password");








/* End of JavaScript Function for general page layout, multi-tab switching, etc. */

/* Beginning of registration form JavaScript Section */
var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tablink");
  console.log(x)
  //x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  // if (n == 0) {
  //   document.getElementById("prevBtn").style.display = "none";
  // } else {
  //   document.getElementById("prevBtn").style.display = "inline";
  // }
  // if (n == (x.length - 1)) {
  //   document.getElementById("nextBtn").innerHTML = "Submit";
  // } else {
  //   document.getElementById("nextBtn").innerHTML = "Next";
  // }
  // ... and run a function that displays the correct step indicator:
  //fixStepIndicator(n)
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    document.getElementById("regForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false:
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid;
}

function fixStepIndicator(n) {

  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }

  x[n].className += " active";
}

