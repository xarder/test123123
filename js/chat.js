jQuery(document).ready(function($) {

function submitChat(){
   if(AddForm.message.value == ''){
   alert('all fields are mandatory!');
   return;
   }

   var message = AddForm.message.value;
   alert("message: "+message);
   var xmlhttp = new XMLHttpRequest();

   xmlhttp.onreadystatechange = function(){
         if(xmlhttp.readyState==4 && xmlhttp.status==200){
            document.getElementById('chat-list').innerHTML = xmlhttp.responseText;
            document.getElementById('chat-online').innerHTML = xmlhttp.responseText;
            }
        }
         /*  alert('ok'); */
        xmlhttp.open('POST','/ajax.php?m=add_chat&message='+message,true);
        xmlhttp.send();
}
   $(document).ready(function(e){
   $.ajaxSetup({cache:false});
   setInterval(function() {$('#chat-list').load('/ajax.php?m=chat');},2000);
   setInterval(function() {$('#chat-online').load('/ajax.php?m=chat_online');},2000);

   });
});