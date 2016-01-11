var uagent	= navigator.userAgent.toLowerCase();
var is_safari	= ( (uagent.indexOf('safari') != -1) || (navigator.vendor == "Apple Computer, Inc.") );
var is_opera	= (uagent.indexOf('opera') != -1);
var is_ie	= ( (uagent.indexOf('msie') != -1) && (!is_opera) && (!is_safari) );
var is_ie4	= ( (is_ie) && (uagent.indexOf("msie 4.") != -1) );
var is_win	= ( (uagent.indexOf("win") != -1) || (uagent.indexOf("16bit") !=- 1) );
var ua_vers	= parseInt(navigator.appVersion);
var ie_range_cache	= '';

function doInsert(ibTag, ibClsTag, isSingle) {

	var selField	= 'message';
	var fombj	= document.getElementById( 'AddForm' );
	var isClose = false;
	var obj_ta = eval('fombj.' + selField);
	obj_ta.focus();

	if ( (ua_vers >= 4) && is_ie && is_win) {

		if (obj_ta.isTextEdit) {

			var sel = document.selection;
			var rng = ie_range_cache ? ie_range_cache : sel.createRange();
			rng.colapse;

			if ((sel.type == 'Text' || sel.type == 'None') && rng != null) {

				if (ibClsTag != '' && rng.text.length > 0)
					ibTag += rng.text + ibClsTag;
				else if(isSingle)
					ibTag += rng.text + ibClsTag;

				rng.text = ibTag;
			}
		}
		else {

			obj_ta.value += ibTag + ibClsTag;

		}

		rng.select();

		ie_range_cache = null;

	}
	else if ( obj_ta.selectionEnd != null ) {

		var ss = obj_ta.selectionStart;
		var st = obj_ta.scrollTop;
		var es = obj_ta.selectionEnd;

		var start  = (obj_ta.value).substring(0, ss);
		var middle = (obj_ta.value).substring(ss, es);
		var end    = (obj_ta.value).substring(es, obj_ta.textLength);

		if (!isSingle) middle = '';

		if (obj_ta.selectionEnd - obj_ta.selectionStart > 0) {

			middle = ibTag + middle + ibClsTag;
		}
		else {

			middle = ibTag + middle + ibClsTag;
		}

		obj_ta.value = start + middle + end;

		var cpos = ss + (middle.length);

		obj_ta.selectionStart = cpos;
		obj_ta.selectionEnd   = cpos;
		obj_ta.scrollTop      = st;

	}
	else {

		obj_ta.value += ibTag + ibClsTag;
	}

	return isClose;
};

function AddSmile(smile) {

	//var txt = jQuery('#message').val();
	//jQuery('#message').val(txt + ' ' + smile);
	//jQuery('#smiles').fadeOut(600);

	doInsert(' ' + smile, '', false);
	ie_range_cache = null;
	jQuery('#smiles').fadeOut(600);
}

jQuery(document).ready(function($) {

	$('#smiles').hide(0);
	var item = $('#open_smile');
	var pos  = item.offset();
	var left = pos.left + 0;
	var top  = pos.top - 0;

	item.click(function() {

		if ($('#smiles').css('display') == 'none') {

$('#smiles').css({
    display: 'block',
    position: 'absolute',
    margin: '42px 0 0 -12px',
    top: $('#open_smile').offset().top + 'px'
   }).fadeIn(600);

		}
		else
		{
			$('#smiles').fadeOut(600);
		}
	});
});