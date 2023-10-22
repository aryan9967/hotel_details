var city_id;
var room="", adult="";

function get_room(){
    room=document.getElementById("room").value;
    adult=document.getElementById("person").value;
    console.log(room, adult);
    document.getElementById("room_guest_display").value= room + "R "+ adult+"A ";
}
async function get_city_id() {
    city_name = document.getElementById("city").value;
    check_in=document.getElementById("check_in").value;
    check_out=document.getElementById("check_out").value;
    console.log(city_name);
    url = 'https://booking-com.p.rapidapi.com/v1/hotels/locations?name=' + city_name + '&locale=en-gb';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '79f023b2a2msh72a3d5fb52f76ddp17b259jsna51c91ac8956',
            'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
        }
    };
    try{
        const response1 = await fetch(url, options);
    result = await response1.json();
    console.log(result);
    console.log(result[1]);
    console.log(result[0].dest_id);
    city_id = result[0].dest_id;
    }
    catch(error){
        console.log(error);
    }

    url1 = 'https://booking-com.p.rapidapi.com/v2/hotels/search?order_by=popularity&adults_number='+adult+'&checkin_date='+check_in+'&filter_by_currency=AED&dest_id='+city_id+'&locale=en-gb&checkout_date='+check_out+'&units=metric&room_number='+room+'&dest_type=city&include_adjacency=true&children_number=2&page_number=0&children_ages=5%2C0&categories_filter_ids=class%3A%3A2%2Cclass%3A%3A4%2Cfree_cancellation%3A%3A1';
    const options1 = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '79f023b2a2msh72a3d5fb52f76ddp17b259jsna51c91ac8956',
            'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
        }
    };

    try{
        const response2 = await fetch(url1, options1);
        result2 = await response2.json();
        console.log(result2);
        main_result=result2.results;
        console.log(main_result);
        for(i=0; i<main_result.length; i++)
        {
            console.log(main_result[i].name);
        }
        var main_screen="";
        function create_card(arr)
        {
            card="<div class='hotel_card'>";
            card+=`<div>${arr.name}</div>`;  
            card+=`<div class="himg" style="background-image:url('${arr.photoMainUrl}')"></div>`;
            card+=`<div>${arr.priceBreakdown.grossPrice.value}</div>`;
            card+=`<div>${arr.reviewScore}</div>`;
            card+=`<button onclick="">Book Now</button></div>`;  
            console.log(card);
            main_screen+=card;
        }
        main_result.forEach(create_card);
        console.log(main_screen);
        document.getElementById("main_screen").innerHTML=main_screen;
    }
     catch(error)
     {
        console.log(error);
     }   
}