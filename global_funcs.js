haceCuanto = function(d) {
	var d2= new Date();
	var diff = d2-d1;
	var secDiff = floor(diff/1000);
	var minDiff = floor(diff/(60*1000));
	var hourDiff = floor(diff/(60*60*1000));
	var dayDiff = floor(diff/(24*60*60*1000));
	if(secDiff==1) {
		return "1 segundo";
	} else if(secDiff<60) {
		return secDiff+" segundos";
	} else if(minDiff==1) {
		return "1 minuto";
	} else if(minDiff<60) {
		return minDiff+" minutos";
	} else if(hourDiff==1) {
		return "1 hora";
	} else if(hourDiff<24) {
		return hourDiff+" horas";
	} else if(dayDiff) {
		return "1 día";
	} else {
		return dayDiff+" días";
	}
}