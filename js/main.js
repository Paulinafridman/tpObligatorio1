console.log(document.querySelector('title').textContent)

function ajax(url, metodo='get') {
    let xhr = new XMLHttpRequest
    xhr.open(metodo,url)
    xhr.send()

    return xhr
}

function cargarNavbar(cb) {
    const header = document.querySelector('header')
    let xhr = ajax('plantillas/navbar.html')
    xhr.addEventListener('load', () => {
        if(xhr.status == 200) {
            header.innerHTML = xhr.response
            if(cb) cb()
        }
    })
}

function getArchivo(id) {
    return 'plantillas/' + (id?id:'home') + '.html'
}

cargarNavbar(getPlantillasSinHistory)

function getPlantillasSinHistory(){
    const links = document.querySelectorAll('a')
    const main = document.querySelector('main')

    /* ---------------------- */
    /* Carga de vista inicial */
    /* ---------------------- */
    let archivo = getArchivo('home')
    //marcarLink(archivo)
    let xhr = ajax(archivo)
    xhr.addEventListener('load', () => {
        if(xhr.status == 200) {
            main.innerHTML = xhr.response
        }
    })

     /* ---------------------- */
    /* Carga de vista elegida */
    /* ---------------------- */
    //console.log(links)
    links.forEach( link => {
        link.addEventListener('click', e => {
            e.preventDefault()

            let id = link.id
            //console.log(id)

            let archivo = getArchivo(id)
            //marcarLink(archivo)
            //console.log(archivo)

            let xhr = ajax(archivo)
            xhr.addEventListener('load', () => {
                if(xhr.status == 200) {
                    main.innerHTML = xhr.response
                }
            })

        })
    })

}
