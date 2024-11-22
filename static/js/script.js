function chgimg(name, txt) {
    var theimage = document.getElementById("image");
    theimage.src = name;
    theimage.alt = txt;
}


function checkPassword() {
    const passwordInputElement = document.getElementById("passwordInput");
    const pword = passwordInputElement.value;

    let outputText;
    let bgColor = "pink"
	let pwscore = zxcvbnts.core.zxcvbn(pword).score;
	
	outputText = "To Be Determined," + " Score is: " + pwscore;
		
    if (pword.length === 0) {
        outputText = "Enter a password";
    } else {
		switch (pwscore) {
            case 0:
                outputText = "Too guessable";
                bgColor = "red";
                break;
            case 1:
                outputText = "Very guessable";
                bgColor = "orange";
                break;
            case 2:
                outputText = "Somewhat guessable";
                bgColor = "yellow";
                break;
            case 3:
                outputText = "Safely unguessable";
                bgColor = "lightblue";
                break;
            case 4:
                outputText = "Very unguessable";
                bgColor = "limegreen";
                break;
            default:
                outputText = "To Be Determined";
        }
		
	}
	
    document.getElementById("passwordCheckerResult").textContent = outputText;
    passwordInputElement.style.backgroundColor = bgColor;
}

var marker2;
var infowindow2;
var userLat;
var userLong;
var map, directionsService, directionsRenderer;
function initMap() {
    var myLatLng = {lat: 44.9727, lng: -93.23540000000003}
    /* Create a map and place it on the div */
    map = new google.maps.Map(document.getElementById('map'), {
            zoom: 14,
            center: myLatLng
        });
    var geocoder = new google.maps.Geocoder(); // Create a geocoder object
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();

    directionsRenderer.setMap(map);
    directionsRenderer.setPanel(document.getElementById('directionsPanel'));

    // Get locations from the table and place markers
    getContactLocation(geocoder, map); 
    addAutoComplete();
    getUserLocation();
    // Enable map click to detect POIs
    map.addListener('click', (event) => {
        handleMapClick(event.latLng);
    });
    
}  // end init map function definiton

function getContactLocation(geocoder, map) {
    let tableRows = document.querySelectorAll("table tr");
    // Loop through each row except the header
    tableRows.forEach((row, index) => {
        // Skip the header row
        if (index === 0) return;
        // Extract the name, location, and info from the cells
        let name = row.cells[0].textContent.trim();
        let location = row.cells[1].textContent.trim();
        let info = row.cells[2].textContent.trim();
        // Call geocodeAddress to place a marker for this contact
        geocodeAddress(geocoder, map, { name, location, info });
    });
}
// This function takes a geocode object, a map object, and an address, and 
// if successful in finding the address, it places a marker with a callback that shows an 
// info window when the marker is "clicked"
function geocodeAddress(geocoder, resultsMap, address) {
    geocoder.geocode({'address': address.location}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
                resultsMap.setCenter(results[0].geometry.location);
                marker2 = new google.maps.Marker({
                            map: resultsMap,
                            position: results[0].geometry.location,
                            title: address.name
                            });
                infowindow2 = new google.maps.InfoWindow({
                            content: `<strong>${address.name}</strong><br>${address.info}<br>${address.location}`
                            });

                google.maps.event.addListener(marker2, 'click', createWindow(resultsMap,infowindow2, marker2));
        } else {
                alert('Geocode was not successful for the following reason: ' + status);
        } //end if-then-else
    }); // end call to geocoder.geocode function
} // end geocodeAddress function

// Function to return an anonymous function that will be called when the rmarker created in the 
// geocodeAddress function is clicked	
function createWindow(rmap, rinfowindow, rmarker){
        return function(){
            rinfowindow.open(rmap, rmarker);
        }
}//end create (info) window

function addAutoComplete() {
    const input = document.getElementById("location");
    const autocomplete = new google.maps.places.Autocomplete(input);
}

//Function to get user's current location
function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
    // userLat = position.coords.latitude;
    // userLng = position.coords.longitude;
    userLat = 44.9778;
    userLng = -93.2650;
    map.setCenter({ lat: userLat, lng: userLng });
    //map.setCenter({ lat: 44.9778, lng: -93.2650 });
}

function showError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        x.innerHTML = "User denied the request for Geolocation."
        break;
      case error.POSITION_UNAVAILABLE:
        x.innerHTML = "Location information is unavailable."
        break;
      case error.TIMEOUT:
        x.innerHTML = "The request to get user location timed out."
        break;
      case error.UNKNOWN_ERROR:
        x.innerHTML = "An unknown error occurred."
        break;
    }
    setDefaultLocation();
  }

  function calculateRoute() {
    // Get the destination input value from the HTML input element with id 'destination'
    const destination = document.getElementById('destination').value;
    
    // Get the selected travel mode from the radio button group named 'travelMode'
    const selectedMode = document.querySelector('input[name="travelMode"]:checked').value;
    
    // Check if the user's latitude and longitude are set
    if (!userLat || !userLng) {
        // If not set, alert the user to allow location access and stop function execution
        alert("User location not set. Please allow location access.");
        return;
    }
    // Show the directions panel by setting its display style to 'block'
    document.getElementById('directionsPanel').style.display = 'block';

    // Define the origin location with the user's latitude and longitude
    const origin = { lat: userLat, lng: userLng };

    // Prepare the route request object with the origin, destination, and selected travel mode
    const request = {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode[selectedMode] // Convert selected mode to Google Maps TravelMode format
    };

    // Send the route request to the Google Maps Directions service
    directionsService.route(request, function(result, status) {
        // Check if the request was successful
        if (status == 'OK') {
            // If successful, render the directions on the map
            directionsRenderer.setDirections(result);
        } else {
            // If the request failed, alert the user with the failure reason
            alert('Directions request failed due to ' + status);
        }
    });
}

// Function to handle a map click event
function handleMapClick(latLng) {
    // Create a new PlacesService object to perform a search
    const service = new google.maps.places.PlacesService(map);

    // Set up the request object with location and search radius
    const request = {
        location: latLng,    // Location of the map click event
        radius: 50,          // Search within a 50-meter radius
    };

    // Perform a nearby search using the request parameters
    service.nearbySearch(request, (results, status) => {
        // Check if the search was successful and a result was found
        if (status === google.maps.places.PlacesServiceStatus.OK && results[0]) {
            // Retrieve the first place found in the search results
            const place = results[0];
            // Call function to get details of the selected place
            getPlaceDetails(place.place_id); 
        } else {
            // Show an alert if no place was found at the clicked location
            alert('No place found at the clicked location.');
        }
    });
}

// Function to retrieve detailed information about a place by its place ID
function getPlaceDetails(placeId) {
    // Create a new PlacesService object to fetch details
    const service = new google.maps.places.PlacesService(map);

    // Fetch details for the specified place ID
    service.getDetails({ placeId: placeId }, (place, status) => {
        // Check if the details request was successful
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            // If successful, autofill the location in the input field
            autofillLocation(place);
        } else {
            // Show an alert if unable to retrieve place details
            alert('Failed to retrieve place details.');
        }
    });
}

// Function to autofill the location input field with the place address
function autofillLocation(place) {
    // Set the value of the input field with ID 'location' to the place's formatted address
    document.getElementById('location').value = place.formatted_address;
}


// //Slideshow Bonus
let slideIndex = 0;
let intervalId = null;

// Function to display the next slide in the slideshow
function showSlides() {
    let i;
    // Get all elements with the class "mySlides" (each slide in the slideshow)
    let slides = document.getElementsByClassName("mySlides");
    
    // Loop through all slides and hide each one initially
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
  
    // Increment the slide index to show the next slide
    slideIndex++;
  
    // If the slide index exceeds the number of slides, reset to the first slide
    if (slideIndex > slides.length) { slideIndex = 1; }
  
    // Display the current slide based on the slide index
    slides[slideIndex - 1].style.display = "block";
  }
  
  // Function to start the slideshow
  function start() {
      // Check if the slideshow is already running; if so, do nothing
      if (intervalId) return;
  
      // Hide the main image (with ID "image") so it doesn't interfere with the slides
      document.getElementById("image").style.display = "none";
  
      // Show the first slide
      showSlides();
  
      // Set an interval to show the next slide every 2 seconds
      intervalId = setInterval(showSlides, 2000); 
  }
  
  // Function to stop the slideshow
  function stop() {
      // Clear the interval to stop automatic slide switching
      clearInterval(intervalId);
      
      // Reset the intervalId to indicate the slideshow is stopped
      intervalId = null;
  
      // Hide all slides to clean up the display
      const slides = document.getElementsByClassName("mySlides");
      for (let i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";
      }
  
      // Display the main image again after stopping the slideshow
      const Goldy = document.getElementById('image');
      Goldy.style.display = "block";
      
      // Set the source and alt text for the main image
      Goldy.src = '/img/gophers-mascot-1.png';
      Goldy.alt = 'Goldy Gopher';
  }