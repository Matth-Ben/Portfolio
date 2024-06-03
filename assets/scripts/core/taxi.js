import { Core, Transition } from '@unseenco/taxi'

const animation_duration = 300

class CustomTransition extends Transition {
    /**
     * Handle the transition leaving the previous page.
     * @param { { from: HTMLElement, trigger: string|HTMLElement|false, done: function } } props
     */
    onLeave({ from, trigger, done }) {
        document.body.classList.add( 'page-switching' )
        // setTimeout( () => {
        //     lenis.scrollTo( 0, { immediate: true } )
        // }, animation_duration )
        setTimeout( () => {
            lenis.scrollTo( 0, { immediate: true } )
        }, animation_duration )
        setTimeout( done, animation_duration )
    }
    
    /**
     * Handle the transition entering the next page.
     * @param { { to: HTMLElement, trigger: string|HTMLElement|false, done: function } } props
    */
    onEnter({ to, trigger, done }) {
        setTimeout( () => {
            const i = setInterval( () => {
                if ( document.getElementById( 'app-content' ) ) {
                    clearInterval( i )
                    document.body.classList.remove( 'page-switching' )
                    document.dispatchEvent( new CustomEvent( 'NewContentLoaded' ) )
                    done()
                }
            } )
        }, animation_duration )
    }
}

export default () => {
    const options = {
        links: 'a:not([target]):not([href^=\\#]):not([data-prevent-taxi]):not([download])',
        transitions: {
            default: CustomTransition
        }
    }

    const taxi = new Core( options )
}