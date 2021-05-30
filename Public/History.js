// Cookies was used here so i can know which user is in
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


 // Margin =  Current Price * (Location Factor - Rate History Factor + Gallons Requested Factor + Company Profit Factor) 
 // Function grabs data that was received after get request to know if this user is in the states or not. 
function verify(data){
  console.log(data)
  if(data == "TX")
    return 0.02;
  else
    return 0.04;
    
}  


// Used this to build my table of data for the history
function buildTable(data) {
   let body = document.querySelector("#fuelQuote > tbody");

   for (var rowInfo of data.doc){
       buildRow(rowInfo,data.state,body);
   }
}

function buildRow(rowInfo,state,body){
    
    let row = document.createElement("tr");
    let td = document.createElement("td");
    td.innerHTML = rowInfo["_id"]
    //id.innerHTML = rowInfo["_id"]
    row.appendChild(td);

    td = document.createElement("td");
    td.innerHTML = new Date(rowInfo["date"])
    row.appendChild(td);

    

    td = document.createElement("td");
    let deliveryDate = new Date(rowInfo["date"])
    deliveryDate.setDate(deliveryDate.getDate() + 4)
    td.innerHTML = deliveryDate //Delivery Date
    row.appendChild(td);

    td = document.createElement("td");
    td.innerHTML = rowInfo["gallonsrequested"]
    row.appendChild(td);

    

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    })
   

    var x = verify(state)
    var y = rowInfo["firstentry"] ? 0 : .01 // Previous History
    var z = rowInfo["gallonsrequested"] > 1000 ? .02 : .03 ;
    td = document.createElement("td");
    td.innerHTML =   formatter.format( (((x - y + z + .1) * 1.5) + 1.5) * rowInfo.gallonsrequested)
    row.appendChild(td);


    body.appendChild(row);
}

// sent a get request using a cookie to return the information i need to calculate all the fees the client has to pay 
axios.get(`/History/${getCookie("id")}`)
  .then((response) => {
   // let data = response.data;
   console.log(response.data)
    buildTable(response.data)
   // buildTable(data);
    
    
  }) // console error if it fails
  .catch((error) => {
      console.error(error); 
  })