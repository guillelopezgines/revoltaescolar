$(document).ready(function() {
  $('[data-action=download]').on('click', function(e){
    e.preventDefault();
    $('#poster').addClass('full');
    html2canvas(document.querySelector("#poster")).then(canvas => {
      Canvas2Image.saveAsPNG(canvas, 2 * 1685, 2 * 2382);
      $('#poster').removeClass('full');
    });
  })
  $('[type=text]').on('keyup', function(e){
    $('#title').html($(this).val());
  })
  $('[type=file]').on('change', function(e){
    var input = this;
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
        $('#blah').attr('src', e.target.result);
      }
      reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
  });
});

