export default ( () => {
    document.addEventListener( 'ContentLoaded', () => {
        const pannel = document.querySelector( '.component--pannel' )
        const animation_duration = data?.animations?.default?.duration ? data.animations.default.duration : 300
        
        if ( pannel ) {
            const pannel_wrapper = pannel.querySelector( '.component__wrapper' )
            let current_element,
                is_changing = false
    
            document.addEventListener( 'click', event => {
                let element = event.target,
                    content
        
                if ( element.getAttribute( 'data-pannel-content' ) ) {
                    content = element.getAttribute( 'data-pannel-content' )
                }
                else if ( element.closest( '[data-pannel-content]' ) ) {
                    element = element.closest( '[data-pannel-content]' )
                    content = element.getAttribute( 'data-pannel-content' )
                }
    
                if ( content ) {
                    if ( element !== current_element ) {
                        if ( current_element ) {
                            current_element.classList.remove( 'show-pannel' )
                        }

                        if ( is_changing === false ) {
                            let delay = 0
                            
                            if ( pannel.classList.contains( 'active' ) ) {
                                pannel.classList.add( 'is-changing' )
                                is_changing = true
                                delay = animation_duration / 2
                            }

                            current_element = element
                            current_element.classList.add( 'show-pannel' )
                            pannel.classList.add( 'active' )

                            setTimeout( () => {
                                pannel_wrapper.innerHTML = content
                                document.body.classList.add( 'show-pannel' )
                                pannel.classList.remove( 'is-changing' )
                                is_changing = false
                            }, delay )
                        }
                    }
                    else {
                        pannel.classList.remove( 'active' )
                        document.body.classList.remove( 'show-pannel' )
                        current_element.classList.remove( 'show-pannel' )
                        current_element = null
                    }
                }
            } )
        }
    } )
} )()
