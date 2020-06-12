$( document ).ready(function() {
    $('#weatherinfo').hide();
});
const weatherform = document.querySelector('form')

weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = weatherform.address.value
    fetch('http://localhost:3000/weather?address='+location).then((response) => {
        const messageholder = document.getElementById('Message')
        const placeinfo     = document.getElementById('placeinfo')
        const tempinfo      = document.getElementById('tempinfo')
        const mininfo       = document.getElementById('mininfo')
        const maxinfo       = document.getElementById('maxinfo')
        const description   = document.getElementById('description')
        response.json().then((data) => {
            if(data.error)
            {
                $('#weatherinfo').show();
                $('#detailstable').hide();
                messageholder.textContent =data.error;
            }
            else
            {
                $('#weatherinfo').show();
                placeinfo.textContent =data.location;
                tempinfo.textContent =data.temp;
                mininfo.textContent =data.mintemp;
                maxinfo.textContent =data.maxtemp;
                description.textContent =data.description;
            }
        })
    })
})