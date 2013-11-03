
/**
 * Code used for putting the task-description, into a single line.
 */
var tile = $('.tiles');
while ($(tile).outerHeight() > $(tile).height()) {
	$(tile).text(function(index, text) {
		return text.replace(/\W*\s(\S)*$/, '...');
	});
}

// Drag and drop event handlers
/*
 function handleDragStart(e) {
 this.style.opacity = '0.4';  
 console.log(e.clientX+",  ");
 console.log(e.changedTouches.pageX, e.changedTouches.pageY);
 e.stopPropagation();
 }
 function handleDragEnd(e) {
 this.style.opacity = '1.0'; 
 } 
 */

$(function() {	

setTimeout(function(){
	/**
	 * Code used for binding the task list, to the swiping(left, right) gestures.
	 */
	var cols = document.querySelectorAll('li.task span.tiles');
	debugger;
	[].forEach.call(cols, function(col) {
		//col.addEventListener('touchstart', handleDragStart, false);
		//col.addEventListener('touchend', handleDragEnd, false);
		$(col).wipetouch(
				{
					wipeLeft : function(result) {
						console.log("LEFT");
						var deletedTaskLi = $(result.source).parent().parent();
						debugger;
						deletedTaskLi.transit(  {
													marginLeft : 0,
													opacity: 1.00
												},
												"slow",
												function(){
													console.log("Swiped Left")
													//alert("Right")
												}
											);
						//console.log(result.x + " , " + result.y + " : " + result.speed);
					},
					wipeRight : function(result) {
						console.log("RIGHT");
						var takLi = $(result.source).parent().parent();
						if($(result.source).hasClass("tiles"))
							takLi = $(result.source).parent();
						else if($(result.source).hasClass("task"))
							takLi = $(result.source);
						debugger;
						takLi.transit({
											marginLeft : takLi.outerWidth() + 20,
											opacity: 0.25
										},
										"slow",
										function(){
											console.log("Swiped Right")
											//alert("Left")
										})
									.transit(
												{
													height: 0,
													padding: 0,
													margin: 0	//Reason for geany effect.
												},
												"slow",
												function() {
													debugger;
													deleteTask(takLi.find("[TaskID]").attr('TaskId'));
													var nextTask = takLi.next();
													nextTask.transit({ top: 0}, "fast");
													takLi.remove();
												}
											);
						//console.log(result.x + " , " + result.y + " : " + result.speed);
					},
					wipeUp : function(result) {
						console.log("UP");
						console.log(result.x + " , " + result.y + " : "
								+ result.speed);
					},
					wipeDown : function(result) {
						console.log("DOWN");
						console.log(result.x + " , " + result.y + " : "
								+ result.speed);
					},
					wipeMove : function(result) {
						//console.log("MOVE");
						/* var $marginLefty = $($(".tiles")[0]);
						$marginLefty.animate(
							{	
								marginLeft: parseInt($marginLefty.css('marginLeft'),10) == 0 ? $marginLefty.outerWidth() : 0
							}
						);
						 */
						//console.log(result.curX + " , " + result.curY);
					}
				});
		debugger;

		$(col).on( 'dblclick', function(e){
			debugger;

			/*if( window.verticalSlideDist >5){
				window.verticalSlideDist = 0;
				return;
			}*/
			$('#wrapper').css('display', 'none');
			$('#test-popup').css('display', 'block');
			console.log($(this).find('.Name').html().trim());
			console.log($(this).find('.Description').html().trim());
			console.log( $(this).attr('TaskId') );
			debugger;
			$('#test-popup textArea#Description').val( $(this).find('.Description').html().trim() );
			$('#test-popup input#Name').val( $(this).find('.Name').html().trim() );
			var dateTime = new Date($(this).find('.taskTime').html().trim())
			var date =  dateTime.getFullYear() +"-"+
						((dateTime.getMonth() + 1)<10? ('0'+(dateTime.getMonth() + 1)): (dateTime.getMonth() + 1) )+"-"+
						((dateTime.getDate() < 10 )? ('0'+dateTime.getDate()) : dateTime.getDate());
			var time = ((dateTime.getHours()<10)?('0'+dateTime.getHours()): dateTime.getHours() )+":"+
					   ((dateTime.getMinutes()<10)?('0'+dateTime.getMinutes()): dateTime.getMinutes() )+":"+
					   ((dateTime.getSeconds()<10)?('0'+dateTime.getSeconds()): dateTime.getSeconds() );
			$('#test-popup input#datepicker').val( date );
			$('#test-popup input#timepicker').val( time );
			debugger;
			$('#test-popup #TaskId').val( $(this).attr('TaskId'));
//			$(e.target).magnificPopup({
//				  items: {
//				      src: '<div class="white-popup">Dynamically created popup</div>',
//				      type: 'inline'
//				  },
//				  closeBtnInside: true
//				});
		});
		
	})
	
	
/*	$('li.task').dblclick(function(){
		console.log("dblClick");
		$(this).addClass('animated tada');
		$(this).find('.Description').attr('height','400px');
		$(this).addClass('animated tada');

//		$('li.task').magnificPopup({
//			type: 'inline',
//			preloader: false,
//			focus: '#name',
//
//			// When elemened is focused, some mobile browsers in some cases zoom in
//			// It looks not nice, so we disable it:
//			callbacks: {
//				beforeOpen: function() {
//					if($(window).width() < 700) {
//						this.st.focus = false;
//					} else {
//						this.st.focus = '#name';
//					}
//				}
//			}
//		});
		setTimeout( function(){
			$('li.task').removeClass('animated tada');
		}, 1000);
	})*/
}, 150);
 });

//var cols = document.querySelectorAll('li.tiles');
//[].forEach.call(cols, function(col) {
//	//col.addEventListener('touchstart', handleDragStart, false);
//	//col.addEventListener('touchend', handleDragEnd, false);
//});
