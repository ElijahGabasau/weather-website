const fetchData = async (location) =>{
  document.querySelector('#one').innerHTML = 'Loading';
  document.querySelector('#two').innerHTML = '';


  const response = await fetch('http://localhost:3000/weather?address=' + location);
  const responseJSON = await response.json();

  if(responseJSON.error){
    document.querySelector('#one').innerHTML = responseJSON.error;
    return;
  }

  document.querySelector('#one').innerHTML = `Forecast for ${responseJSON.place_name} is:`;
  document.querySelector('#two').innerHTML = responseJSON.forecast;
}

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const location = search.value;

  fetchData(location);
})