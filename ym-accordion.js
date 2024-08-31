/**
 * A class that adds animation when revealing information inside <details> tags.
 */
class YMAccordion {
	/**
	 * Sets the animation for an element.
	 * 
	 * @param {Element} el            Details tag HTML element.
	 * @param {object}  args          Additional options.
	 * @param {number}  args.duration Animation duration in ms. Default 200.
	 * @param {string}  args.easing   Animation timing function. Default 'ease-in-out'.
	 */
	constructor ( el, args = {} ) {
		args = {
			duration: 200,
			easing:   'ease-in-out',

			...args,
		};

		this.el   = el;
		this.args = args;

		this.summary = el.querySelector( 'summary' );
		this.content = el.querySelector( 'div' );

		this.animation   = null;
		this.isExpanding = false;
		this.isClosing   = false;

		this.summary.addEventListener( 'click', e => this.#onClick( e ) );
	}
  
	#onClick ( e ) {
		e.preventDefault();

		this.el.style.overflow = 'hidden';

		if ( !this.el.open || this.isClosing ) {
			this.#open();
		} else if ( this.el.open || this.isExpanding ) {
			this.#close();
		}
	}

	#open () {
		this.el.style.height = `${this.el.offsetHeight}px`;
		this.el.open         = true;

		window.requestAnimationFrame( () => this.#expand() );
	}
  
	#close () {
		this.isClosing = true;

		const startHeight = `${this.el.offsetHeight}px`;
		const endHeight   = `${this.summary.offsetHeight}px`;

		if ( this.animation ) {
			this.animation.cancel();
		}

		this.animation = this.el.animate({
			height: [ startHeight, endHeight ],
		}, {
			duration: this.args.duration,
			easing: this.args.easing,
		});

		this.animation.onfinish = () => this.#onAnimationFinish( false );
		this.animation.oncancel = () => this.isClosing = false;
	}
  
	#expand () {
		this.isExpanding = true;

		const startHeight = `${this.el.offsetHeight}px`;
		const endHeight   = `${this.summary.offsetHeight + this.content.offsetHeight}px`;

		if ( this.animation ) {
			this.animation.cancel();
		}

		this.animation = this.el.animate({
			height: [ startHeight, endHeight ],
		}, {
			duration: this.args.duration,
			easing: this.args.easing,
		});

		this.animation.onfinish = () => this.#onAnimationFinish( true );
		this.animation.oncancel = () => this.isExpanding = false;
	}
  
	#onAnimationFinish ( isOpen ) {
		this.el.open         = isOpen;
		this.el.style.height = this.el.style.overflow = '';

		this.animation = null;

		this.isClosing   = false;
		this.isExpanding = false;
	}
}