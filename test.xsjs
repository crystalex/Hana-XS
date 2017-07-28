/*var getDBData = $.import("sap.plc.trainning.I313572", "testlib").myResult;
var getnewDBData = $.import("sap.plc.trainning.I313572", "testlib").newResult;

/*$.response.setBody(getDBData());
$.response.contentType = "text/plain"; */

/*$.response.setBody(getnewDBData());
$.response.contentType = "text/plain"; */

/*
*Not Working Insert
$.response.contentType = "application/json"; 
$.response.status = 200;
$.response.contentType = "text/plain";


//Implementation of GET call
function fnHandleGet() {
    return {"myResult":"success"};
}

//Implementation of PUT call
function fnHandlePut() {
    return {"myStatus":"success"};
}

try {
    switch ( $.request.method ) {
        //Handle your GET calls here
        case $.net.http.GET:
            $.response.setBody(JSON.stringify(fnHandleGet()));
            break;
        //Handle your PUT calls here
        case $.net.http.PUT:
            $.response.setBody(JSON.stringify(fnHandlePut()));
            break;            
        default:
            break;
    }
} catch (err) {
    $.response.setBody("Failed to execute action: " + err.toString());
}
*/

//Implementation of GET call
/*
function fnHandleGet() {
    return $.import("sap.plc.trainning.I313572", "testlib").newResult();
}

//Implementation of PUT call
function fnHandlePut() {
    return ("No put method");
}
function fnHandlePost() {
    return $.import("sap.plc.trainning.I313572", "testlib").postdbdata($.request.body);
}

try {
    switch ( $.request.method ) {
        //Handle your GET calls here
        case $.net.http.GET:
            $.response.setBody(fnHandleGet());
            break;
        //Handle your PUT calls here
        case $.net.http.PUT:
            $.response.status = 405;
            $.response.setBody(fnHandlePut());
            break;      
        case $.net.http.POST:
            $.response.setBody(fnHandlePost());
            break;    
        default:
            break;
    }
} catch (err) {
    $.response.setBody("Failed to execute action: " + err.toString());
} */
/**working Insert */
$.response.contentType = "text/plain";
// $.response.status = 200;

var connection = $.hdb.getConnection();

//Implementation of GET call
function fnHandleGet() {
	$.response.status = 200;
	return {
		"myResult": "success"
	};
}

//Implementation of POST call
function fnHandlePost() {
	$.response.status = 200;

	var jsonData = JSON.parse($.request.body.asString());
	for (var i = 0; i < jsonData.length; i++) {
		var company = jsonData[i];

		var sql = "INSERT INTO \"SAP_PLC\".\"sap.plc.trainning.I313572::I313572.t_company_I313572\" VALUES (?,?,?)";
		var rs = connection.executeUpdate(sql, company.COMPANY_ID, company.COMPANY_NAME, company.COMPANY_DESCRIPTION);
	}

	connection.commit();
	return {
		"myResult": "success"
	};
}

//Implementation of PUT call
function fnHandlePut() {
	$.response.status = 400;
	return {
		"myStatus": "not allowed"
	};
}

//Implementation of other calls
function fnHandleOthers() {
	$.response.status = 400;
	return {
		"myStatus": "not allowed others than GET call"
	};
}

try {
	switch ($.request.method) {
		//Handle your GET calls here
		case $.net.http.GET:
			var ress = $.import("sap.plc.trainning.I313572", "testlib").newResult;
			$.response.setBody(ress());
			break;

			//Handle your PUT calls here
		case $.net.http.PUT:
			$.response.setBody(JSON.stringify(fnHandlePut()));
			break;

			//Handle your POST calls here
		case $.net.http.POST:
			$.response.setBody(JSON.stringify(fnHandlePost()));
			break;

		default:
			$.response.setBody(JSON.stringify(fnHandleOthers()));
			break;
	}
} catch (err) {
	$.response.setBody("Failed to execute action: " + err.toString());
}