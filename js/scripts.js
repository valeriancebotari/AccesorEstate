/* *****************  Create swiper object ****************** */
var swiper = new Swiper('.swiper-container', {
                 effect: 'coverflow',
                 grabCursor: true,
                 centeredSlides: false,
                 slidesPerView: '3',
                 coverflowEffect: {
                     rotate: 40,
                     stretch: 1,
                     depth: 50,
                     modifier: 1,
                     slideShadows : true,
                  },
                 pagination: {
                     el: '.swiper-pagination',
                 },
              });



/* *************************  Document Ready  *********************** */

$(function(){

	      /* ********* Change opacity on mouseenter and mouseleave ************* */   		
  	$('#features .panel-body img, .live-chat .call-us, .phone img').on('mouseenter', function(){
		    $(this).css({
			     'cursor' : 'pointer',
			     'opacity': '0.9'
		    });
	  });

	  $('#features .panel-body img, .live-chat .call-us, .phone img').on('mouseleave', function(){
		    $(this).css({
			     'cursor' : 'default',
			     'opacity': '1'
		    });
	  });
    

        /* ************** Show/Hide Latest Tweets *********** */
    var Tweets={
	         init : function(){
		          this.show();
	         },

	         show : function(){
		           var container = $(".tweets-container .col-sm-12"),
		               uls = container.children(".recent-tweet"),
		               thumbnails = $(".tweets-thumbnails");

		            //change the selected heading to the selected one    
		            thumbnails
		        	      .on('click', 'li', function(e){
		   	        	      var li = $(this),
		   	            	      hash;

		   	       		      li.siblings().removeClass('active').end().addClass('active'); 
		   	       		      hash = li.children('a').attr('href');

		   	       		      uls.hide().filter(hash).fadeIn(600); 
		   	       		      e.preventDefault();        
		     	          });
	         } // end show function
       } // end tweets object literal

       Tweets.init();

        /* **************  Show lowest height in recent tweets ************* */
             var i = 0,
                 heights = [],
                 min;

			        $('.recent-tweet blockquote').each(function(){
					        var $this = $(this);
					            heights.push($this.actual('height'));
              
                	    min = heights[0];
               
                      for( i=0; i<heights.length; i++){        // getting lowest height
                 		      if(heights[i] <= min){
                 			        min = heights[i];
                 		      }
              		    }				
			        });

			        $('.recent-tweet blockquote').each(function(){
                  var $this = $(this);

                      $this.css({                                // setting lowest height
                          'height': min,
				                  'overflow':'hidden'		
                      }); 
			        });


        /* ***************  Tooltips  ******************** */
            $('[data-toggle="tooltip"]').tooltip();         
});  // end document ready



/* ********************   Carousel Testimonials  ***************** */    
    $(window).load(function() {
        var $items = $('.carousel[data-type="multi"] .item'),            /* grab all slides in carousel */
            heights = [],                                                /* create empty array to store height values */
            tallest;                                                     /* create variable to make note of the tallest slide */

            $items.each(function() {
                var next = $(this).next();
                if (!next.length) {
                    next = $(this).siblings(':first');
                }                                
            }); // end each
    
            if ($items.length) {
                function normalizeHeights() {
                    $items.each(function() {                     
                        heights.push($(this).height());
                    });
                          
                    tallest = Math.max.apply(null, heights);            /* cache largest value */
                    $items.each(function() {
                        $(this).css('min-height', tallest + 'px');
                    });
                }; // end function

                normalizeHeights();
                   
                $(window).on('resize orientationchange', function() {
                    tallest = 0, heights.length = 0;      

                    $items.each(function() {
                        $(this).css('min-height', '0');                 /* reset min-height */
                    }); 

                    normalizeHeights(); 
                });                                                     /* end window resize */
             } // end if      
            

    }); // end window load
    

 /* **************** Nr images in swiper based on resize window ******************** */

            $(window).on('load resize', function(){
            var win = $(this); //this = window
      
                if ( win.width() <= 480 ) {
                    swiper.params.slidesPerView = '2';  
                }

                else if ( ( win.width() > 480 ) && ( win.width() <= 991 ) ){
                  swiper.params.slidesPerView = 'auto';
                }
            
            else if (win.width() > 991){
              swiper.params.slidesPerView = '3';
            }
      });    /* end if items length */          
    