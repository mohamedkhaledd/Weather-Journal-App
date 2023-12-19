/* Global Variables */
const form = document.querySelector('.appform');
const icons = document.querySelectorAll('.entryicon');

// the base Url and the Api key from the openweatherApiMap
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '7adf28efa52f39d5c95621a3db97d04e';

//Get date
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

//create event listener in order to add function to the HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
  e.preventDefault();
  //retrieve the user input
  const newZip = document.getElementById('zip').value;

  getWeather(baseURL, newZip, apiKey)
    .then(function (userData) {
      // add data to POST request
      postData('/add', { date: newDate, temp: userData.main.temp, content })
    }).then(function (newData) {
      //calling the update ui so it updates the browser
      updateUI()
    })
  //reseting the form
  form.reset();
}

//create a function to get the web api data
const getWeather = async (baseURL, newZip, apiKey) => {
  const res = await fetch(baseURL + newZip + apiKey);
  // if everything goes well
  try {
    const userData = await res.json();
    return userData;
    //the user data will be equal the result of the fetch function
  } catch (error) {
    console.log("error", error);
  }
}

//creating a function that posts the data
const postData = async (url = '', data = {}) => {
  const req = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    body: JSON.stringify({
      date: data.date,
      temp: data.temp,
      content: data.content
    })
  })

  try {
    const newData = await req.json();
    return newData;
  }
  catch (error) {
    console.log(error);
  }
};


const updateUI = async () => {
  const request = await fetch('/all');
  try {
    const allData = await request.json()
    // this will show the icons on the web page
    icons.forEach(icon => icon.style.opacity = '0.85');
    //this will update the values
    document.getElementById('date').innerHTML = allData.date;
    document.getElementById('temp').innerHTML = allData.temp;
    document.getElementById('content').innerHTML = allData.content;
  }
  catch (error) {
    console.log("error", error);
  }
};
