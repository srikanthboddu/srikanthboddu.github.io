var xmlobject;
var gaid = "";
var maid = "";
var activeTab = "#mob";
//tri
var mobSp = "Airtel";
var mobLoc = "Chennai";
var dthSp = "Airtel Digital TV";
//rc
var rcMob = "";
var rcAmt = "";
var rcSp  = "";
var rcLoc = "";

/* AJAX Object Initialization*/
function getxmlobject() {
	if (window.XMLHttpRequest){
	// If IE7, Mozilla, Safari, etc: Use native object
	var xmlobject = new XMLHttpRequest()
	} else {
		if (window.ActiveXObject){
		// ...otherwise, use the ActiveX control for IE5.x and IE6
		var xmlobject = new ActiveXObject("Microsoft.XMLHTTP"); 
		}
	}
	return xmlobject;
}
/* generic function to make ajax post */
function ajaxpost(url, parameters, callbackfn)
{
	xmlobject = getxmlobject();
	if(!xmlobject) {
		alert ("Browser does not support HTTP Request");
		return;
	}

	xmlobject.onreadystatechange = callbackfn;
	xmlobject.open('POST', url, true);
	xmlobject.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlobject.send(parameters);
}

/* generic function to make ajax post jquery*/
function ajaxPostJQ(urlLink, params, callbackfn) {
	 $.ajax({
		type: 'POST',
		url: urlLink,
		data: params,
		dataType: 'html',
		traditional: true,
		async: true,
		success: callbackfn
	});
}
function setActiveTab(type) {
	activeTab = type;
	if(!activeTab)
		activeTab = "#mob";
}
$(document).on("shown.bs.tab", '#rechargetabs a[data-toggle="tab"]', function (e) {
	if((e.target.hash == "#mob") || (e.target.hash == "#dth") || (e.target.hash == "#datacard")){
		activeTab = e.target.hash;
		if(activeTab === "#mob"){
			showTariff(mobSp,mobLoc);
			document.getElementById("dthtariff").className = "col-md-8 hide";
			document.getElementById("mobiletariff").className = "col-md-8 show";
		}else
		if(activeTab === "#dth"){
			//showDTHTariff(dthSp);
			document.getElementById("mobiletariff").className = "col-md-8 hide";
			document.getElementById("dthtariff").className = "col-md-8 hide";
		}else
		if(activeTab === "#datacard"){
			//showDTHTariff(dthSp);
			document.getElementById("mobiletariff").className = "col-md-8 hide";
			document.getElementById("dthtariff").className = "col-md-8 hide";
		}
	}
});
$(document).ready(function(){
	// $('[data-toggle="tooltip"]').tooltip();
	//sort operator list
	$("#prepaidsp").html($('#prepaidsp option').sort(function(x, y) {
		 return $(x).text().toUpperCase() < $(y).text().toUpperCase() ? -1 : 1;
	}));
	$("#postpaidsp").html($('#postpaidsp option').sort(function(x, y) {
		 return $(x).text().toUpperCase() < $(y).text().toUpperCase() ? -1 : 1;
	}));
	$("#dthsp").html($('#dthsp option').sort(function(x, y) {
		 return $(x).text().toUpperCase() < $(y).text().toUpperCase() ? -1 : 1;
	}));
	$("#dcprepaidsp").html($('#dcprepaidsp option').sort(function(x, y) {
		 return $(x).text().toUpperCase() < $(y).text().toUpperCase() ? -1 : 1;
	}));
	$("#dcpostpaidsp").html($('#dcpostpaidsp option').sort(function(x, y) {
		 return $(x).text().toUpperCase() < $(y).text().toUpperCase() ? -1 : 1;
	}));
	$("#landlinesp").html($('#landlinesp option').sort(function(x, y) {
		 return $(x).text().toUpperCase() < $(y).text().toUpperCase() ? -1 : 1;
	}));
	$("#dthtrisprov").html($('#dthtrisprov option').sort(function(x, y) {
		 return $(x).text().toUpperCase() < $(y).text().toUpperCase() ? -1 : 1;
	}));	
	$(".number").keydown(function (e) {
		// Allow: backspace, delete, tab, escape, enter and .
		if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
			 // Allow: Ctrl+A
			(e.keyCode == 65 && e.ctrlKey === true) ||
			 // Allow: Ctrl+C
			(e.keyCode == 67 && e.ctrlKey === true) ||
			 // Allow: Ctrl+X
			(e.keyCode == 88 && e.ctrlKey === true) ||
			 // Allow: Ctrl+V
			(e.keyCode == 86 && e.ctrlKey === true) ||
			 // Allow: home, end, left, right
			(e.keyCode >= 35 && e.keyCode <= 39)) {
				 // let it happen, don't do anything
				 return;
		}
		// Ensure that it is a number and stop the keypress
		if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
			e.preventDefault();
		}
	});
	$("#mobileamt").on("change keyup paste", function(){ //change keyup paste click
		var isPrepaid = document.getElementById("prepaid").checked;
		if(isPrepaid){
			sp  = document.getElementById("prepaidsp").value;
			loc = document.getElementById("location").value;
			if(("BSNL" === sp)||("Tata Docomo" === sp)||("Uninor" === sp)||("Videocon" === sp)||("MTNL" === sp)){
				amt = document.getElementById("mobileamt").value
				amtlen = amt.length;
				if(amtlen >= 2){
					if((sp === "") || (loc === "") || (amt === "")){
						return false;
					}
					var rcdata = [sp,loc,amt];
					rcdata = JSON.stringify(rcdata);
					var txfparam = "fn=selectSpl"+"&fdata=" +rcdata;
					ajaxpost('./xcommon/bend/xutilcallbackOne.php',txfparam,selectSpl_callback);
				}
			}
		}
	});
	$("#topupchk").click(function(){
		document.getElementById("normalspecialbtn").innerHTML = "Topup <span class='caret'></span>";
	});
	$("#specialchk").click(function(){
		document.getElementById("normalspecialbtn").innerHTML = "Special <span class='caret'></span>";
	});
	$("#prepaidli").click(function(){
		document.getElementById("prepostbtn").innerHTML = "Prepaid <span class='caret'></span>";
	});
	$("#postpaidli").click(function(){
		document.getElementById("prepostbtn").innerHTML = "Postpaid <span class='caret'></span>";
	});
	$("#dcprepaidli").click(function(){
		document.getElementById("dcprepostbtn").innerHTML = "Prepaid <span class='caret'></span>";
	});
	$("#dcpostpaidli").click(function(){
		document.getElementById("dcprepostbtn").innerHTML = "Postpaid <span class='caret'></span>";
	});
	
	$("#reghead").click(function(){
		document.getElementById("logintabli").className = "";
		document.getElementById("registertabli").className = "active in";
	});
	$("#loghead").click(function(){
		document.getElementById("logintabli").className = "active in";
		document.getElementById("registertabli").className = "";
	});
	$("#modalloginclose").click(function(){
		document.getElementById("regnameerror").className = "text-success hide";
		document.getElementById("regemailerror").className = "text-success hide";
		document.getElementById("regmoberror").className = "text-success hide";
		document.getElementById("regpwderror").className = "text-success hide";
		document.getElementById("loginmoberror").className = "text-success hide";
		document.getElementById("loginpwderror").className = "text-success hide";
	});
	$("#btntri").click(function(){
		document.getElementById("tridrop").className = "dropdown";
	});
	//use to show and hide password
	$("#pwdshow").click(function(){
		document.getElementById('regpwd').type = 'text';
		document.getElementById("pwdshow").className = "bold cursorpoint hide";
		document.getElementById("pwdhide").className = "bold cursorpoint show";
	});
	$("#pwdhide").click(function(){
		document.getElementById('regpwd').type = 'password';
		document.getElementById("pwdshow").className = "bold cursorpoint show";
		document.getElementById("pwdhide").className = "bold cursorpoint hide";
	});
	$("#registertabli,#headreg").click(function(){		
		document.getElementById("regimg").className = "col-md-5 pd15";
		document.getElementById("loginimg").className = "col-md-5 pd0 hide";
	});
	$("#logintabli,#headlog").click(function(){
		document.getElementById("loginimg").className = "col-md-5 pd0";
		document.getElementById("regimg").className = "col-md-5 pd15 hide";
	});
});
function getError(){ 
	return latestError; 
}
function setError(msg){ 
	return latestError = msg;
}
function setdthsp(sp){
	dthSp = sp;
}
function setdcsp(sp){
	document.getElementById("dcprepaidsp").value = sp;
}
function setPostMobsp(sp){
	document.getElementById("postpaid").checked = true;
	document.getElementById("prepostbtn").innerHTML = "Postpaid <span class='caret'></span>";
	document.getElementById("prepaidoptlist").className = "form-group hide";
	document.getElementById("normalspecial").style.display = "none";
	document.getElementById("postpaidoptlist").className = "form-group show";
	document.getElementById("postpaidsp").value = sp;
}
function setPostDCsp(sp){
	document.getElementById("datacardpostpaid").checked = true;
	document.getElementById("dcprepostbtn").innerHTML = "Postpaid <span class='caret'></span>";
	document.getElementById("dcpostpaidsp").value = sp;
	document.getElementById("dcprepaidlist").className = "form-group hide";
	document.getElementById("dcpostpaidlist").className = "form-group show";
}
function setRcdetails(mob,amt,sp,loc){
	rcMob = mob;
	rcAmt = amt;
	rcSp  = sp;
	rcLoc = loc;
}
//Function used to show prepaid and postpaid list
function showOptList(id){
	if(id === "prepaid"){
		document.getElementById("postpaidoptlist").className = "form-group hide";
		document.getElementById("prepaidoptlist").className = "form-group show";
	}else
	if(id === "postpaid"){
		document.getElementById("prepaidoptlist").className = "form-group hide";
		document.getElementById("normalspecial").style.display = "none";
		document.getElementById("postpaidoptlist").className = "form-group show";
	}else
	if(id === "datacardprepaid"){
		document.getElementById("dcprepaidlist").className = "form-group show";
		document.getElementById("dcpostpaidlist").className = "form-group hide";
	}else
	if(id === "datacardpostpaid"){
		document.getElementById("dcprepaidlist").className = "form-group hide";
		document.getElementById("dcpostpaidlist").className = "form-group show";
	}
}
//Function used to show spacial Recharge
function showspecial(sp){
	if(("BSNL" === sp)||("Tata Docomo" === sp)||("Uninor" === sp)||("Videocon" === sp)||("MTNL" === sp)){
		document.getElementById("normalspecial").style.display = "table-cell";
	}else{
		document.getElementById("normalspecial").style.display = "none";
	}
}
//Function used to show dth help
function dthhelp(sp){	
	if(sp === "Airtel Digital TV"){
		document.getElementById("dthhelpcontent").innerHTML = "Customer ID starts with 3 and it will be in 10 digits long.";
		document.getElementById("dthhelpcontent").className = "form-group prepostoption textleft fn12 show";
	}else
	if(sp === "Dish TV"){
		document.getElementById("dthhelpcontent").innerHTML = "VC number starts with 0 and it will be in 11 digits long.";
		document.getElementById("dthhelpcontent").className = "form-group prepostoption textleft fn12 show";
	}else
	if(sp === "Reliance Digital TV"){
		document.getElementById("dthhelpcontent").innerHTML = "Smart card number starts with 2 and it will be in 12 digits long.";
		document.getElementById("dthhelpcontent").className = "form-group prepostoption textleft fn12 show";
	}else
	if(sp === "Sun Direct"){
		document.getElementById("dthhelpcontent").innerHTML = "Smart card number starts with 1 or 4 and it will be in 11 digits long.";
		document.getElementById("dthhelpcontent").className = "form-group prepostoption textleft fn12 show";
	}else
	if(sp === "Tata Sky"){
		document.getElementById("dthhelpcontent").innerHTML = "Subscriber ID starts with 1 and it will be in 10 digits long";
		document.getElementById("dthhelpcontent").className = "form-group prepostoption textleft fn12 show";
	}else
	if(sp === "Videocon d2h"){
		document.getElementById("dthhelpcontent").innerHTML = "To know your ID, sms 'SMS ID' to 9212012299 from your registered mobile no.";
		document.getElementById("dthhelpcontent").className = "form-group prepostoption textleft fn12 show";
	}else{
		document.getElementById("dthhelpcontent").className = "form-group prepostoption textleft fn12 hide";
	}
}
// Function For Email Verification
function checkEmail(email){
	if(email === ""){
		return false;
	}
	if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
		return true;
	}
	return false;
}
//Function use to chaeck valid mobile number
function checkMobile(mob){
	var mobLen = mob.length;
	if(mob === ""){
		return false;
	}
	if(mob.charAt(0) === '0' || mob.charAt(0) === '1'|| mob.charAt(0) === '2' || mob.charAt(0) === '3' || mob.charAt(0) === '4' || mob.charAt(0) === '5' || mob.charAt(0) === '6'){
		return false;
	}
	if(mobLen !== 10){
		return false;
	}
	return true;
}
//Function use to chaeck valid DTH number
function checkDTHnumber(mob,sp){
	var mobLen = mob.length;
	if(mob === ""){
		return false;
	}
	if(sp === "Airtel Digital TV"){
		if(mobLen !== 10){
			return false;
		}
		if(mob.charAt(0) !== '3'){
			return false;
		}
		return true;
	}
	if(sp === "Dish TV"){
		if(mobLen !== 11){
			return false;
		}
		if(mob.charAt(0) !== '0'){
			return false;
		}
		return true;
	}
	if(sp === "Reliance Digital TV"){
		if(mobLen !== 12){
			return false;
		}
		if(mob.charAt(0) !== '2'){
			return false;
		}
		return true;
	}
	if(sp === "Sun Direct"){
		if(mobLen !== 11){
			return false;
		}
		if(mob.charAt(0) === '1' || mob.charAt(0) === '4' ){
			return true;
		}else{
			return false;
		}
		return true;
	}
	if(sp === "Tata Sky"){
		if(mobLen !== 10){
			return false;
		}
		if(mob.charAt(0) !== '1'){
			return false;
		}
		return true;
	}
	if(sp === "Videocon d2h"){
		return true;
	}
}
//Function use to chaeck valid mobile number
function checkAmount(amt){
	var amtLen = amt.length;
	var minamt = 10;
	if(amt === ""){
		return false;
	}
	if(amtLen > 4){
		return false;
	}
	if(amt.charAt(0) === '0'){
		return false;
	}
	if(amt < minamt){
		return false;
	}
	return true;
}
//Function used to fetch operator
function fetchOperator(mob){
	moblen = mob.length;
	if (moblen >= 9){
		var txfparam = "fn=fetchOperatorEX"+ "&fdata=" +encodeURI(mob);
		ajaxpost('./xcommon/bend/xutilcallbackOne.php',txfparam,fetchOperator_callback);
	}
}
function fetchOperator_callback() {
	if (xmlobject.readyState==4 || xmlobject.readyState=="complete"){
		var resptxt = xmlobject.responseText;
		if(resptxt === ""){
			return false;
		}
		var spltrslt   = resptxt.split("::",4);
		var mode = spltrslt[0];
		var sp   = spltrslt[1];
		var loc  = spltrslt[2];
		if(mode === "MOBILE"){
			setmobsploc(sp,loc);
			showTariff(sp,loc);
		}else
		if(mode === "POSTPAID"){
			setPostMobsp(sp);
		}
	}
}
//function used to select spl operator
function selectSpl_callback(){
	if (xmlobject.readyState==4 || xmlobject.readyState=="complete"){
		var resptxt = xmlobject.responseText;
		//HIK: case insensitive comparison
		if(("BSNL SPECIAL" === resptxt.toUpperCase())||("DOCOMO SPECIAL" === resptxt.toUpperCase())||("UNINOR SPECIAL" === resptxt.toUpperCase())||("VIDEOCON SPECIAL" === resptxt.toUpperCase())||("MTNL SPECIAL" === resptxt.toUpperCase())){
			document.getElementById("special").checked = true;
			document.getElementById("normalspecialbtn").innerHTML = "Special <span class='caret'></span>";		
		}else{
			document.getElementById("topup").checked = true;
			document.getElementById("normalspecialbtn").innerHTML = "Topup <span class='caret'></span>";
		}
	}
}
function setmobsploc(sp,loc){
	mobSp = sp;
	mobLoc = loc;
	document.getElementById("prepaid").checked = true;
	document.getElementById("prepostbtn").innerHTML = "Prepaid <span class='caret'></span>";
	document.getElementById("postpaidoptlist").className = "form-group hide";
	document.getElementById("prepaidoptlist").className = "form-group show";
	document.getElementById("normalspecial").style.display = "table-cell";
	
}
//Function used to show mobile tariff
function showTariff(trisp,triloc){
	if((trisp !== "") && (triloc !== "")){
		if(trisp === "Telenor"){
			trisp = "Uninor";
		}
		document.getElementById("prepaidsp").value = trisp;
		document.getElementById("location").value = triloc;

		document.getElementById("trisprov").value  = trisp;
		document.getElementById("triloc").value = triloc;	

		var tritext = trisp + " Prepaid Recharge For " + triloc;
		document.getElementById("tritext").innerHTML = tritext;
		showspecial(trisp);
		setmobsploc(trisp,triloc);
		
		urlLink = "./xcommon/bend/tariff.php";
		params = "fn=MOBTRI"+ "&op=" +trisp + "&loc=" +triloc;
		ajaxPostJQ(urlLink, params, showTariff_Callback);
	}
}
function showTariff_Callback(data){
	if(data !== ""){
		document.getElementById("tariffdata").innerHTML = data;
	}
}
//Function used to show dth tariff data
function showDTHTariff(opname){
	return;
	if(opname !== ""){	
		document.getElementById("dthsp").value = opname;
		document.getElementById("dthtrisprov").value  = opname;
		document.getElementById("location").value = "Chennai";
		var tridthtext = opname + " Recharge Plans";
		document.getElementById("tridthtext").innerHTML = tridthtext;
		dthhelp(opname);
		setdthsp(opname);
		var txfparam = "fn=DTHTRI"+ "&op=" +encodeURI(opname);
		ajaxpost('./xcommon/bend/tariff.php',txfparam,showDTHTariff_callback);
	}
}
function showDTHTariff_callback() {
	if (xmlobject.readyState==4 || xmlobject.readyState=="complete"){
		var resptxt = xmlobject.responseText;
		document.getElementById("DTHinfo").innerHTML = resptxt;
		document.getElementById("mobiletariff").className = "col-md-8 hide";
		document.getElementById("dthtariff").className = "col-md-8 show";
	}
}

//Function use to validate Recharge data
function validateRcInfo(mob,amt,sp,loc){
	var mob;
	var amt;
	var sp;
	var loc;
	var errorSts;
	
	setError("VALID");	
	if(loc === ""){
		document.getElementById("location").value = "Tamil Nadu"; 
	}
	if(activeTab === "#mob"){
		if(!checkMobile(mob)){
			document.getElementById("mobnumerror").className = "text-danger textright show";
			setError("INVALID");
		}else{
			document.getElementById("mobnumerror").className = "text-danger textright hide";
		}
		if(!checkAmount(amt)){
			document.getElementById("mobsperror").className = "text-danger textright show";
			setError("INVALID");
		}else{
			document.getElementById("mobsperror").className = "text-danger textright hide";
		}
		if(sp === ""){
			var postpaid = document.getElementById("postpaid").checked;
			if(postpaid === true){
				document.getElementById("mobpostpaiderror").className = "text-danger textright show";
			}else{
				document.getElementById("mobprepaiderror").className = "text-danger textright show";
			}
			setError("INVALID");
		}else{
			document.getElementById("mobpostpaiderror").className = "text-danger textright hide";
			document.getElementById("mobprepaiderror").className = "text-danger textright hide";
		}
		errorSts = getError();
		if(errorSts === "INVALID"){
			return false;
		}else{
			return true;
		}
	}
	if(activeTab === "#dth"){
		if(sp === ""){
			document.getElementById("dthsperror").className = "text-danger textright show";
			setError("INVALID");
		}else{
			document.getElementById("dthsperror").className = "text-danger textright hide";
		}
		if(!checkAmount(amt)){
			document.getElementById("dthamterror").className = "text-danger textright show";
			setError("INVALID");
		}else{
			document.getElementById("dthamterror").className = "text-danger textright hide";
		}
		if(!checkDTHnumber(mob,sp)){
			document.getElementById("dthnumerror").className = "text-danger textright show";
			setError("INVALID");
		}else{
			document.getElementById("dthnumerror").className = "text-danger textright hide";
		}
		errorSts = getError();
		if(errorSts === "INVALID"){
			return false;
		}else{
			return true;;
		}
	}
	if(activeTab === "#datacard"){
		var prepaid  = document.getElementById("datacardprepaid").checked;
		var postpaid = document.getElementById("datacardpostpaid").checked;
		if(prepaid === true){
			if(!checkMobile(mob)){
				document.getElementById("dcnumerror").className = "text-danger textright show";
				setError("INVALID");
			}else{
				document.getElementById("dcnumerror").className = "text-danger textright hide";
			}
		}
		if(postpaid === true){
			if(mob === ""){
				document.getElementById("dcnumerror").className = "text-danger textright show";
				setError("INVALID");			
			}else{
				document.getElementById("dcnumerror").className = "text-danger textright hide";
			}
		}
		if(!checkAmount(amt)){
			document.getElementById("dcamterror").className = "text-danger textright show";
			setError("INVALID");
		}else{
			document.getElementById("dcamterror").className = "text-danger textright hide";
		}
		if(sp === ""){
			if(postpaid === true){
				document.getElementById("dcpostpaiderror").className = "text-danger textright show";
			}else{
				document.getElementById("dcprepaiderror").className = "text-danger textright show";
			}
			setError("INVALID");
		}else{
			document.getElementById("dcpostpaiderror").className = "text-danger textright hide";
			document.getElementById("dcprepaiderror").className = "text-danger textright hide";
		}
		errorSts = getError();
		if(errorSts === "INVALID"){
			return false;
		}else{
			return true;
		}
	}
}
// Functions for ezwallet 
function SelectTriAmount(amt,mode){
	if(activeTab === "#mob"){
		document.getElementById("mobileamt").value = amt;
		document.getElementById("mobileamt").style.color = "#CC3366";
		document.getElementById("mobileamt").style.fontWeight = "bold";
		spValue = document.getElementById("prepaidsp").value;
		if(("BSNL" === spValue.toUpperCase())||("TATA DOCOMO" === spValue.toUpperCase())||("UNINOR" === spValue.toUpperCase())||("VIDEOCON" === spValue.toUpperCase())||("MTNL" === spValue.toUpperCase())){
			if(mode === "SPECIAL"){
				document.getElementById("special").checked = true;
				document.getElementById("normalspecialbtn").innerHTML = "Special <span class='caret'></span>";
			}else
			if(mode === "NORMAL"){
				document.getElementById("topup").checked = true;
				document.getElementById("normalspecialbtn").innerHTML = "Topup <span class='caret'></span>";
			}
		}else{
			document.getElementById("topup").checked = true;
			document.getElementById("normalspecialbtn").innerHTML = "Topup <span class='caret'></span>";
		}
	}
	if(activeTab === "#dth"){
		document.getElementById("dthamt").value = amt;
		document.getElementById("dthamt").style.color = "#CC3366";
		document.getElementById("dthamt").style.fontWeight = "bold";
	}	
}
//Function use to collect recharge details
function collectRcInfo(){
	var inputValue = { 
		mob:      { mobno: 'mobilenum', amt: 'mobileamt', sp: 'prepaidsp' },
		dth:      { mobno: 'dthnum', amt: 'dthamt', sp: 'dthsp' },
		datacard: { mobno: 'dcnum', amt: 'dcamt', sp: 'dcprepaidsp' },
		landline: { mobno: 'landlinenum', amt: 'landineamt', sp: 'landlinesp' }
	}
	var nohashPill = activeTab.replace("#","");
	var mobno = inputValue [ nohashPill ][ 'mobno' ];
	var amt = inputValue [ nohashPill ][ 'amt' ];
	var sp = inputValue [ nohashPill ][ 'sp' ];
	
	var mobValue = document.getElementById(mobno).value;
	var amtValue = document.getElementById(amt).value;
	var spValue = document.getElementById(sp).value;
	var locVal = document.getElementById("location").value;
	
	// For postpaid selected 
	if(nohashPill === "mob"){
		var prepaid  = document.getElementById("prepaid").checked;
		var postpaid = document.getElementById("postpaid").checked;
		if(postpaid === true){
			var spValue = document.getElementById("postpaidsp").value;
		}
	}
	if(nohashPill === "datacard"){
		var dcpostpaid = document.getElementById("datacardpostpaid").checked;
		if(dcpostpaid === true){
			var spValue = document.getElementById("dcpostpaidsp").value;
		}
	}
	// Select Special type start
	if(("BSNL" === spValue)||("Tata Docomo" === spValue)||("Uninor" === spValue)||("Videocon" === spValue)||("MTNL" === spValue)){
		spl = document.getElementById("special").checked;
		if(spl === true){
			if("BSNL" === spValue){
				spValue = "BSNL Special";
			}else
			if("Tata Docomo" === spValue){
				spValue = "Docomo Special";
			}else
			if("Uninor" === spValue){
				spValue = "Uninor Special";
			}else
			if("Videocon" === spValue){
				spValue = "Videocon Special";
			}else
			if("MTNL" === spValue){
				spValue = "MTNL Special";
			}
		}
	}
	var CanProcess = validateRcInfo(mobValue,amtValue,spValue,locVal);
	if(CanProcess === true){
		var locVal = document.getElementById("location").value;
		setRcdetails(mobValue,amtValue,spValue,locVal);
		document.getElementById("dorechargeGuest").innerHTML = "<i class='icon-spinner icon-spin'> </i> Processing...";
		
		
		urlLink = "./xcommon/fend/processnow.php";
		params = "rcmode=RECHARGE"+"&rcnum=" +mobValue + "&rcamt=" +amtValue + "&rcsp=" +spValue + "&rcloc=" +locVal;
		ajaxPostJQ(urlLink, params, CanProcess_Callback);
	}
	return false;
}
function DTHcanProcess(){
	var mobValue = document.getElementById("dthnum").value;
	var amtValue = document.getElementById("dthamt").value;
	var spValue = document.getElementById("dthsp").value;
	var locVal = "Chennai";
	activeTab = "#dth";
	var CanProcess = validateRcInfo(mobValue,amtValue,spValue,locVal);
	if(CanProcess === true){
		setRcdetails(mobValue,amtValue,spValue,locVal);
		document.getElementById("dorechargeGuest").innerHTML = "<i class='icon-spinner icon-spin'> </i> Processing...";		
		
		urlLink = "./xcommon/fend/processnow.php";
		params = "rcmode=RECHARGE"+"&rcnum=" +mobValue + "&rcamt=" +amtValue + "&rcsp=" +spValue + "&rcloc=" +locVal;
		ajaxPostJQ(urlLink, params, CanProcess_Callback);	
	}
}
function CanProcess_Callback(data){
	if(!data){
		location.reload();
		return false;
	}else
	if(data === "INVALIDINFO"){
		window.location.replace("./xuser/syserror.php?hint=CanProcess_INVALIDINFO");
		return false;
	}else
	if(data === "REQLOGIN"){
		var Rcdetails = [rcMob,rcAmt,rcSp,rcLoc];
		Rcdetails = JSON.stringify(Rcdetails);
		urlLink = "./xcommon/bend/xutilcallbackOne.php";
		params = "fn=InsertCustEnter"+ "&fdata=" +Rcdetails;
		ajaxPostJQ(urlLink, params, LogReg_Callback);
		return false;
	}
	document.getElementById("backdrop").className = "backdropflip show";
	$(".confirmrcflip").removeClass("confirmrcflip-remove");
	$(".confirmrcflip").toggleClass("confirmrcflip-change");
	document.getElementById("dorechargeGuest").innerHTML = "<i class='icon-credit-card icon-large'> </i> Recharge";
	document.getElementById("confirmrcdata").innerHTML = data; 
}
function LogReg_Callback(data){
	/*
	if(data === "SUCCESS"){
		document.getElementById("dorechargeGuest").innerHTML = "<i class='icon-credit-card icon-large'> </i>  Recharge";
		document.getElementById("regtitle").innerHTML = "Continue to place your recharge";
		document.getElementById("regcontent").innerHTML = "<div class='row' style='padding:130px 20px'><div class='col-xs-12'><a id='guestbtn' href='#Guest Button' class='btn btn-lg btn-warning btn-block bold' style='border-radius:0px;' onclick='guestContinue();'> Continue As Guest</a><p class='text-danger textcenter hide' id='guestbtnerror' style='margin-top:15px;'></p></div></div><div style='position: absolute; font-size: 17px; font-weight: bold; right: -17px; background-color: #FFFFFF; padding: 4px; top: 185px; height: 30px; width: 30px; border-radius: 50%; box-shadow: 0 0px 1px 0 rgba(0,0,0,0.26);'>Or</div>";
		$('#logreg').modal();
	}
	*/
	if(data === "SUCCESS"){
		document.getElementById("dorechargeGuest").innerHTML = "<i class='icon-credit-card icon-large'> </i>  Recharge";
		if((activeTab === "#mob") || (activeTab === "#datacard")){
			document.getElementById("regtitle").innerHTML = "Continue to place your recharge";
			document.getElementById("regcontent").innerHTML = "<div class='row' style='padding:130px 20px'><div class='col-xs-12'><a id='guestbtn' href='#Guest Button' class='btn btn-lg btn-warning btn-block bold' style='border-radius:0px;' onclick='guestContinue();'> Continue As Guest</a><p class='text-danger textcenter hide' id='guestbtnerror' style='margin-top:15px;'></p></div></div><div style='position: absolute; font-size: 17px; font-weight: bold; right: -17px; background-color: #FFFFFF; padding: 4px; top: 185px; height: 30px; width: 30px; border-radius: 50%; box-shadow: 0 0px 1px 0 rgba(0,0,0,0.26);'>Or</div>";
		}else{
			document.getElementById("regtitle").innerHTML = "Quick Register";
			document.getElementById("regcontent").innerHTML = "<table style='margin-top:35px;width:100%;'><tr><td class='textright bold'>To send your order details...<span style='color:#CC3366;white-space: nowrap;font-weight:normal;'>-----</span></td><td style='height:65px;border:1px solid #CC3366;border-right:0px;width:19px;padding:0px !important;'></td></tr><tr><td colspan='2' style='padding:32px;'></td></tr><tr><td class='textright bold'>Create your login<span style='color:#CC3366;white-space: nowrap;font-weight:normal;'>-----</span></td><td style='height:65px;border:1px solid #CC3366;border-right:0px;width:19px;padding:0px !important;'></td></tr></table>";
		}
		$('#logreg').modal();
	}
}
function getlogRegContent(){
	document.getElementById("dorechargeGuest").innerHTML = "<i class='icon-spinner icon-spin'> </i> Processing...";
	urlLink = "./xcommon/fend/processnow.php";
	params = "rcmode=GETCONTENT";
	ajaxPostJQ(urlLink, params, getlogRegContent_Callback);
}
function getlogRegContent_Callback(data){
	if(!data){
		location.reload();
		return false;
	}else
	if(data === "REQLOGIN"){
		/*
		document.getElementById("logintabli").className = "active in";
		document.getElementById("logintab").className = "tab-pane fade active in";
		document.getElementById("registertabli").className = "";
		document.getElementById("registertab").className = "tab-pane fade";
		*/
		$('#logreg').modal();
		return false;
	}
	document.getElementById("backdrop").className = "backdropflip show";
	$(".confirmrcflip").removeClass("confirmrcflip-remove");
	$(".confirmrcflip").toggleClass("confirmrcflip-change");
	document.getElementById("dorechargeGuest").innerHTML = "<i class='icon-credit-card icon-large'> </i> Recharge";
	document.getElementById("confirmrcdata").innerHTML = data; 
}
function guestContinue(){
	document.getElementById('guestbtn').innerHTML = " <i class='icon-spinner icon-spin icon-large'></i> Processing...";
	var txfparam = "MODE=GUEST";
	ajaxpost('./xcommon/bend/login.php',txfparam,guestContinue_callback);
}
function guestContinue_callback(){
	if (xmlobject.readyState==4 || xmlobject.readyState=="complete"){
		resptxt = xmlobject.responseText;
		if(resptxt === "SUCCESS"){
			location.reload();
			return false;
		}else{
			document.getElementById('guestbtnerror').innerHTML = "System Error. Please try again after refresh...";
			document.getElementById("guestbtnerror").className = "text-danger textright show";
			return false;
		}
	}
}
// used to remove order
function ChangeOrder(sid){
	document.getElementById("confirmrcdata").innerHTML = ""; 
	document.getElementById("backdrop").className = "backdropflip hide";
	$(".confirmrcflip").removeClass("confirmrcflip-change");
	$(".confirmrcflip").toggleClass("confirmrcflip-remove");

	urlLink = "./xcommon/fend/processnow.php";
	params = "rcmode=REMOVE"+"&rcdata=" +sid;
	ajaxPostJQ(urlLink, params, ChangeOrder_Callback);
}
function ChangeOrder_Callback(data){
	if(!data){
		location.reload();
		return false;
	}else
	if(data === "REQLOGIN"){
		/*
		document.getElementById("logintabli").className = "active in";
		document.getElementById("logintab").className = "tab-pane fade active in";
		document.getElementById("registertabli").className = "";
		document.getElementById("registertab").className = "tab-pane fade";
		*/
		$('#logreg').modal();
		return false;
	}else
	if(data === "SUCCESS"){
		document.getElementById("dorechargeGuest").innerHTML = "<i class='icon-credit-card icon-large'> </i> Recharge";
	}
}
/////////////////////Only for Dishtv Start/////////////////////
function DTHcanProcess(){
	var mobValue = document.getElementById("dthnum").value;
	var amtValue = document.getElementById("dthamt").value;
	var spValue = document.getElementById("dthsp").value;
	var locVal = "Chennai";
	activeTab = "#dth";
	var CanProcess = validateRcInfo(mobValue,amtValue,spValue,locVal);
	if(CanProcess === true){
		setRcdetails(mobValue,amtValue,spValue,locVal);
		document.getElementById("dorechargeGuest").innerHTML = "<i class='icon-spinner icon-spin'> </i> Processing...";		
		
		urlLink = "./xcommon/fend/processnow.php";
		params = "rcmode=RECHARGE"+"&rcnum=" +mobValue + "&rcamt=" +amtValue + "&rcsp=" +spValue + "&rcloc=" +locVal;
		ajaxPostJQ(urlLink, params, DTHcanProcess_Callback);	
	}
}
function DTHcanProcess_Callback(data){
	if(!data){
		location.reload();
		return false;
	}else
	if(data === "REQLOGIN"){
		var Rcdetails = [rcMob,rcAmt,rcSp,rcLoc];
		Rcdetails = JSON.stringify(Rcdetails);		
		urlLink = "./xcommon/bend/xutilcallbackOne.php";
		params = "fn=InsertCustEnter"+ "&fdata=" +Rcdetails;
		ajaxPostJQ(urlLink, params, DTHLogReg_Callback);
		return false;
	}
	document.getElementById("backdrop").className = "backdropflip show";
	$(".confirmrcflip").removeClass("confirmrcflip-remove");
	$(".confirmrcflip").toggleClass("confirmrcflip-change");
	document.getElementById("dorechargeGuest").innerHTML = "<i class='icon-credit-card icon-large'> </i> Recharge";
	document.getElementById("confirmrcdata").innerHTML = data; 
}
function DTHLogReg_Callback(data){
	if(data === "SUCCESS"){
		document.getElementById("dorechargeGuest").innerHTML = "<i class='icon-credit-card icon-large'> </i>  Recharge";
		/*
		document.getElementById("logintabli").className = "active in";
		document.getElementById("logintab").className = "tabecontent tab-pane fade active in";
		document.getElementById("registertabli").className = "";
		document.getElementById("registertab").className = "tabecontent tab-pane fade";
		*/
		$('#logreg').modal();
	}
}

function opname(sp){
	document.getElementById('dthsp').value = sp;
	dthhelptxt(sp);
}
//Function used to show dth help
function dthhelptxt(sp){	
	if(sp === "Airtel Digital TV"){
		document.getElementById("dthhelpcontent").innerHTML = "Customer ID starts with 3 and it will be in 10 digits long.";
		document.getElementById("dthhelpcontent").className = "helptxt textleft show";
	}else
	if(sp === "Dish TV"){
		document.getElementById("dthhelpcontent").innerHTML = "VC number starts with 0 and it will be in 11 digits long.";
		document.getElementById("dthhelpcontent").className = "helptxt textleft show";
	}else
	if(sp === "Reliance Digital TV"){
		document.getElementById("dthhelpcontent").innerHTML = "Smart card number starts with 2 and it will be in 12 digits long.";
		document.getElementById("dthhelpcontent").className = "helptxt textleft show";
	}else
	if(sp === "Sun Direct"){
		document.getElementById("dthhelpcontent").innerHTML = "Smart card number starts with 1 or 4 and it will be in 11 digits long.";
		document.getElementById("dthhelpcontent").className = "helptxt textleft show";
	}else
	if(sp === "Tata Sky"){
		document.getElementById("dthhelpcontent").innerHTML = "Subscriber ID starts with 1 and it will be in 10 digits long";
		document.getElementById("dthhelpcontent").className = "helptxt textleft show";
	}else
	if(sp === "Videocon d2h"){
		document.getElementById("dthhelpcontent").innerHTML = "To know your ID, sms 'SMS ID' to 9212012299 from your registered mobile no.";
		document.getElementById("dthhelpcontent").className = "helptxt textleft show";
	}else{
		document.getElementById("dthhelpcontent").className = "helptxt textleft hide";
	}
}
/////////////////////Only for Dishtv END/////////////////////

// Function used to add balance
function addbalance(amt,sid){
	document.getElementById("wallerror").className = "label label-default show";
	document.getElementById("wallerror").innerHTML = "<i class='icon-spinner icon-spin'> </i> Processing Request...";	
	
	urlLink = "./xcommon/fend/processnow.php";
	params = "rcmode=WALLET"+"&addAmt=" +amt+"&sid=" +sid;
	ajaxPostJQ(urlLink, params, addbalance_Callback);

}
function addbalance_Callback(data){
	if(!data){
		location.reload();
		return false;
	}else
	if(data === "INVALIDINFO"){
		window.location.replace("./xuser/syserror.php?hint=addbalance_INVALIDINFO");
		return false;
	}else
	if(data === "INVALIDAMT"){
		document.getElementById("addwalletli").className = "dropdown open";
		document.getElementById("wallerror").className = "label label-default show";
		document.getElementById("wallerror").innerHTML = "Invalid Request";	
		document.getElementById("backdrop").className = "backdropflip hide";
		$(".confirmrcflip").toggleClass("confirmrcflip-remove");
		$(".confirmrcflip").removeClass("confirmrcflip-change");
		document.getElementById("confirmrcdata").innerHTML = ""; 
		return false;
	}else
	if(data === "REQLOGIN"){
		document.getElementById("backdrop").className = "backdropflip hide";
		$(".confirmrcflip").toggleClass("confirmrcflip-remove");
		$(".confirmrcflip").removeClass("confirmrcflip-change");
		/*
		document.getElementById("logintabli").className = "active in";
		document.getElementById("logintab").className = "tab-pane fade active in";
		document.getElementById("registertabli").className = "";
		document.getElementById("registertab").className = "tab-pane fade";
		*/
		$('#logreg').modal();
		return false;
	}
	document.getElementById("wallerror").className = "label label-default hide";
	document.getElementById("addwalletli").className = "dropdown";

	document.getElementById("backdrop").className = "backdropflip show";
	$(".confirmrcflip").removeClass("confirmrcflip-remove");
	$(".confirmrcflip").toggleClass("confirmrcflip-change");
	document.getElementById("confirmrcdata").innerHTML = data; 
}
// used to connet bank
function payBank(sid,mid,mode){//HIK:DONE
	var GatewayMode;
	var BankName;
	if(mode === "NETBANK"){
		GatewayMode  = document.getElementById('netbankopt').value;
		bankOptIndex = document.getElementById('netbankopt').selectedIndex;
		BankName     = document.getElementById('netbankopt').options[bankOptIndex].text;
		if((sid === "") || (GatewayMode === "") || (BankName === "")){
			document.getElementById("neterror").className = "text-danger textcenter bold show";
			return false;
		}
		document.getElementById("neterror").className = "text-danger textcenter bold hide";		
	}else
	if(mode === "DEBIT"){
		GatewayMode  = document.getElementById('debitopt').value;
		bankOptIndex = document.getElementById('debitopt').selectedIndex;
		BankName     = document.getElementById('debitopt').options[bankOptIndex].text;
		if((sid === "") || (GatewayMode === "") || (BankName === "")){
			document.getElementById("dberror").className = "text-danger textcenter bold show";
			return false;
		}
		document.getElementById("dberror").className = "text-danger textcenter bold hide";		
	}else
	if(mode === "CREDIT"){		
		GatewayMode  = document.getElementById('creditopt').value;
		bankOptIndex = document.getElementById('creditopt').selectedIndex;
		BankName     = document.getElementById('creditopt').options[bankOptIndex].text;
		if((sid === "") || (GatewayMode === "") || (BankName === "")){
			document.getElementById("crerror").className = "text-danger textcenter bold show";
			return false;
		}
		document.getElementById("crerror").className = "text-danger textcenter bold hide";		
	}else
	if(mode === "CASH"){
		GatewayMode  = document.getElementById('cashopt').value;
		bankOptIndex = document.getElementById('cashopt').selectedIndex;
		BankName     = document.getElementById('cashopt').options[bankOptIndex].text;
		if((sid === "") || (GatewayMode === "") || (BankName === "")){
			document.getElementById("casherror").className = "text-danger textcenter bold show";
			return false;
		}
		document.getElementById("casherror").className = "text-danger textcenter bold hide";		
	}else{
		document.getElementById("neterror").className = "text-danger textcenter bold show";
		document.getElementById("dberror").className = "text-danger textcenter bold show";
		document.getElementById("crerror").className = "text-danger textcenter bold show";
		document.getElementById("casherror").className = "text-danger textcenter bold show";
		return false;
	}
	
	$('<form id="deskpay" action="./xcommon/fend/deskpay.php" method="POST" />')
	.append($('<input type="hidden" value="'+ sid +'" name="sid" id="sid">'))
	.append($('<input type="hidden" value="'+ mode +'" name="PayMode" id="PayMode" />'))
	.append($('<input type="hidden" value="'+ GatewayMode +'" name="GatewayMode" id="GatewayMode" />'))
	.append($('<input type="hidden" value="'+ BankName +'" name="BankName" id="BankName" />'))
	.appendTo($(document.body))
	.submit();
	return false;
}
function selectBank(id){
	netbankVal = document.getElementById(id).value;
	document.getElementById(netbankVal).selected = "true";
	icon = id + "icon";
	// Net banking
	document.getElementById("sbiicon").innerHTML = "<i class='icon-check-empty icon-large'></i>";
	document.getElementById("hdfcicon").innerHTML = "<i class='icon-check-empty icon-large'></i>";
	document.getElementById("iciciicon").innerHTML = "<i class='icon-check-empty icon-large'></i>";
	document.getElementById("citiicon").innerHTML = "<i class='icon-check-empty icon-large'></i>";
	document.getElementById("axisicon").innerHTML = "<i class='icon-check-empty icon-large'></i>";
	document.getElementById("pnbicon").innerHTML = "<i class='icon-check-empty icon-large'></i>";
	// Debit Card
	document.getElementById("dbmsatericon").innerHTML = "<i class='icon-check-empty icon-large'></i>";
	document.getElementById("dbvisaicon").innerHTML = "<i class='icon-check-empty icon-large'></i>";
	document.getElementById("dbmaestroicon").innerHTML = "<i class='icon-check-empty icon-large'></i>";
	document.getElementById("dbrupayicon").innerHTML = "<i class='icon-check-empty icon-large'></i>";
	// Credit Card
	document.getElementById("crmastericon").innerHTML = "<i class='icon-check-empty icon-large'></i>";
	document.getElementById("crvisaicon").innerHTML = "<i class='icon-check-empty icon-large'></i>";
	document.getElementById("crdinersicon").innerHTML = "<i class='icon-check-empty icon-large'></i>";
	document.getElementById(icon).innerHTML = "<i class='icon-check icon-large'></i>";
}
function onchangeBank(){
	// Net banking
	document.getElementById("sbiicon").innerHTML = "<i class='icon-check-empty icon-large'></i>";
	document.getElementById("hdfcicon").innerHTML = "<i class='icon-check-empty icon-large'></i>";
	document.getElementById("iciciicon").innerHTML = "<i class='icon-check-empty icon-large'></i>";
	document.getElementById("citiicon").innerHTML = "<i class='icon-check-empty icon-large'></i>";
	document.getElementById("axisicon").innerHTML = "<i class='icon-check-empty icon-large'></i>";
	document.getElementById("pnbicon").innerHTML = "<i class='icon-check-empty icon-large'></i>";
	// Debit Card
	document.getElementById("dbmsatericon").innerHTML = "<i class='icon-check-empty icon-large'></i>";
	document.getElementById("dbvisaicon").innerHTML = "<i class='icon-check-empty icon-large'></i>";
	document.getElementById("dbmaestroicon").innerHTML = "<i class='icon-check-empty icon-large'></i>";
	document.getElementById("dbrupayicon").innerHTML = "<i class='icon-check-empty icon-large'></i>";
	// Credit Card
	document.getElementById("crmastericon").innerHTML = "<i class='icon-check-empty icon-large'></i>";
	document.getElementById("crvisaicon").innerHTML = "<i class='icon-check-empty icon-large'></i>";
	document.getElementById("crdinersicon").innerHTML = "<i class='icon-check-empty icon-large'></i>";
}
//function used to redeem page.
function ProcessRedeem(sid){
	var txfparam ="redeemdata=" +encodeURI(sid);
	ajaxpost('./xcommon/fend/redeem.php',txfparam,redeem_callback);
}
function redeem_callback(){
	if (xmlobject.readyState==4 || xmlobject.readyState=="complete"){
		var resptxt = xmlobject.responseText;
		if(!resptxt){
			window.location.replace("./xuser/syserror.php?hint=RD_INV_Response");
			return false;
		}else
		if(resptxt === "INVALIDINFO"){
			window.location.replace("./xuser/syserror.php?hint=RD_INV_INFO");
			return false;
		}else
		if(resptxt === "INVALIDRD"){
			window.location.replace("./xuser/syserror.php?hint=RD_INV_RD");
			return false;
		}else
		if(resptxt === "REQLOGIN"){
			document.getElementById("backdrop").className = "backdropflip hide";
			$(".confirmrcflip").toggleClass("confirmrcflip-remove");
			$(".confirmrcflip").removeClass("confirmrcflip-change");
			/*
			document.getElementById("logintabli").className = "active in";
			document.getElementById("logintab").className = "tab-pane fade active in";
			document.getElementById("registertabli").className = "";
			document.getElementById("registertab").className = "tab-pane fade";
			*/
			$('#logreg').modal();
			return false;
		}else{
			var spltrslt   = resptxt.split("::",3);
			var sts = spltrslt[0];
			var trk = spltrslt[1];
			if(sts === "SUCCESS"){
				redeemContent = "<div class='container'><div class='row textcenter' style='padding-top:80px;'><span class='cltom'> <i class='icon-spinner icon-spin icon-3x'></i></span><p class='cltom'> Please wait... We are processing your request...</p></div> </div>";
				document.getElementById("confirmrcdata").innerHTML = redeemContent; 

				$('<form id="redeem" action="./xcommon/fend/landing.php" method="POST" />')
				.append($('<input type="hidden" value="'+ trk +'" name="trk" id="trk">'))
				.append($('<input type="hidden" value="REDEEM" name="bid" id="bid">'))
				.appendTo($(document.body))
				.submit();
				return false;
			}else{
				window.location.replace("./xuser/syserror.php?hint=RD_INV_JUNK");
				return false;
			}
		}
	}
}
//Function used to for login user
function login(){
	var mob = document.getElementById("loginmob").value;
	var pwd = document.getElementById("loginpwd").value;
	var errorSts;
	setError("VALID");	
	if(!checkMobile(mob)){
		document.getElementById("loginmoberror").className = "text-danger textright show";
		setError("INVALID");
	}else{
		document.getElementById("loginmoberror").className = "text-danger textright hide";
	}
	if(pwd === ""){
		document.getElementById("loginpwderror").className = "text-danger textright show";
		setError("INVALID");
	}else{
		document.getElementById("loginpwderror").className = "text-danger textright hide";
	}
	errorSts = getError();
	if(errorSts === "INVALID"){
		return false;
	}else{		
		document.getElementById('loginpwderror').innerHTML = " <i class='icon-spinner icon-spin icon-large'></i> Please Wait Processing Your Request...";
		document.getElementById("loginpwderror").className = "text-success show";
		var txfparam = "lognmobno=" +encodeURI(mob)+ "&lognpwd=" +encodeURI(pwd);
		ajaxpost('./xcommon/bend/login.php',txfparam,login_callback);
	}
}
function login_callback(){
	if (xmlobject.readyState==4 || xmlobject.readyState=="complete"){
		resptxt = xmlobject.responseText;
		if(resptxt === "SUCCESS"){
			location.reload();
			return false;
		}else
		if(resptxt === "FAILED"){
			document.getElementById('loginpwderror').innerHTML = "Invalid Credentials. Please try again...";
			document.getElementById("loginpwderror").className = "text-danger textright show";
			return false;
		}else
		if(resptxt === "BLOCKED"){
			window.location.replace("./xcommon/fend/mblock.php");
			return false;
		}else{
			document.getElementById('loginpwderror').innerHTML = "System Error. Please try again after refresh...";
			document.getElementById("loginpwderror").className = "text-danger textright show";
			return false;
		}
	}
}
//Function used to for Register
function register(){
	var name  = document.getElementById("regname").value;
	var email = document.getElementById("regemail").value;
	var mob   = document.getElementById("regmob").value;
	var pwd   = document.getElementById("regpwd").value;
	
	var pwdLen = pwd.length;
	var errorSts;
	setError("VALID");
	if(name === ""){
		document.getElementById("regnameerror").className = "text-danger textright show";
		setError("INVALID");
	}else{
		document.getElementById("regnameerror").className = "text-danger textright hide";
	}
	if(!checkEmail(email)){
		document.getElementById("regemailerror").className = "text-danger textright show";
		setError("INVALID");
	}else{
		document.getElementById("regemailerror").className = "text-danger textright hide";
	}	
	if(!checkMobile(mob)){
		document.getElementById("regmoberror").className = "text-danger textright show";
		setError("INVALID");
	}else{
		document.getElementById("regmoberror").className = "text-danger textright hide";
	}
	if(pwd === ""){
		document.getElementById("regpwderror").className = "text-danger textright show";
		setError("INVALID");
	}else{
		document.getElementById("regpwderror").className = "text-danger textright hide";
	}
	if(pwdLen < 6){
		document.getElementById("regpwderror").innerHTML = "Password should be minimum 6 character";
		document.getElementById("regpwderror").className = "text-danger textright show";
		setError("INVALID");
	}else{
		document.getElementById("regpwderror").className = "text-danger textright hide";
	}
	errorSts = getError();
	if(errorSts === "INVALID"){
		return false;
	}else{
		document.getElementById("regpwderror").className = "text-danger textright show";
		document.getElementById('regpwderror').innerHTML = " <i class='icon-spinner icon-spin icon-large'></i> Please Wait Processing Your Request...";
		var txfparam = "regnam=" +encodeURI(name)+ "&regeml=" +encodeURI(email)+ "&regmob=" +encodeURI(mob)+ "&regpwd=" +encodeURI(pwd);
		ajaxpost('./xcommon/bend/register.php',txfparam,register_callback);		
	}
}
function register_callback() {
	if (xmlobject.readyState==4 || xmlobject.readyState=="complete"){
		resptxt = xmlobject.responseText;
		if(resptxt === "EXIST"){
			document.getElementById('regpwderror').innerHTML = "Account already exist... Please use forgot password option";
			document.getElementById("regpwderror").className = "text-danger textright show";
			return false;
		}else
		if(resptxt === "SUCCESS"){
			location.reload();
			return false;
		}else
		if(resptxt === "FAILED"){
			document.getElementById('regpwderror').innerHTML = "Invalid Credentials. Please try again...";
			document.getElementById("regpwderror").className = "text-danger textright show";
			return false;
		}else
		if(resptxt === "BLOCKED"){
			window.location.replace("./xcommon/fend/mblock.php");
			return false;
		}else{
			document.getElementById('regpwderror').innerHTML = "System Error. Please try again after refresh...";
			document.getElementById("regpwderror").className = "text-danger textright show";			
		}
	}
}