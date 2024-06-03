import CarouselBasic from "../class/class-carousel-basic"

const init = () => {
    document.querySelectorAll( '.component--carousel-full' ).forEach( element => {
        new CarouselBasic( element )
    } )
}

document.addEventListener( 'NewContentLoaded', init )
document.addEventListener( 'ContentLoaded', init )
