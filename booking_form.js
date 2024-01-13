const urlparams = new URLSearchParams(window.location.search);
const hotel_id = urlparams.get("hotel_id");
const hotel_name = urlparams.get("hotel_name");
const check_in = urlparams.get("check_in");
const check_out = urlparams.get("check_out");
const price = urlparams.get("price");


console.log(hotel_id);
console.log(hotel_name);
console.log(check_in);
console.log(check_out);
console.log(price);

document.getElementById("hotel_id").value = hotel_id + " (hotel_id)";
document.getElementById("hotel_name").value = hotel_name + " (name)";
document.getElementById("check_in").value = check_in + " (check in)";
document.getElementById("check_out").value = check_out + " (check out)";
document.getElementById("price").value = price + " (all inclusive price)";

let form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let data = new FormData(form);
  fetch("https://script.google.com/macros/s/AKfycbyBOBbBlaktyQrreUy2dax8Cz2k6-ZZ6X2LQAThUtPtRzbkd48iaNZrXsuA-X8IaCZXEw/exec", {
    method: "POST",
    body: data
  })
  // .then(res=>res.text())
  console.log(data);
  alert("Your booking is confirmed");
  form.reset();
})

async function sendEmail() {
  email = document.getElementById("email").value;
  fname = document.getElementById("firstname").value;
  phone= document.getElementById("phone").value;
  console.log(email);
  try{
    Email.send({
      Host: "smtp.elasticemail.com",
      Username: "aryanmauryaofficial2601@gmail.com",
      Password: "2F3844433A7AE92E8D7E2BA11ABA99FDC3B0",
      To: email,
      From: "aryanmauryaofficial2601@gmail.com",
      Subject: "Booking confirmation",
      Body: "Dear " + fname + " your booking for " + hotel_name + " is confirmed. Check-in:" + check_in + " Check-out:" + check_out,
    })
  }
  catch(error){
    console.log(error);
  }
  
}

// function sendmsg(){
//   const accountSid = 'AC38dee8a7fbcb4412340bea1687f6be62';
//   const authToken = '419e950b6a5e4cf97767c94bf6416d0e';
//   const client = require('twilio')(accountSid, authToken);
  
//   client.messages.create({
//        body: 'This is the ship that made the Kessel Run in fourteen parsecs?'+name,
//        from: '+18312722905',
//        to: '+919967855433'
//      })
//     .then(message => console.log(message.sid));
// }




