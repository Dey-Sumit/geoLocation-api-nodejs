if ("geolocation" in navigator) {
  //console.log(' geolocation is available ');
  navigator.geolocation.getCurrentPosition(async position => {
    const long = position.coords.longitude;
    const lat = position.coords.latitude;
    document.getElementById('long').textContent = long;
    document.getElementById('lat').textContent = lat;

    //post the data to the server through fetch api
    //->get the data ,prepare the data, package it as a post and send to the end point
    const data = {
      long,
      lat
    }
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }

    //alternate of 'fetch-then';fetch api can be handled by asynce function
    const response = await fetch('/home', options); //post(in options(method)) to /home
    const jsonData = await response.json(); //response comes as a data stream ;so handle with proper format(txt/json)
    console.log(jsonData);
  });

} else {
  console.log('geolocation IS NOT available');
}