export class Marquee
{
	index = 0

	speed

	firstElement

	interval

	constructor( element, speed = 0.2 )
	{
		const wrapper = element.querySelector( '.marquee__wrapper' )
		const clone = element.innerHTML
		
		this.firstElement = element.children[0]
		this.speed = speed
		
		let i = 1

		while ( element.children[0].clientWidth * i < 3000 ) {
			element.insertAdjacentHTML( 'beforeend', clone )
			i++
		}

		this.run()
	}

	run = () => {
		this.interval = setInterval( () => {
			this.firstElement.style.marginLeft = `-${this.index}px`

			if ( this.index > this.firstElement.clientWidth ) {
				this.index = 0;
			}

			this.index = this.index + this.speed;
		}, 0 )
	}
}

export default Marquee
