import './core'

// components
import './components/alert'
import './components/welcome'
import './components/pannel'

// acf components


////
document.addEventListener( 'DOMContentLoaded', () => {
    const quick_links = document.getElementById( 'quick-links' )

    quick_links.querySelectorAll( 'a' ).forEach( element => {
        element.addEventListener( 'focusout', () => {
            document.body.classList.remove( 'show-quick-links' )
        } )
        element.addEventListener( 'focus', () => {
            document.body.classList.add( 'show-quick-links' )
        } )
    } )
} )
////

////
// document.addEventListener( 'click', event => {
//     let button_burger = null
    
//     if ( event.target.classList.contains( 'button-burger' ) ) {
//         button_burger = event.target
//     }
//     else if ( event.target.closest( '.button-burger' ) ) {
//         button_burger = event.target.closest( '.button-burger' )
//     }

//     if ( button_burger ) {
//         button_burger.classList.toggle( 'active' )
//     }
// } )
////

document.addEventListener( 'DOMContentLoaded', () => {
    if ( data ) {
        data.current_size = () => {
            let current_size

            for ( const [size, breakpoint] of Object.entries( data.breakpoints ) ) {
                if ( window.innerWidth > breakpoint ) {
                    current_size = size
                }
            }

            return current_size
        }

        data.current_rem = () => {
            let value = Math.round(window.innerWidth * 10 / data.breakpoints[data.current_size()])

            return value % 2 === 0 ? value : value + 1
        }

        const set_current_rem = () => {
            let scale_size = null

            for ( const [size, value] of Object.entries( data.rem ) ) {
                if ( value === 'scale' ) {
                    scale_size = size
                }
            }

            if ( window.innerWidth > data.breakpoints[scale_size] ) {
                document.querySelector( 'html' ).style.fontSize = data.current_rem() + 'px'
            } else {
                document.querySelector( 'html' ).style.fontSize = ''
            }
        }

        set_current_rem()
        document.addEventListener( 'windowResized', set_current_rem )
    }
} )