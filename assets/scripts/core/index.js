import data from '../../../data.json'
import smoothScroll from './smooth-scroll'
import taxi from './taxi'
import headroom from './headroom'
import timelineAnimation from './timeline-animation'
import splitText from './split-text'
import parallax from './parallax'
import gridHelper from './grid-helper'
import scrollbarWidth from './scrollbar-width'
import responsiveImages from './responsive-images'
import windowResizeEvent from './window-resize-event'
import refreshBodyClasslist from './refresh-body-classlist'

export default ( () => {
    window.data = data

    document.addEventListener( 'ContentLoaded', () => {
        windowResizeEvent()
        taxi()
        headroom()
        splitText()
        timelineAnimation()
        smoothScroll()
        parallax()
        gridHelper()
        scrollbarWidth()
        responsiveImages()
    } )
    
    document.addEventListener( 'NewContentLoaded', () => {
        refreshBodyClasslist()
        splitText()
        timelineAnimation()
        parallax()
        scrollbarWidth()
        responsiveImages()
    } )
    
    document.addEventListener( 'windowResized', () => {
        responsiveImages()
    } )

    document.addEventListener( 'DOMContentLoaded', () => {

        if ( document.body.classList.contains( 'welcome' ) ) {
            return
        }

        document.dispatchEvent( new CustomEvent( 'ContentLoaded' ) )
    } )
} )()