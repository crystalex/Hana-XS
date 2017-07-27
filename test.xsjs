var getDBData = $.import("sap.plc.trainning.I313572", "testlib").myResult;

$.response.setBody(getDBData());
$.response.contentType = "text/plain"; 