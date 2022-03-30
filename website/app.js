/* Global Variables */
const generateBtn  = document.getElementById('generate');

//URL and API Key
const api_Url = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const api_Key = '&appid=445c27ec773ab48010ecb6b75afb8e71&units=Imperial';


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


//event listener for dom element with click and callback back function.
generateBtn.addEventListener('click', performAPICall);

function performAPICall(e){
    e.preventDefault();

    const zipCode = document.getElementById('zip').value;
 
    //This function is used to GET Web API data
    const weatherAPICall = async (api_Url, zipCode, api_Key) =>{
        const res = await fetch(api_Url + zipCode + api_Key);
        try{
            const userData = await res.json();
            return userData;
        } catch(error){
            console.log("ERROR01: weatherAPICall did not work", error);
        }
    }
    weatherAPICall(api_Url, zipCode, api_Key).then(function(userData){
            //add data to POST
            console.log(userData);
            postData('/add', { date: newDate, icon: userData.weather[0].icon, temp: userData.main.temp, min: userData.main.temp_min, max: userData.main.temp_max, name:userData.name})
        }).then(function(newData){
            //call updateUI function
            updateUI();
        })

}

const postData = async (url = '', data  ={}) =>{
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers:{
            "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify({
          date: data.date,
          temp: data.temp,
        //   content: data.content,
          name: data.name,
          min: data.min,
          icon: data.icon,
          max: data.max
        })
    })
    try{
        const newData = await response.json();
        console.log(newData);
        return newData;
    }catch (error){
        console.log("ERROR02: postData function failed to stringify data", error);
    }
};

const updateUI = async () => {
    const request = await fetch('/all');
    try{
        const allData = await request.json()
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = `CURRENT TEMP: ${allData.temp} degF`;
        // document.getElementById('content').innerHTML = "I recorded how I was feeling: "+ allData.content;
        document.getElementById('temp_min').innerHTML = `MIN. TEMP: ${allData.min} degF`;
        document.getElementById('temp_max').innerHTML = `MAX. TEMP: ${allData.max} degF`;
        document.getElementById('city').innerHTML = `City: ${allData.name}`;
        document.getElementById('icon').innerHTML = `<img src="http://openweathermap.org/img/wn/${allData.icon}@2x.png">`;
    }
    catch(error){
        console.log("ERROR03: Issue found in updateUI funciton", error);
    }
}
