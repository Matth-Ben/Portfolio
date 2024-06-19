import gsap from 'gsap'

const init = () => {
    document.querySelectorAll( ".carousel-container" ).forEach( element => {
        let items = Array.from(element.querySelectorAll('.carousel-projects__item'));
        const carousel = element.querySelector('.carousel-projects');
        const minItems = 9;

        function ensureMinimumItems(minItems) {
            while (items.length < minItems) {
                items.forEach(item => {
                    const clone = item.cloneNode(true);
                    carousel.appendChild(clone);
                    items.push(clone);
                });
            }
        }
        ensureMinimumItems(minItems);

        function updateCurrentItem() {
            console.log('updateCurrentItem');
            const center = (window.innerWidth / 2);
            let currentItem = null;
        
            items.forEach(item => {
                const bounds = item.getBoundingClientRect();
                if (bounds.left <= center && bounds.right >= center) {
                    item.classList.add('current');
                    currentItem = item;
                } else {
                    item.classList.remove('current');
                }
            });
        
            if (currentItem) {
                const currentItemBounds = currentItem.getBoundingClientRect();
                const offset = center - (currentItemBounds.left + currentItemBounds.width / 2);
                gsap.to(carousel, { x: `+=${offset}`, duration: 0.5 });
            }
        }

        function scrollCarousel(event) {
            const itemWidth = items[0].offsetWidth;
            const scrollAmount = event.deltaY;
        
            gsap.to(carousel, {
                x: `-=${scrollAmount}`,
                modifiers: {
                    x: function(x) {
                        return parseFloat(x) % itemWidth;
                    }
                },
                ease: "none"
            });
        
            updateCurrentItem();
        }

        window.addEventListener('resize', updateCurrentItem);
        // document.addEventListener('scroll', updateCurrentItem);
        carousel.addEventListener('wheel', scrollCarousel);

        scrollCarousel();
        updateCurrentItem();
    } )
}

document.addEventListener( 'NewContentLoaded', init )
document.addEventListener( 'ContentLoaded', init )