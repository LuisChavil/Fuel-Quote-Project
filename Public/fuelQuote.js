
//Check if clients in TX otherwise implement fee
function verify(data){
  console.log(data)
  if(data == "TX")
    return 0.02;
  else
    return 0.04;
    
}  




function estimate(data) {
  const getMe = document.getElementById("getme").value
  
 var x = verify(data.state);
 var y = data["firstentry"] ? 0: .01; 
 var z = getMe > 1000 ? .02 : .03 ;
 //var a = data["gallonsrequested"];
 var result =  (((x - y + z + .1) * 1.5) + 1.5) * getMe
 
 const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})
result = formatter.format(result)

 console.log(result)
 document.getElementById("setme").value =  result ;


}




 
// To get Total Amount before submitting for Final Demo assignment
const FuelQuote = document.getElementById('EstimateForm');
FuelQuote.addEventListener("submit", GetQuote);
function GetQuote(e){
    e.preventDefault();
    axios.get(`/fuelQuote/${getCookie("id")}`)
    .then((response) => {
     // let data = response.data;
     console.log(response.data)
     
     estimate(response.data);

    })
    .catch((error) => {
        console.error(error); 
    })
    

}


// Submitting fuel purchase
const Purchase = document.getElementById('FuelQuoteForm');
Purchase.addEventListener("submit", PurchaseFuel);
function PurchaseFuel(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());
    values["userid"]=getCookie("id");
    console.log(values);
    axios.post('/fuelQuote',values) 
    .then((response) => {
      console.log(response)
      window.location = 'http://localhost:3000/History.html';
    }), (error) => {
      console.log(error);
    }
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