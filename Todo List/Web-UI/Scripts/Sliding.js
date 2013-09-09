$(document).ready(function() {
  $('#slidebottom button').click(function() {
    $(this).next().slideToggle();
  });

  $('#slidewidth button').click(function() {
    $(this).next().animate({width: 'toggle'});
  });
  
  $('#slideleft button').click(function() {
    var $lefty = $(this).next();
    $lefty.animate({left: parseInt($lefty.css('left'),10) == 0 ? -$lefty.outerWidth() : 0});
  });

  $('#slidemarginleft button').click(function() {
    var $marginLefty = $(this).next();
    $marginLefty.animate({marginLeft: parseInt($marginLefty.css('marginLeft'),10) == 0 ? $marginLefty.outerWidth() : 0});
  });
  
  $('#slidewidthsome button').click(function() {
    var $some = $(this).next(),
    someWidth = $some.outerWidth(),
    parentWidth = $some.parent().width();
    $some.animate({width: someWidth === parentWidth ? someWidth/2 : parentWidth - (parseInt($some.css('paddingLeft'),10) + parseInt($some.css('paddingRight'),10))});
  });  
});

