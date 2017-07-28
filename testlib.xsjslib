function myResult() {
	try {
		var connection = $.hdb.getConnection();
		var query = 'select * from "SAP_PLC"."sap.plc.trainning.I313572::I313572.t_company_I313572" ';

		var rs = connection.executeQuery(query);

		var result = "";
		for (var row in rs) {
			result += `ID=${rs[row].COMPANY_ID} Value=${rs[row].COMPANY_NAME} Descr = ${rs[row].COMPANY_DESCRIPTION}\n`;
		}
		connection.close();
	} catch (e) {
		result = e.toString();
	}

    return result;
} 

function newResult() {
    try {
        var newConnection = $.hdb.getConnection();
        
        var myProc = newConnection.loadProcedure("SAP_PLC", "sap.plc.trainning.I313572::getCompany_I313572");
        var nouResult =  myProc(':');
        return JSON.stringify(nouResult);
        newConnection.close();
	} catch (e) {
		nouResult = e.toString();
    }
    return nouResult;
}

function postdbdata() {


}



