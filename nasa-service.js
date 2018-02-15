function NasaService() {

    const API_KEY = "9yFyQDA0vHU5TYyot6MpcThqYWj6iDXDTQA7Fu9Z"
    
    this.getMarsRoverPhotos = function(sol, rover, camera, cb) {
        var baseUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers/"
    
        $.get(`${baseUrl}${rover}/photos?sol=${sol}&camera=${camera}&page=1&api_key=${API_KEY}`)
        .then( data => {
            cb(sol, rover, data.photos)
        })
    }
}

