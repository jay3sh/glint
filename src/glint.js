

(function () {

var rawlink = document.getElementById('raw-url');

$('.big-actions').append(
'<li>&nbsp;<a class="minibutton" id="dolint" href="#" style="display: inline-block; "><span>Lint this file</span></a></li>'
);

$('#dolint').click(function () {
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
});

})();
