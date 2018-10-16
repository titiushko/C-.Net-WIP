﻿function workflowRpa(step) {
    switch (step) {
        case 1:
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
            break;
        case 2:
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
            break;
        case 3:
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
            afterSubmitForm();
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
            break;
    }
}

function afterSubmitForm() {
    $(document).ajaxComplete(function (event, jqXHR, ajaxOptions) {
        if (ajaxOptions.url.indexOf("admin_create_contract.php") != -1 && ajaxOptions.type == "POST") {
            $("#altgrid").find("a").each(function () {
                $(this).attr("href", updateUrl($(this).attr("href")));
            });
            $("#altgrid").find("img").each(function () {
                $(this).attr("src", updateImage($(this).attr("src")));
            });
        }
    });
}

function getAllFileds() {
    var fields = "";
    $("#mlgform").find(":input").each(function () {
        //console.log($(this).find(":input"));
        var $field = $(this);
        if ($field.hasClass("nextbutton")) {
            fields += "$(\"." + $field.attr("class").replace(/ /g, ".") + "\").click();\n";
        }
        else if ($field.attr("id") != null && $field.attr("id") != "") {
            fields += "$(\"#" + $field.attr("id") + "\").val(\"\");\n";
        }
        else if ($field.attr("name") != null && $field.attr("name") != "") {
            fields += "$(\"[name='" + $field.attr("name") + "']\").val(\"\");\n";
        }
    });
    console.log(fields);
}

function updateUrl(url) {
    return url.replace(/\.\/modules/gim, "https://www.fwlatrust.com/eFWLA/modules");
}

function updateImage(image) {
    return image.replace(/\.\/images\/icons/gim, "../Sources");
}