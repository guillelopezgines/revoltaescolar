var
  timeout,
  render = function() {
    html2canvas(document.querySelector(".poster")).then(canvas => {
      $('.render').html("");
      canvas.setAttribute('id', 'canvas');
      $('.render').append(canvas);
      resize();
    });
  },
  render_with_timeout = function(){
    clearTimeout(timeout);
    timeout = setTimeout(function(){
      render()
    }, 500);
  }
  resize = function() {
    var canvas = document.getElementById('canvas');
    var canvasRatio = canvas.height / canvas.width;
    var windowRatio = window.innerHeight / window.innerWidth;
    var width;
    var height;

    if (windowRatio < canvasRatio) {
        height = window.innerHeight;
        width = height / canvasRatio;
    } else {
        width = window.innerWidth;
        height = width * canvasRatio;
    }

    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    $('.setup').width(window.innerWidth - width - 40);
  };

$(document).ready(function() {
  // render();
  // window.addEventListener('resize', resize, false);
  $(".container").stick_in_parent();
  $('[type=text][data-target]').on('keyup', function(e){
    var el = $(this).attr('data-target');
    $(el).html($(this).val());
    // render_with_timeout();
  });
  $('select[data-target]').on('change', function(e){
    var el = $(this).attr('data-target');
    $(el).html($(this).val());
  });
  $('[type=checkbox][data-target]').on('change', function(e){
    var el = $(this).attr('data-target');
    if($(this).prop("checked")){
      $(el).show();
    } else {
      $(el).hide();
    }
    render();
  });
  $('[type=file][data-target][data-parent]').on('change', function(e){
    var input = this,
        el = $(this).attr('data-target'),
        $el = $(el),
        $parent = $($(this).attr('data-parent'));
    if (input.files && input.files[0]) {
      if($el.length == 0){
        $el = $('<img>').addClass(el);
        $parent.append($el);
      }
      var reader = new FileReader();
      reader.onload = function(e) {
        $el.attr('src', e.target.result);
        render();
      }
      reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
  });
  $('.download').on('click', function(e){
    e.preventDefault();
    html2canvas(document.querySelector(".poster")).then(canvas => {
      Canvas2Image.saveAsPNG(canvas, 2 * 1685, 2 * 2382);
    });
  });
});