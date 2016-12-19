$(document).ready(function(){
	$("#allplans").click(function(){
		document.getElementById("ftt").className = "tab-pane active";
		document.getElementById("topup").className = "tab-pane active";
		document.getElementById("spl").className = "tab-pane active";
		document.getElementById("2g").className = "tab-pane active";
		document.getElementById("3g").className = "tab-pane active";
	});
});
