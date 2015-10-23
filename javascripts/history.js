/**
 * 
 */
$(document).ready(function() {

	$(".localdate").each(function(i, obj) {
		var localDate = moment(Number(obj.innerHTML)).toDate();
		obj.innerHTML = moment(localDate).format(messages["date.pattern"]);
	});
});