let mtotal = [];
$(document).ready(() => {
  $('.amenities input').change(function () {
    if ($(this).prop('checked')) {
      mtotal.push($(this).attr('data-name'));
    } else {
      let v = $(this).attr('data-name');
      let ind = mtotal.indexOf(v);
      if (ind > -1) {
        mtotal.splice(ind, 1);
      }
    }
    mtotal.sort();
    $('.amenities h4').text(mtotal.join(', '));
  });
  $.get('http://0.0.0.0:5001/api/v1/status',
    function (data, textStatus) {
      if (textStatus === '200') {
        $('DIV#api_status').addClass('available');
      } else {
        $('DIV#api_status').removeClass('available');
      }
    }
  );
});
