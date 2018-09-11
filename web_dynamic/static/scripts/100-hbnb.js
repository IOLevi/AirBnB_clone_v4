let mtotal = []; // amenity names
let stotal = []; // states names
let ctotal = []; // cities names
let aids = []; // amenity ids
let sids = []; // states ids
let cids = []; // cities ids

$(document).ready(() => {
  $('.amenities input').change(function () {
    if ($(this).prop('checked')) {
      mtotal.push($(this).attr('data-name'));
      aids.push($(this).attr('data-id'));
    } else {
      let v = $(this).attr('data-name');
      let w = $(this).attr('data-id');
      let ind = mtotal.indexOf(v);
      let ind2 = aids.indexOf(w);
      if (ind > -1) {
        mtotal.splice(ind, 1);
      }
      if (ind2 > -1) {
        aids.splice(ind2, 1);
      }
    }
    mtotal.sort();
    $('.amenities h4').text(mtotal.join(', '));
  });

$(document).ready(() => {
  $('.states input').change(function () {
    if ($(this).prop('checked')) {
      stotal.push($(this).attr('data-name'));
      sids.push($(this).attr('data-id'));
    } else {
      let v = $(this).attr('data-name');
      let w = $(this).attr('data-id');
      let ind = mtotal.indexOf(v);
      let ind2 = aids.indexOf(w);
      if (ind > -1) {
        stotal.splice(ind, 1);
      }
      if (ind2 > -1) {
        sids.splice(ind2, 1);
      }
    }
    stotal.sort();
    $('.states h4').text(stotal.join(', '));
  });

$(document).ready(() => {
  $('.cities input').change(function () {
    if ($(this).prop('checked')) {
      ctotal.push($(this).attr('data-name'));
      cids.push($(this).attr('data-id'));
    } else {
      let v = $(this).attr('data-name');
      let w = $(this).attr('data-id');
      let ind = ctotal.indexOf(v);
      let ind2 = cids.indexOf(w);
      if (ind > -1) {
        ctotal.splice(ind, 1);
      }
      if (ind2 > -1) {
        cids.splice(ind2, 1);
      }
    }
    ctotal.sort();
    $('.cities').text(ctotal.join(', '));
  });

  $.get('http://localhost:5001/api/v1/status',
    function (data, textStatus) {
      if (data['status'] === 'OK') {
        $('DIV#api_status').addClass('available');
      } else {
        $('DIV#api_status').removeClass('available');
      }
    }
  );

  $.ajax({url: 'http://localhost:5001/api/v1/places_search/',
    type: 'POST',
    data: '{}',
    contentType: 'application/json',
    dataType: 'json',
    success: (data) => {
      for (let place of data) {
        $('SECTION.places').append('<article> <div class="title"> <h2>' +
        '#' + place.name + '</h2>' + '<div class="price_by_night">' + '$' +
        place.price_by_night + '</div> </div>' +
        '<div class="information"> <div class="max_guest">' +
        '<i class="fa fa-users fa-3x" aria-hidden="true"></i>' +
        '<br />' + place.max_guest + ' Guests' +
        '</div>' +
        '<div class="number_rooms"> <i class="fa fa-bed fa-3x" aria-hidden="true">' +
        '</i><br />' + place.number_rooms + ' Bedrooms' + '</div>' +
        '<div class="number_bathrooms"> <i class="fa fa-bed fa-3x" aria-hidden="true">' +
        '</i><br />' + place.number_bathrooms + ' Bathrooms' + '</div> </div>' +
        '<div class="description">' + place.description + '</div>' +
        '</article>');
      }
    }
  });

  $('button').click(() => {
    $.ajax({
      url: 'http://localhost:5001/api/v1/places_search/',
      type: 'POST',
      data: JSON.stringify({amenities: aids, states: sids, cities: cids}),
      contentType: 'application/json',
      dataType: 'json',
      success: (data) => {
        $('SECTION.places article').remove(); // remove old article
        for (let place of data) {
          $('SECTION.places').append('<article> <div class="title"> <h2>' +
            '#' + place.name + '</h2>' + '<div class="price_by_night">' + '$' +
            place.price_by_night + '</div> </div>' +
            '<div class="information"> <div class="max_guest">' +
            '<i class="fa fa-users fa-3x" aria-hidden="true"></i>' +
            '<br />' + place.max_guest + ' Guests' +
            '</div>' +
            '<div class="number_rooms"> <i class="fa fa-bed fa-3x" aria-hidden="true">' +
            '</i><br />' + place.number_rooms + ' Bedrooms' + '</div>' +
            '<div class="number_bathrooms"> <i class="fa fa-bed fa-3x" aria-hidden="true">' +
            '</i><br />' + place.number_bathrooms + ' Bathrooms' + '</div> </div>' +
            '<div class="description">' + place.description + '</div>' +
            '</article>');
        }
      }
    });
  });
});
