jQuery(document).ready(function($) {

	$('form#AddForm').submit(function() {

		var idk  = $('#idk').val();
		var name = $('#name').val();
		var comm = $('#message').val();
		var type = $('#type').val();
		var rnd  = $('#rnd').val();

		if (!name || name.length < 3 || name.length > 25) {

			alert(lang.err_name);
			return false;
		}

		if (!comm || comm.length < 3 || comm.length > 1000) {

			alert(lang.err_len_msg);
			return false;
		}

		$.post('/ajax.php?m=add_comm', { id: idk, name: name, comm: comm, type: type, rnd: rnd}, function(data) {

			if ( data.success ) {
                $('#AddForm #message').val('')


				$('#comment_empty').css('display', 'none');

				$("html").animate({scrollTop: $('#comment_list').offset().top - 70}, 1100);

				$('#comment_list').prepend(data.content);

				setTimeout(function() {$('#blind-animation').show('blind',{},1500)}, 1100);
			}
			else {

				if ( data.refresh ) {

					alert( lang.err_sess );

					location.reload(true);
				}
				else {

					alert( data.message );
				}
			}


		}, 'json');

		return false;
	});
});