$(document).ajaxComplete(function (event, jqXHR, ajaxOptions) {
    if (ajaxOptions.url.indexOf("admin_create_contract") != -1 && ajaxOptions.type == "POST") submit();
});

function updateUrl(url) {
    return url.replace(/\.\/modules/gim, "https://www.fwlatrust.com/eFWLA/modules");
}

function updateImage(image) {
    return image.replace(/\.\/images\/icons/gim, "../Sources");
}

function afterRequest(resource, type, callback) {
    $(document).ajaxComplete(function (event, jqXHR, ajaxOptions) {
        if (ajaxOptions.url.indexOf(resource) != -1 && ajaxOptions.type == type) {
            if (jqXHR.responseText != undefined) {
                var $element = $("<div/>").append($($.parseHTML(jqXHR.responseText.toString())));
                $element.find("a").each(function () { $(this).attr("href", updateUrl($(this).attr("href"))); });
                $element.find("img").each(function () { $(this).attr("src", updateImage($(this).attr("src"))); });
            }
            if (callback != null && typeof callback == "function") callback();
        }
    });
}

var step1 = function () {
    $("#CBond").val("SJNFBA11Z2200602");
    $("#CBondValue").val("25,000.00");
    $("#TContractID").val("01");
    $("#WarrantyID").val("0101");
    $("#CDateStart").val("2018-06-04");
    $("#CDateEnd").val("2025-06-04");
    $("#CPayStart").val("2018-07-10");
    $("#CDisbursementDate").val("2018-06-20");
    $("[name='CPayDay']").val("10");
    $("#CContractType").val("P");
    $(".open1.nextbutton").click();
    //$("#BankID").val("");
    $("#CBankSignerA").val("LIZBETH GRIMALDO");
    $("#CBankSignerAID").val("GERENTE DE SUCURSAL");
    $("#CBankSignerB").val("FLORENCIA MARTINEZ");
    $("#CBankSignerBID").val("SUB GERENTE DE SUCURSAL");
    $("#CAssetValue").val("23,500.00");
    $("#CMonthlyPayment").val("300.00");
    $("#CInterestRate").val("5.75");
    $("#CEffectiveRate").val("5.83");
    //$("#CClosingCommission").val("");
    //$("#CClosingRate").val("");
    //$("#CPostalFee").val("");
    //$("#CNotary").val("");
    $("#CCommission").val("0.00");
    //$("#CFees").val("");
    $("#CAgency").val("19");
    //$("#CReseller").val("");
    $("#CPayPromise").val("18(100-01)355");
    //$("#CAAmount").val("");
    $("#CBeneficiary").val("Juan Perez");
    $("#CBeneficiaryTID").val("C");
    $("#CBeneficiaryID").val("8-879-465");
    $("#CGuarantee").val("01");
    $("#CGuaranteedAmount").val("20,000.00");
    //$("[name='formBack0']").val("");
    $(".open2.nextbutton").click();
    $("#CLegalID").val("8-310-78");
    $("#getuser").click();
    afterRequest("check_customer", "GET", step2);
};

var step2 = function () {
    $("#CCustomerType").val("Fideicomitente");
    //$("#CLegalType").val("");
    //$("#CLegalName").val("");
    //$("#CCommercialName").val("");
    //$("#CLegalRep").val("");
    //$("#CLegalRT").val("");
    //$("#CLegalRID").val("");
    //$("#CSex").val("");
    //$("#CCitizenship").val("");
    //$("#CLanguage").val("");
    //$("#COccupation").val("");
    //$("#CProvince").val("");
    //$("#CDistrict").val("");
    //$("#CCorregiment").val("");
    //$("#CStreet").val("");
    //$("#CPostalAddress").val("");
    //$("#CEmail").val("");
    //$("#CPhoneH").val("");
    //$("#CPhoneHa").val("");
    //$("#CPhoneO").val("");
    //$("#CPhoneOa").val("");
    //$("#CMobile").val("");
    //$("#CMobilea").val("");
    //$("#CAnpyme").val("");
    //$("#addCustomer").val("");
    //$("[name='formBack0']").val("");
    $(".open3.nextbutton").click();
    $("#MaVin").val("SJNFBA11Z2201603");
    $("#getcar").click();
    afterRequest("check_moveable_vin", "GET", step3);
};

var step3 = function () {
    //$("#MaBrand").val("");
    //$("#MaModel").val("");
    //$("#MaYear").val("");
    //$("#MaValue").val("");
    //$("#MaEngineN").val("");
    //$("#MaColor").val("");
    //$("#MaMunicipality").val("");
    //$("#MaCapacity").val("");
    //$("#MaVehicleType").val("");
    //$("#MaType").val("");
    //$("#MaComments").val("");
    //$("#PType").val("");
    //$("#MaTable").val("");
    //$("#addCar").val("");
    //$("[name='formBack0']").val("");
    $("#cSubmitA").click();
    afterRequest("admin_create_contract", "POST", submit);
    //$("#MaEVin").val("");
    //$("#MaEBrand").val("");
    //$("#MaEModel").val("");
    //$("#MaEYear").val("");
    //$("#MaEValue").val("");
    //$("#MaEEngineN").val("");
    //$("#MaEComments").val("");
    //$("#PTypeE").val("");
    //$("#MaTable").val("");
    //$("#addEquipment").val("");
    //$("[name='formBack0']").val("");
    //$("#cSubmitE").val("");
    //$("#Finca").val("");
    //$("#Tomo").val("");
    //$("#Rollo").val("");
    //$("#Asiento").val("");
    //$("#Folio").val("");
    //$("#Documento").val("");
    //$("#CUbicacion").val("");
    //$("#NIT").val("");
    //$("#PValue").val("");
    //$("#PropertyComments").val("");
    //$("#MpTable").val("");
    //$("#addProperty").val("");
    //$("[name='formBack0']").val("");
    //$("#cSubmitP").val("");
    //$("#AccountNumber").val("");
    //$("#AccountType").val("");
    //$("#AccountBank").val("");
    //$("#AccountAmount").val("");
    //$("#AccountBalance").val("");
    //$("#AccountComments").val("");
    //$("#MdTable").val("");
    //$("#addDeposit").val("");
    //$("[name='formBack0']").val("");
    //$("#cSubmitD").val("");
    //$("#OtherNumber").val("");
    //$("#OtherType").val("");
    //$("#OtherQty").val("");
    //$("#OtherAmount").val("");
    //$("#OtherComments").val("");
    //$("#MoTable").val("");
    //$("#addOther").val("");
    //$("[name='formBack0']").val("");
    //$("#cSubmitO").val("");
    //$("#InvestNumber").val("");
    //$("#InvestType").val("");
    //$("#InvestIssuer").val("");
    //$("#InvestQty").val("");
    //$("#InvestEmitedDate").val("");
    //$("#InvestExpiryDate").val("");
    //$("#InvestAmount").val("");
    //$("#InvestComments").val("");
    //$("#MiTable").val("");
    //$("#addInvestment").val("");
    //$("[name='formBack0']").val("");
    //$("#cSubmitI").val("");
    //$("#MM_insert").val("");
    //$("#UsrCreated").val("");
};

var submit = function () {
    $("#altgrid").find("a").each(function () {
        $(this).attr("href", updateUrl($(this).attr("href")));
    });
    $("#altgrid").find("img").each(function () {
        $(this).attr("src", updateImage($(this).attr("src")));
    });
};

function workflowRpa() {
    step1();
}

$(document).ajaxComplete(function (event, jqXHR, ajaxOptions) {
    if (ajaxOptions.url.indexOf("check_customer") != -1 && ajaxOptions.type == "GET") {
        var response = false;
        try {
            response = eval(jqXHR.responseText);
        }
        catch (e) {
            response = true;
        }
        $("#ui-id-3").prepend("<div id='CheckCustomerResponse'><p id='CheckCustomerResponse-Message'>The customer search was done</p><p id='CheckCustomerResponse-Result'>" + (response ? "CUSTOMER_FOUND" : "NO_CUSTOMER_FOUND") + "</p></div>");
    }
});

$("#addCustomer").click(function () {
    if ($("#mlgform").valid()) {
        $(document).ajaxComplete(function (event, jqXHR, ajaxOptions) {
            if (ajaxOptions.url.indexOf("admin_add_customer") != -1 && ajaxOptions.type == "POST") {
                var response = false;
                try {
                    response = eval(jqXHR.responseText);
                }
                catch (e) {
                    response = true;
                }
                $("#ui-id-3").prepend("<div id='AddCustomerResponse'><p id='AddCustomerResponse-Message'>The customer creation was done</p><p id='AddCustomerResponse-Result'>" + (response ? "CUSTOMER_CREATED" : "NO_CUSTOMER_CREATED") + "</p></div>");
            }
        });
    }
    else {
        $("#ui-id-3").prepend("<div id='AddCustomerResponse'><p id='AddCustomerResponse-Message'>The customer creation was done</p><p id='AddCustomerResponse-Result'>NO_CUSTOMER_CREATED</p></div>");
    }
});

$(document).ajaxComplete(function (event, jqXHR, ajaxOptions) {
    if (ajaxOptions.url.indexOf("check_moveable_vin") != -1 && ajaxOptions.type == "GET") {
        var response = false;
        try {
            response = jqXHR.responseJSON != undefined && jqXHR.responseJSON.response != undefined && jqXHR.responseJSON.response === "Favor llenar los datos del bien.";
        }
        catch (e) {
            response = false;
        }
        $("#ui-id-4").prepend("<div id='CheckCarResponse'><p id='CheckCarResponse-Message'>The car search was done</p><p id='CheckCarResponse-Result'>" + (response ? "NO_CAR_FOUND" : "CAR_FOUND") + "</p></div>");
    }
});

$(document).ajaxComplete(function (event, jqXHR, ajaxOptions) {
    if (ajaxOptions.url.indexOf("admin_add_moveable") != -1 && ajaxOptions.type == "POST") {
        var response = false;
        try {
            response = eval(jqXHR.responseText);
        }
        catch (e) {
            response = true;
        }
        $("#ui-id-4").prepend("<div id='AddCarResponse'><p id='AddCarResponse-Message'>The car creation was done</p><p id='AddCarResponse-Result'>" + (response ? "CAR_CREATED" : "NO_CAR_CREATED") + "</p></div>");
    }
});
