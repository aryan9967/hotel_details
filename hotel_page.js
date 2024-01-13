const urlparams = new URLSearchParams(window.location.search);
var hotel_id = urlparams.get("hotel_id")
const check_out = urlparams.get("check_out")
const check_in = urlparams.get("check_in")

// hotel_id = 1081339901;

console.log(hotel_id);
console.log(check_in);
console.log(check_out);

var hotelname;
var hotel_price;
var hotel_facilities = "";
var facilities_card = "";
var hotel_card_right = "";
hotel_card_left = "";
var list_number = 1;

function book() {
    const page_url = "http://127.0.0.1:5501/booking_form.html?hotel_id=" + hotel_id + "&hotel_name=" + hotelname + "&check_in=" + check_in + "&check_out=" + check_out + "&price=" + hotel_price;
    window.open(page_url, "_blank");
}

async function gethotel_data() {
    const url = 'https://booking-com.p.rapidapi.com/v2/hotels/details?hotel_id=' + hotel_id + '&currency=INR&locale=en-gb&checkout_date=' + check_out + '&checkin_date=' + check_in;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '036b0dc2b0msh42885df59e3539fp1866a4jsn074fd98b1897',
            'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const hotel_data = await response.json();

        console.log(hotel_data);
        hotel_facilities = hotel_data.facilities_block.facilities;
        console.log(hotel_facilities);

        const url2 = 'https://booking-com.p.rapidapi.com/v1/hotels/data?hotel_id=' + hotel_id + '&locale=en-gb';
        const options2 = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '036b0dc2b0msh42885df59e3539fp1866a4jsn074fd98b1897',
                'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
            }
        };

        try {
            var response2 = await fetch(url2, options2);
            var rating_data = await response2.json();
            console.log(rating_data);
        } catch (error) {
            console.log(error);
        }

        const url3 = 'https://booking-com.p.rapidapi.com/v1/hotels/photos?hotel_id='+ hotel_id +'&locale=en-gb';
        const options3 = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '036b0dc2b0msh42885df59e3539fp1866a4jsn074fd98b1897',
                'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
            }
        };

        try {
            var response3 = await fetch(url3, options3);
            var photos = await response3.json();
            console.log(photos);
        } catch (error) {
            console.error(error);
        }

        hotelname = hotel_data.hotel_name;
        hotel_price = hotel_data.composite_price_breakdown.all_inclusive_amount.value.toFixed(2);

        hotel_card_left = `<div class="main_image" style="background:url(${photos[0].url_max}) center no-repeat; background-size:cover;"></div>
    <div class="other_images">
        <div class="small_image" style="background:url(${photos[1].url_max}) center no-repeat; background-size:cover;"></div>
        <div class="small_image" style="background:url(${photos[2].url_max}) center no-repeat; background-size:cover;"></div>
        <div class="small_image" style="background:url(${photos[3].url_max}) center no-repeat; background-size:cover;"></div>
    </div>`

        hotel_card_right = `<div class="hotel_name">${hotel_data.hotel_name}</div>
    <div class="address">
        <div class="city_name"><span class="material-symbols-outlined">location_on </span>${hotel_data.city.toUpperCase()}</div> 
        <div class="address_local">${hotel_data.address}</div> 
    </div>
    <div class="review_score">${rating_data.review_score}</div>
    <div class="review_word">${rating_data.review_score_word}</div>
    <div class="price">
        <div class="all_inclusive"><span class="material-symbols-outlined">currency_rupee</span>${hotel_data.composite_price_breakdown.all_inclusive_amount.value.toFixed(2)}</div>
        <div class="taxes">+ ${hotel_data.composite_price_breakdown.charges_details.amount.value.toFixed(2)} (taxes included)</div>
    </div>
    <button class="book_btn" onclick="book()">BOOK NOW</button>
    <div class="highlights">
        <div class="highlight_heading">
            <span class="material-symbols-outlined">
                star
                </span>
                Highlights
        </div>
        <div class="highlights_det" id="highlights_det">

        </div>
    </div>`

        document.getElementById("left").innerHTML = hotel_card_left;
        document.getElementById("right").innerHTML = hotel_card_right;

        function highlight_card(hotel_facilities) {
            facilities_card += `<div class="high_det">${list_number}.  ${hotel_facilities.name}</div>`
            list_number++;
        }

        hotel_facilities.forEach(highlight_card);
        console.log(facilities_card);
        document.getElementById("highlights_det").innerHTML = facilities_card;
    } catch (error) {
        console.log(error);
    }
}

gethotel_data();
