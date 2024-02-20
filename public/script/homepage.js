const endpointsContainer = document.getElementsByClassName('endpoints').item(0)
fetch('api/allEndpoints').then(async response => {
    const { endpoints } = await response.json()
    function loadEndpoints(endpoint) {
        endpointsContainer.innerHTML += `<div class='endpointCard' onclick='window.open("api/${endpoint}")'>${endpoint}<button>Visit endpoint</button></div>`
    }
    endpoints.forEach(loadEndpoints)
})