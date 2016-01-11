function ShowLoading( message ) {

	var Loading = jQuery('#loading-layer');

	if ( !Loading ) alert('Error! Loading Layer!');

	if ( message ) {

		Loading.html(message);
	}

	var setX = ( jQuery(window).width()  - Loading.width()  ) / 2;
	var setY = ( jQuery(window).height() - Loading.height() ) / 2;

	Loading.css( {
		left : setX + "px",
		top : setY + "px",
		position : 'fixed',
		zIndex : '99'
	});

	Loading.fadeTo('slow', 0.6);

};

function HideLoading( message ) {

	jQuery('#loading-layer').fadeOut('slow');
};

function doRate( rate, id ) {

	var type = jQuery('.content').attr('data-rel');

	ShowLoading('');

	jQuery.get('/ajax.php?m=rating', { go_rate: rate, news_id: id, type: type }, function(data) {

		HideLoading('');

		if ( data.success ) {

			var rating = data.rating;
			rating = rating.replace(/&lt;/g, "<");
			rating = rating.replace(/&gt;/g, ">");
			rating = rating.replace(/&amp;/g, "&");

			jQuery('#ratig-layer-' + id).html(rating);
			jQuery('#vote-num-id-' + id).html(data.votenum);

			jQuery('#show-rate').text(data.ratenum);
			jQuery('#show-vote').text(data.votenum);
		}

	}, 'json');
};

function doFavorites( fav_id ) {

	var type = jQuery('.content').attr('data-rel');

	ShowLoading('');

	jQuery.get('/ajax.php?m=favorites', { fav_id: fav_id, type: type }, function(data) {

		HideLoading('');

		jQuery('#fav-id-' + fav_id).html(data);

	});

	return false;
};

function doFriends( frid, type ) {

	ShowLoading('');

	jQuery.get('/ajax.php?m=friends', { frid: frid, type: type }, function(data) {

		HideLoading('');

		jQuery('#friends').html(data);

	});

	return false;
};

function delFriends(uid) {

	if (confirm(lang.del_friend)) {
		doFriends(uid,'del');
		return true;
	}
	return false;
}

function showPlayer(id) {

	if ($('#image').css('display')=='block') {
		$('#image').css('display','none');
		$('#player').css('display','block');
	} else {
		$('#image').css('display','block');
		$('#player').css('display','none');
	}

	ShowLoading('');

	jQuery.get('/ajax.php?m=videos', { vid: id, type: 'view' }, function(data) {

		HideLoading('');

		jQuery('#view-' + id).html(data);

	});
}

function videoDown(id) {

	jQuery.get('/ajax.php?m=videos', { vid: id, type: 'down' }, function(data) {

		jQuery('#down-' + id).html(data);

	});
}

function photoDown(id) {

	jQuery.get('/ajax.php?m=photos', { aid: id, type: 'down' }, function(data) {

		jQuery('#down-' + id).html(data);

	});
}


/* Read Story */

jQuery(document).ready(function($) {

	var commCounter = 0;

	var commOnpage  = 1000;

	var commTotal   = jQuery('.link').attr('data-rel');

	var commTotalFloor = Math.floor((commTotal)/commOnpage);
	var commTotalPages = Math.ceil((commTotal)/commOnpage);
	if (commTotalFloor == commTotalPages) commTotalFloor--;

	//273px one thumbs height x 7 thumbs cols x 14 thuumbs rows
	var heightResize = 400;



		jQuery('.show-more').click( function() {

			ShowLoading();



			var readId = jQuery('#readlist').attr('data-rel');

			commCounter++;

			jQuery.get('/ajax.php?m=read', { c_id: readId, page: commCounter, onpage: commOnpage }, function(data) {

				HideLoading('');

				if (data.success) {


					jQuery('#show-content').append(data.content);
                    setTimeout(function(){
                     $('.history-main').slideUp(0)
					 $('.history-more').slideUp(0)

					 $('.js_show_history').slideToggle('400');
					},300)
					if (commCounter >= commTotalPages) {

						jQuery('.history-main .show-more').hide();
					}
				}
				else {

					jQuery('.history-main .show-more').hide();
				}

			}, 'json');

			function scroll_to_elem(){

				var pos = jQuery(window).scrollTop() + heightResize;

				jQuery("html,body").animate({"scrollTop":pos}, 700);
			}



			return false;

		});



	jQuery('#message-info').click( function() {

		jQuery(this).fadeOut(600);
		return true;
	});

	function textSize(a) {
  var e = parseInt($('#show-content').css('font-size'))
  if (a=='plus') {
    var mn = 2
  } else {
    var mn = -2
  }
  $('#show-content').css('font-size',e+mn+'px')
}

$('.text_plus').on('click',function(){
  textSize('plus')
})
$('.text_minus').on('click',function(){
  textSize('minus')
})

$('.reset_text').on('click',function(){
  $('#show-content').css('font-size','')
})


});

function ckeck_uncheck_all(frm) {
    //var frm = document.forums;
    if(frm.master_box.checked == true){ frm.master_box.checked = false; }
    else{ frm.master_box.checked = true; }
    for (var i=0;i<frm.elements.length;i++) {
        var elmnt = frm.elements[i];
        if (elmnt.type=='checkbox') {
            if(frm.master_box.checked == true){ elmnt.checked=false; }
            else{ elmnt.checked=true; }
        }
    }


}



$(document).ready(function() {

if ($('.js_view_count').length) {
var type = $('#type').val()
var id = $('#idk').val()

 jQuery.get('/ajax.php?m=views', { id: id, type: type }, function(data) {
  jQuery('.js_view_count').html(data);
 });
}






			/*
			 *  Button helper. Disable animations, hide close button, change title type and content
			 */

			$('.screens-buttons').fancybox({
				openEffect  : 'none',
				closeEffect : 'none',

				prevEffect : 'none',
				nextEffect : 'none',

                arrows : false,

				closeBtn  : false,

				helpers : {
					title : {
						type : 'inside'
					},
					buttons	: {}
				},


			});

			$('.photo-buttons').fancybox({
				openEffect  : 'none',
				closeEffect : 'none',

				prevEffect : 'none',
				nextEffect : 'none',

                arrows : false,

				closeBtn  : false,

				helpers : {
					title : {
						type : 'inside'
					},
					buttons	: {}
				},


			});


		});



$(document).ready(function(){
		var removeClass = true;
		$(".dropdown-toggle").click(function () {
		    $(".share-toggle").removeClass('share-open');
            $(".share").removeClass('show');
			$(this).toggleClass('dropdown-open').next('.dropdown').toggleClass('show');
			$('.dropdown-toggle').not($(this)).removeClass('dropdown-open').next('.dropdown').removeClass('show');
			removeClass = true;
			return false;
		});

		$(".dropdown").click(function() {
			removeClass = false;
		});

		$("body").click(function () {
			if (removeClass) {
				$(".dropdown-toggle").removeClass('dropdown-open');
				$(".dropdown").removeClass('show');
			}
			removeClass = true;
		});
	});

$(document).ready(function(){

$('#carouselhAuto').slick({
  infinite: true,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2700
});



		var removeClass = true;
		$(".share-toggle").click(function () {
			$(".dropdown-toggle").removeClass('dropdown-open');
            $(".dropdown").removeClass('show');
			$(this).toggleClass('share-open').next('.share').toggleClass('show');
			$('.share-toggle').not($(this)).removeClass('share-open').next('.share').removeClass('show');
			removeClass = true;
			return false;
		});

		$(".share").click(function() {
			removeClass = false;
		});

		$("body").click(function () {
			if (removeClass) {
				$(".share-toggle").removeClass('share-open');
				$(".share").removeClass('show');
			}
			removeClass = true;
		});
		$('[data-toggle="tooltip"]').tooltip()

$('.login-form').on('submit', function(e){

    var login = $('#login-name').val();
    var pass = $('#login-pass').val();

    jQuery.get('/ajax.php?m=login', { login: login, pass: pass}, function(data) {
        if (data == 'TRUE') {
            $('.login-form').submit();
            location.reload();
        }
        else {
            var text = LANG.LOGIN_ERR_AUTH;
            if (!login) {
                text = LANG.LOGIN_ERR_NICK;
                $('#login-name').addClass('error');
            }
            if (!pass) {
                text = LANG.LOGIN_ERR_PASS;
                $('#login-pass').addClass('error');
            }
            if (!login && !pass) {
                text = LANG.LOGIN_ERR_EMPTY;
                $('#login-name, #login-pass').addClass('error');
            }
            if (!$('.login-form').find('.modal-error').length) {
                $('.login-form').prepend('<div class="modal-error modal-red" style="display: none;">'+text+'</div>');
                $('.modal-error').slideDown(200)
            }
            return false;
        }
    });
    return false;
});


$('.login-form input').on('keyup',function(){
   $(this).removeClass('error');
   if (!$('.login-form').find('.error').length) {
       $('.modal-error').slideUp(200,function(){
           $('.modal-error').remove();
       });
   }
});

$('#reg-modal').on('hidden.bs.modal', function () {
    if ($('.modal-container.step2').css('display')!='none') {location.reload()}
})

$('#userpic-modal').on('hidden.bs.modal', function () {
    if ($('.modal-container').css('display')!='none') {location.reload()}
})


$('.step1 button[type="submit"]').on('click', function(e){
    e.preventDefault();
    validate_reg_step1()
});
$('.step2 button[type="submit"]').on('click', function(e){
    e.preventDefault();
    validate_reg_step2()
});

function validate_reg_step1(){
    var login = {$el : $('#reg-login'), val: $('#reg-login').val()};
    var paswd = {$el : $('#reg-pass'), val: $('#reg-pass').val()};
    var email = {$el : $('#reg-email'), val: $('#reg-email').val()};
    var code = {$el : $('#reg-code'), val: $('#reg-code').val()};
    var text = LANG.REG_ERR_EMPTY;
    var achtung = false;
    var ajax_error = false;


    if (!login.val) {
        login.$el.addClass('error');
        achtung = true;
    } else {
        if (login.val.length < 3 || login.val.length > 15) {
            login.$el.addClass('error');
            achtung = true;
        }
    }
    if (!paswd.val) {
        paswd.$el.addClass('error');
        achtung = true;
    } else {
        if (paswd.val.length < 4 || paswd.val.length > 15) {
            paswd.$el.addClass('error');
            achtung = true;
        }
    }
    if (!email.val) {
        email.$el.addClass('error');
        achtung = true;
    }

    if (!code.val) {
        code.$el.addClass('error');
        achtung = true;
    }

    console.log($('#reg-sex').val())
    if (!achtung) {
        jQuery.get('/ajax.php?m=reg', {
            login: login.val,
            paswd: paswd.val,
            email: email.val,
            code: code.val,
            name: $('#reg-name').val(),
            gender: parseInt($('#reg-sex').val()),
            day: $('#reg-b-day').val(),
            month: $('#reg-b-month').val(),
            year: $('#reg-b-year').val(),
            step: 1
        }, function (data) {
            if (data != 'REG_OK') {
                ajax_error = true;
            } else {
                //step 2
                $('.step1').css('display','none');
                $('.step2').css('display','inline-block');
                return false;
            }
            if (data == 'REG_ERR_CAPTCHA') {
                text = LANG.REG_ERR_CAPTCHA;
                code.$el.addClass('error');
            }
            if (data == 'REG_ERR_DIFFERENT') {
                text = LANG.REG_ERR_DIFFERENT;
            }
            if (data == 'REG_ERR_LOGIN_EXIST') {
                text = LANG.REG_ERR_LOGIN_EXIST;
            }
            if (data == 'REG_ERR_BLACK_LIST') {
                text = LANG.REG_ERR_BLACK_LIST;
            }
            if (data == 'REG_ERR_LOGIN_BAD') {
                text = LANG.REG_ERR_LOGIN_BAD;
            }
            if (data == 'REG_ERR_LOGIN') {
                text = LANG.REG_ERR_LOGIN;
            }
            if (data == 'REG_ERR_MAIL') {
                text = LANG.REG_ERR_MAIL;
            }
            if (data == 'REG_ERR_EMAIL_EXIST') {
                text = LANG.REG_ERR_EMAIL_EXIST;
            }

            if (ajax_error) {
                if (!$('.step1').find('.modal-error').length) {
                    $('.step1 .modal-container-inner .modal-title').after('<div class="modal-error modal-red" style="display: none;">' + text + '</div>');
                    $('.modal-error').slideDown(200)
                } else {
                    $('.modal-error').html(text)
                }
            }

        });

    } else {
        if (!$('.step1').find('.modal-error').length) {
            $('.step1 .modal-container-inner .modal-title').after('<div class="modal-error modal-red" style="display: none;">' + text + '</div>');
            $('.modal-error').slideDown(200)
        }
    }
}
function validate_reg_step2(){
    var ebala = [];
    $('.icheck-group input[type="checkbox"]').each(function(){
        if($(this).prop('checked')){
            ebala.push(parseInt($(this).val()))
        }
    });

    jQuery.post('/ajax.php?m=reg', {
        orientation: $('#reg-orientation').val(),
        likesex: ebala,
        info: $('[name="info"]').val(),
        excite: $('[name="excite"]').val(),
        repels: $('[name="repels"]').val(),
        step: 2
    }, function(data){
        location.reload();
    });
}




$('#reg-modal').on('keyup','input.error',function(){
   $(this).removeClass('error')
    if (!$('#reg-modal').find('input.error').length) {
        $('.modal-error').slideUp(200,function(){
            $(this).remove()
        })
    }
});


$('.icheck-group input[type="checkbox"]').iCheck();


var ids = [];
var sampleTags = [];
var arr=[];
$("#js_tag").tagit({
    autocomplete: {
        source: function (request, response) {
        jQuery.get('/ajax.php?m=tags', {
            search: request.term,
            key: 2
        }, function (data) {
            if (!data) {
                arr = []
            } else {
                arr = [];
                var dat = JSON.parse(data);
                sampleTags = dat;
                $.each(dat,function(e,u){
                    arr.push(u[1]);
                });
            }

            response(arr);
            console.log(arr)
        });
    },
        minLength: 2
    },
    afterTagAdded: function(event, ui) {
        console.log(event)
        // do something special
        var text = $(ui.tag).find('.tagit-label').text();
        if (sampleTags.length) {
            for (var i=0;i<sampleTags.length; i+=1) {
                console.log(sampleTags[i])
                if (sampleTags[i][1] == text) {
                    ids.push(sampleTags[i][0])
                }
            }
        }
    }
});

$('#tag_add button[type="submit"]').on('click',function(e){
    e.preventDefault();
    console.log(ids)
});


	});


setTimeout(function(){
(function(w,doc) {
if (!w.__utlWdgt ) {
    w.__utlWdgt = true;
    var d = doc, s = d.createElement('script'), g = 'getElementsByTagName';
    s.type = 'text/javascript'; s.charset='UTF-8'; s.async = true;
    s.src = ('https:' == w.location.protocol ? 'https' : 'http')  + '://w.uptolike.com/widgets/v1/uptolike.js';
    var h=d[g]('body')[0];
    h.appendChild(s);
}})(window,document);
},1500)




    function isNotMax(e){
    e = e || window.event;
    var target = e.target || e.srcElement;
    var code=e.keyCode?e.keyCode:(e.which?e.which:e.charCode)

    switch (code){
        case 13:
        case 8:
        case 9:
        case 46:
        case 37:
        case 38:
        case 39:
        case 40:
        return true;
    }
    return target.value.length <= target.getAttribute('maxlength');
}



$(document).on('change', '#image_upload_file', function () {
var progressBar = $('.progressBar'), bar = $('.progressBar .bar'), percent = $('.progressBar .percent');

$('#image_upload_form').ajaxForm({
    beforeSend: function() {
		progressBar.fadeIn();
        var percentVal = '0%';
        bar.width(percentVal)
        percent.html(percentVal);
    },
    uploadProgress: function(event, position, total, percentComplete) {
        var percentVal = percentComplete + '%';
        bar.width(percentVal)
        percent.html(percentVal);
    },
    success: function(html, statusText, xhr, $form) {
		obj = $.parseJSON(html);
		if(obj.status){
			var percentVal = '100%';
			bar.width(percentVal)
			percent.html(percentVal);
			$("#imgArea>img").prop('src',obj.image_big);
		}else{
			alert(obj.error);
		}
    },
	complete: function(xhr) {
		progressBar.fadeOut();
	}
}).submit();

});



