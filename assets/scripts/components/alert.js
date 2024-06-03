import Marquee from '../class/class-marquee'

export default ( () => {
    const animation_duration = 1800

    document.addEventListener( 'ContentLoaded', () => {
        document.querySelectorAll( '.component--alert' ).forEach( element => {
            const marquee = element.querySelector( '.marquee' )
    
            if ( marquee ) {
                new Marquee( marquee )
            }

            setTimeout( () => {
                document.body.classList.add( 'show-alert' )
                
                element.querySelector( 'button' ).addEventListener( 'click', () => {
                    document.body.classList.remove( 'show-alert' )
                } )
            }, animation_duration )
        } )
    } )
} )()
