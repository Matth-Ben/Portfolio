const uniqid = ( prefix = "", random = false ) => {
	const sec = Date.now() * 1000 + Math.random() * 1000
	const id = sec.toString(16).replace(/\./g, "").padEnd(14, "0")
	return `${prefix}${id}${random ? `.${Math.trunc(Math.random() * 100000000)}`:""}`
}

/**
 * Included when FIELD_NAME fields are rendered for editing by publishers.
 */
( function( $ ) {

	function initialize_field( $field ) {
		const textarea = $field[0].querySelector( 'textarea' )
		const id = uniqid()
		const settings = JSON.parse( textarea.getAttribute( 'data-settings' ) )

		if ( settings ) {
			console.log(settings)
			textarea.setAttribute( 'id', id )
			wp.editor.initialize( id, settings )
		}

		/**
		 * $field is a jQuery object wrapping field elements in the editor.
		 */
		// console.log( 'FIELD_NAME field initialized', $field );
	}

	if( typeof acf.add_action !== 'undefined' ) {
		/**
		 * Run initialize_field when existing fields of this type load,
		 * or when new fields are appended via repeaters or similar.
		 */
		acf.add_action( 'ready_field/type=advanced_wysiwyg', initialize_field );
		acf.add_action( 'append_field/type=advanced_wysiwyg', initialize_field );
	}
} )( jQuery );
