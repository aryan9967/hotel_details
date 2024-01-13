var city_id;
var city_name = "";
var check_in = "", check_out = "";
var room = "", adult = "";
var price_sort = false;
var rating_sort = false;
var hotel_id="";

function get_room() {
    room = document.getElementById("room").value;
    adult = document.getElementById("person").value;
    document.getElementById("room_guest_display").value = room + "R " + adult + "A ";
}
function sort() {
    price_sort = document.getElementById("price_sort").checked;
    rating_sort = document.getElementById("rating_sort").checked;
    if (price_sort == true) {
        console.log(price_sort);
        get_city_id();
    }
    if (rating_sort == true) {
        console.log(rating_sort);
        get_city_id();
    }
    if (price_sort == false && rating_sort == false) {
        get_city_id();
    }
}
// function get_hotel_id(element){
//     var hotel=element.parentNode;
//     var act_hotel=hotel.parentNode;
//     hotel_id=act_hotel.id;
//     alert(hotel_id);
// }
function get_hotel_id_by_div(element){
    hotel_id=element.id;
    alert(hotel_id);
    url="http://127.0.0.1:5501/hotel_page.html?hotel_id="+hotel_id+"&check_in="+check_in+"&check_out="+check_out;
    window.open(url, "_blank");
}
async function get_city_id() {

    city_name = document.getElementById("city").value;
    check_in = document.getElementById("check_in").value;
    check_out = document.getElementById("check_out").value;
    if (city_name == "" || check_in == "" || check_out == "" || room == "" || adult == "") {
        alert("All fields are required");
    }
    else {
        var current_date = new Date();
        console.log(current_date);
        current_date_milli = Date.parse(current_date);
        check_in_mili = Date.parse(check_in);
        check_out_mili = Date.parse(check_out);
        days_stayed = (check_out_mili - check_in_mili) / (24 * 60 * 60 * 1000);
        if (check_in_mili < current_date_milli || check_in_mili > check_out_mili || check_out_mili<current_date_milli) {
            alert("Enter valid date");
        }
        else {
            // console.log(days_stayed);
            // console.log(check_in_mili);
            // console.log(city_name);
            url = 'https://booking-com.p.rapidapi.com/v1/hotels/locations?name=' + city_name + '&locale=en-gb';
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '036b0dc2b0msh42885df59e3539fp1866a4jsn074fd98b1897',
                    'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
                }
            };
            try {
                const response1 = await fetch(url, options);
                result = await response1.json();
                // console.log(result);
                // console.log(result[1]);
                // console.log(result[0].dest_id);
                city_id = result[0].dest_id;
            }
            catch (error) {
                console.log(error);
            }

            url1 = 'https://booking-com.p.rapidapi.com/v2/hotels/search?order_by=popularity&adults_number=' + adult + '&checkin_date=' + check_in + '&filter_by_currency=INR&dest_id=' + city_id + '&locale=en-gb&checkout_date=' + check_out + '&units=metric&room_number=' + room + '&dest_type=city&include_adjacency=true&children_number=2&page_number=0&children_ages=5%2C0&categories_filter_ids=class%3A%3A2%2Cclass%3A%3A4%2Cfree_cancellation%3A%3A1';
            const options1 = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '036b0dc2b0msh42885df59e3539fp1866a4jsn074fd98b1897',
                    'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
                }
            };

            try {
                const response2 = await fetch(url1, options1);
                result2 = await response2.json();
                console.log(result2);
                main_result = result2.results;
                console.log(main_result);
                for (i = 0; i < main_result.length; i++) {
                    console.log(main_result[i].name);
                }
                var main_screen = "";
                function create_card(arr) {  
                    card = `<div class="hotel_card" id="${arr.id}" onclick="get_hotel_id_by_div(this)">
            <div class="left"  style="background-image:url('${arr.photoMainUrl}')">
            </div>
            <div class="right">
                <div class="htnname_loc"><div class="hotel_name">${arr.name}</div><div class="location font"><span class="material-symbols-outlined">
                    location_on
                    </span>${arr.wishlistName}</div></div>
                <div class="rating_container"><div class="rating">${arr.reviewScore}</div><div class="review_count">(${arr.reviewCount} reviews)</div></div>
                <div class="review_Word">${arr.reviewScoreWord}</div>
                <div class="cost_room">
                    <div class="cost"><span class="material-symbols-outlined">
                        currency_rupee
                        </span>${arr.priceBreakdown.grossPrice.value.toFixed(2)}
                    </div>
                    <div class="font room_day">(${days_stayed} days & ${room} rooms)</div>
                </div>
                <button class="book_btn" >BOOK NOW</button>
            </div>
        </div>`;
                    // console.log(card);
                    // console.log(check_out-check_in);
                    main_screen += card;
                }
                main_result.forEach(create_card);
                if (price_sort == true) {
                    main_result.sort(function (a, b) { return a.priceBreakdown.grossPrice.value - b.priceBreakdown.grossPrice.value });
                    console.log(main_result);
                    for (i = 0; i < main_result.length; i++) {
                        console.log(main_result[i].name);
                    }
                    main_screen = "";
                    main_result.forEach(create_card);
                }
                if (rating_sort == true) {
                    main_result.sort(function (a, b) { return a.reviewScore - b.reviewScore });
                    main_result.reverse();
                    console.log(main_result);
                    for (i = 0; i < main_result.length; i++) {
                        console.log(main_result[i].name);
                    }
                    main_screen = "";
                    main_result.forEach(create_card);
                }
                // console.log(main_screen);
                document.getElementById("main_screen").innerHTML = main_screen;
                

            }
            catch (error) {
                console.log(error);
            }
        }

    }

}