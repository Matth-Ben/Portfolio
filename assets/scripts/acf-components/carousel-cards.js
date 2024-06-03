import Swiper from "swiper"

const init = () => {
    document.querySelectorAll( ".carousel--cards" ).forEach( element => {
        const carousel = element.querySelector( ".carousel__items" )
        const previous = element.querySelector( ".carousel__previous" )
        const next = element.querySelector( ".carousel__next" )
        const list_name = element.getAttribute( 'data-post-type' ) ? element.getAttribute( 'data-post-type' ) : 'default'
        const list = data.lists[list_name] ? data.lists[list_name] : data.lists['default']
    
        if ( carousel ) {
            const responsive = {}

            if ( data ) {
                for ( const [size, breakpoint] of Object.entries( data.breakpoints ) ) {
                    responsive[breakpoint] = {}
                    
                    if ( list ) {
                        responsive[breakpoint].slidesPerView = list[size]
                    }
                }
            }

            const swiper = new Swiper( ".carousel__items", {
                grabCursor: true,
                translate: 2000,
                pagination: true,
                breakpoints: { ...responsive }
            } )

            swiper.on('slideChange', function (e) {
                console.log('slide changed', e);
            });
    
            previous.addEventListener( 'click', () => swiper.slidePrev( 300 ) )
            next.addEventListener( 'click', () => swiper.slideNext( 300 ) )
        }
    } )
}

document.addEventListener( 'NewContentLoaded', init )
document.addEventListener( 'ContentLoaded', init )