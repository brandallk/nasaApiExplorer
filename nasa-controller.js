function NasaController() {

    var nasaService = new NasaService()

    const $appDiv = $('#app')
    
    var roverFormTmp = `
        <div class="bg-light"><div class="container p-3">
        <h3 class="h5 text-center">Get Mars Rover Photos</h2>
        <form action="#" class="rover-form">
            <div class="form-group">
                <label class="pl-3 font-weight-bold" for="mars-sol">Sol: </label>
                <input type="number" class="form-control" id="mars-sol" name="sol" value="1000">
            </div>
            <div class="form-group">
                <label class="pl-3 font-weight-bold" for="mars-rover">Rover: </label>
                <select name="rover" class="form-control" id="mars-rover">
                    <option value="opportunity">opportunity</option>
                    <option value="curiosity">curiosity</option>
                    <option value="spirit">spirit</option>
                </select>
            </div>
            <div class="form-group">
                <label class="pl-3 font-weight-bold" for="mars-rover-cam">Camera: </label>
                <select name="rover-cam" class="form-control" id="mars-rover-cam">
                    <option value="pancam">Panorama</option>
                    <option value="fhaz">Front Hazard</option>
                    <option value="rhaz">Rear Hazard</option>
                    <option id="pancam" value="navcam">Navigation</option>
                </select>
            </div>
            <button type="submit" class="submit btn btn-info btn-block mt-2">Submit</button>
        </form>
        </div></div>
        <div class="rover-photos"></div>
        `
    
    function drawRoverForm() {
        $appDiv.append(roverFormTmp)
    }
    
    function listenToRoverForm() {
        var $submitBtn = $('button.submit')
    
        $submitBtn.on('click', (evt) => {
            evt.preventDefault()

            var $solInput = $('#mars-sol')
            var $roverInput = $('#mars-rover')
            var $camInput = $('#mars-rover-cam')
            var sol = $solInput.get(0).value
            var rover = $roverInput.get(0).value
            var camera = $camInput.get(0).value

            nasaService.getMarsRoverPhotos(sol, rover, camera, drawMarsPhotos)
        })
    }

    // Curiosity rover has no panoramic camera: Remove it from the selection list for Curiosity
    function listenForRoverSelection() {
        var $roverInput = $('#mars-rover')

        $roverInput.on('change', (evt) => {
            var rover = $roverInput.get(0).value
            var $pancamOption = $('#pancam')
            if (rover === "curiosity") {
                $pancamOption.addClass("d-none")
            } else {
                $pancamOption.removeClass("d-none")
            }
        })
    }
    
    function drawMarsPhotos(sol, rover, photosData) {
        var $photosDiv = $('.rover-photos')
        $photosDiv.html("")
        capRover = rover.replace(rover[0], rover[0].toUpperCase())
    
        var tmp = `<div class="container my-3"><h2 class="h4 text-center">Rover "${capRover}" Photos for Sol ${sol}:</h2><div class="row justify-content-center">`
        var firstFour = photosData.slice(0, 4)
        firstFour.forEach( photo => {
            tmp += `<div class="col-6 col-md-3 border text-center p-3"><img class="curiosity-photo" src="${photo.img_src}"></div>`
        })
        tmp += `</div></div>`
        $photosDiv.html(tmp)
    }
    
    drawRoverForm()
    listenToRoverForm()
    listenForRoverSelection()
    nasaService.getMarsRoverPhotos("1000", "opportunity", "pancam", drawMarsPhotos)
}