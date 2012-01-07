

(function () {


function addLintButton() {
  if($('.big-actions:first #dolint').length == 0) {
    $('.big-actions:first').append(
    '<li>&nbsp;<a class="minibutton" id="dolint" href="#" '+
    'style="display: inline-block; "><span>Lint this file</span></a></li>');
    $('#dolint').click(doLint);
  }
}
function removeLintButton() {
  $('.big-actions #dolint').remove();
}
//if(/.*\.js\/$/.test($('#slider').find('.breadcrumb:last').attr('data-path'))) {
if(/.*\.js$/.test(document.location.pathname)) {
  addLintButton();
}

$('#slider').bind('DOMSubtreeModified', function () {
  //if(/.*\.js\/$/.test($(this).find('.breadcrumb:last').attr('data-path'))) {
  if(/.*\.js$/.test(document.location.pathname)) {
      addLintButton();
  } else {
    removeLintButton();
  }
});

function doLint() {
  var rawlink = document.getElementById('raw-url');
  $.get(rawlink.href, function (source) {
    var result = JSLINT(source, { maxerr:500000} );
    if(!result) {
      for(var i=0, l=JSLINT.errors.length; i<l; i++) {
        var error = JSLINT.errors[i];
        $('#L'+error.line).css('color','#f00')
          .attr('title','<span style="font-size:110%;">'+error.reason+'</span>')
          .tipsy({gravity:'w',html:true});
        $('#LC'+error.line).css('background-color','rgba(255,100,100,0.2)');
      }
    }
  });
}

})();
