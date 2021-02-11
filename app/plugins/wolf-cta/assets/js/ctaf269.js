/*!
 * Plugin methods
 *
 * Wolf CTA 1.0.1
 */
/* jshint -W062 */

/* global WolfCTAParams */
var WolfCTA = function( $ ) {

	'use strict';

	return {
		initFlag : false,
		isWVC : 'undefined' !== typeof WVC,
		isMobile : ( navigator.userAgent.match( /(iPad)|(iPhone)|(iPod)|(Android)|(PlayBook)|(BB10)|(BlackBerry)|(Opera Mini)|(IEMobile)|(webOS)|(MeeGo)/i ) ) ? true : false,
		debounceTimer : null,
		debounceTime : 200,
		allowScrollEvent : true,
		scrollTop : 0,

		/**
		 * Init all functions
		 */
		init : function () {

			if ( this.initFlag ) {
				return;
			}

			this.isMobile = WolfCTAParams.isMobile;

			var _this = this,
				winWidth = $( window ).width(),
				winHeight = $( window ).height();

			if ( this.isMobile || 1200 > winWidth || 700 > winHeight || $( 'body' ).hasClass( 'mobile' ) ) {
				return;
            }
            
            $.post(
				WolfCTAParams.ajaxUrl,
				{
					action: 'wolfcta_ajax_get_markup',
				},
				function (response) {

					if ('' !== response) {
                        
                          $( 'body' ).append( response );

					} else {
						console.log('error');
					}
				}
			).done( function() {
                _this.build();
                _this.initFlag = true;
            } );
		},

		build : function () {
			
			$( 'body' ).addClass( 'wcta wcta-btn-min' );

			if ( 'Landing' === WolfCTAParams.postTitle ) {
				$( 'body' ).removeClass( 'wcta-btn-min' );
			}

			this.actions();
			this.hideButtonClock();

			if ( ! $( 'body' ).hasClass( 'wcta-btn-min' ) ) {
				$( window ).scroll( function() {

					var scrollTop = $( window ).scrollTop();
					
					if ( scrollTop  >= 600 ) {
						$( 'body' ).addClass( 'wcta-btn-min' );
					}
				} );
			}
		},

		actions : function() {

			var $body = $( 'body' );

			$( document ).on( 'click', '.wcta-cta-toggle', function( event ) {
				event.preventDefault();
				event.stopPropagation();
				
				if ( ! $body.hasClass( 'wcta-toggle' ) ) {
					$body.addClass( 'wcta-toggle' );
				} else {
					$body.removeClass( 'wcta-toggle' );
					$body.addClass( 'wcta-btn-min' );
				}
			} );

			$( document ).on( 'hover', '.wcta-button', function() {
				if ( $body.hasClass( 'wcta-btn-min' ) ) {
					$body.removeClass( 'wcta-btn-min' )
				}
			} );
		},

		hideButtonClock : function() {
			setTimeout( function() {
				if ( ! $( 'body' ).hasClass( 'wcta-btn-min' ) ) {
					$( 'body' ).addClass( 'wcta-btn-min' );
				}
			}, 3000 );
		}
	};

}( jQuery );

( function( $ ) {

	'use strict';

	$( window ).load( function() {
		WolfCTA.init();
	} );

} )( jQuery );