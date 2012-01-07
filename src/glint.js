

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

var options = {
  bitwise     : true,
  browser     : true,
  cap         : true,
  confusion   : true,
  'continue'  : true,
  css         : true,
  debug       : true,
  devel       : true,
  eqeq        : true,
  es5         : true,
  evil        : true,
  forin       : true,
  fragment    : true,
  indent      : 4,
  maxerr      : 100,
  maxlen      : 80,
  newcap      : true,
  node        : true,
  nomen       : true,
  on          : true,
  passfail    : true,
  plusplus    : true,
  properties  : true,
  regexp      : true,
  rhino       : true,
  undef       : true,
  unparam     : true,
  sloppy      : true,
  sub         : true,
  vars        : true,
  white       : true,
  widget      : true,
  windows     : true
};

function doLint() {
  var rawlink = document.getElementById('raw-url');
  $.get(rawlink.href, function (source) {
    var result = JSLINT(source, options);
    if(!result) {
      for(var i=0, l=JSLINT.errors.length; i<l; i++) {
        var error = JSLINT.errors[i];
        if(error) {
          $('#L'+error.line).css('color','#f00')
            .attr('title','<span style="font-size:110%;">'+
              error.reason+'</span>')
            .tipsy({gravity:'w',html:true});
          $('#LC'+error.line).css('background-color','rgba(255,100,100,0.2)');
          console.log(error);
        } else {
          console.error('JSLint stopped on error');
        }
      }
    }
  });
}

})();
