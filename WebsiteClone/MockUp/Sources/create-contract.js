﻿function correctFromExternalRequest(text) {
    text = updateUrl(text);
    text = updateImage(text);
    return text;
}

$(function () {
    switch ($('#TContractID').val()) {
        case '01':
            $("#EDateLabel").html("de Emisión");
            $("#PDateLabel").html("de Primer Pago");
            $("#DDateLabel").html("de Desembolso");
            $("#CAssetLabel").html("Valor Actual del Bien");
            $("#CVariableLabel,#CCommissionLabel,#CCRateabel,#CAgencyLabel,#CAAmountLabel,#CPayPromiseLabel,#CBeneficiaryLabel,#CBeneficiaryTIDLabel,#CBeneficiaryIDLabel").show();
            break;
        case '02':
            $("#EDateLabel").html("de Inscripción");
            $("#PDateLabel").html("de Solicitud de Protocolo");
            $("#DDateLabel").html("de Desembolso");
            $("#CAssetLabel").html("Valor Actual del Inmueble");
            $("#CVariableLabel,#CCommissionLabel,#CCRateabel,#CAgencyLabel,#CAAmountLabel,#CPayPromiseLabel,#CBeneficiaryLabel,#CBeneficiaryTIDLabel,#CBeneficiaryIDLabel,").hide();
            break;
        case '04':
            $("#EDateLabel").html("de Emisión");
            $("#PDateLabel").html("de Primer Pago");
            $("#DDateLabel").html("de Desembolso");
            $("#CAssetLabel").html("Saldo Inicial del Depósito");
            $("#CVariableLabel,#CCommissionLabel,#CCRateabel,#CAgencyLabel,#CAAmountLabel,#CPayPromiseLabel,#CBeneficiaryLabel,#CBeneficiaryTIDLabel,#CBeneficiaryIDLabel").hide();
            break;
        case '03':
            $("#EDateLabel").html("de Emisión");
            $("#PDateLabel").html("de Primer Pago");
            $("#DDateLabel").html("de Desembolso");
            $("#CAssetLabel").html("Valor Actual del Bien");
            $("#CVariableLabel,#CCommissionLabel,#CCRateabel,#CAgencyLabel,#CAAmountLabel,#CPayPromiseLabel,#CBeneficiaryLabel,#CBeneficiaryTIDLabel,#CBeneficiaryIDLabel").hide();
            break;
    }

    $('#TContractID').change(function () {
        switch ($('#TContractID').val()) {
            case '01':
                $("#EDateLabel").html("de Emisión");
                $("#PDateLabel").html("de Primer Pago");
                $("#DDateLabel").html("de Desembolso");
                $("#CAssetLabel").html("Valor Actual del Bien");
                $("#CVariableLabel,#CCommissionLabel,#CCRateabel,#CAgencyLabel,#CAAmountLabel,#CPayPromiseLabel,#CBeneficiaryLabel,#CBeneficiaryTIDLabel,#CBeneficiaryIDLabel,#authorized").show();
                break;
            case '02':
                $("#EDateLabel").html("de Inscripción");
                $("#PDateLabel").html("de Solicitud de Protocolo");
                $("#DDateLabel").html("de Desembolso");
                $("#CAssetLabel").html("Valor Actual del Inmueble");
                $("#CVariableLabel,#CCommissionLabel,#CCRateabel,#CAgencyLabel,#CAAmountLabel,#CPayPromiseLabel,#CBeneficiaryLabel,#CBeneficiaryTIDLabel,#CBeneficiaryIDLabel,#empower,#authorized").hide();
                break;
            case '04':
                $("#EDateLabel").html("de Emisión");
                $("#PDateLabel").html("de Primer Pago");
                $("#DDateLabel").html("de Desembolso");
                $("#CAssetLabel").html("Saldo Inicial del Depósito");
                $("#CVariableLabel,#CCommissionLabel,#CCRateabel,#CAgencyLabel,#CAAmountLabel,#CPayPromiseLabel,#CBeneficiaryLabel,#CBeneficiaryTIDLabel,#CBeneficiaryIDLabel,#empower,#authorized").hide();
                break;
            case '03':
                $("#EDateLabel").html("de Emisión");
                $("#PDateLabel").html("de Primer Pago");
                $("#DDateLabel").html("de Desembolso");
                $("#CAssetLabel").html("Valor Actual del Bien");
                $("#CVariableLabel,#CCommissionLabel,#CCRateabel,#CAgencyLabel,#CAAmountLabel,#CPayPromiseLabel,#CBeneficiaryLabel,#CBeneficiaryTIDLabel,#CBeneficiaryIDLabel,#empower,#authorized").hide();
                break;
            default:
                $("#EDateLabel").html("");
                $("#PDateLabel").html("");
                $("#DDateLabel").html("");
                break;
        };
    })

    var accordion = $("#stepForm").accordion({
        collapsible: true,
        heightStyle: "content"
    });
    $("#stepForm h3").unbind("click");
    var current = 0;

    // back buttons do not need to run validation
    $(".prevbutton0").click(function () {
        accordion.accordion("option", "active", 0);
        current = 1;
    });
    $(".prevbutton1").click(function () {
        accordion.accordion("option", "active", 1);
        current = 2;
    });
    $(".prevbutton2").click(function () {
        accordion.accordion("option", "active", 2);
        current = 3;
    });
    $(".prevbutton3").click(function () {
        accordion.accordion("option", "active", 3);
        current = 4;
    });
    // these buttons all run the validation, overridden by specific targets above

    $(".open1").click(function () {
        if (true/*$('#mlgform').valid()*/) {
            $("div.error").hide();
            switch ($('#WarrantyID').val()) {
                case "0101":
                case "0102":
                case "0103":
                case "0104":
                    switch ($('#BankID').val()) {
                        case "02":
                            $('#CCommission').val(0.00).attr('readonly', 'readonly');
                            $('#CFees').val(176.55).attr('readonly', 'readonly');
                            $('#empower').html('<tr><td>Firma Autorizada 1</td><td><input name="CBankSignerA" type="text" id="CBankSignerA" size="25"></td></tr><tr><td>Identificación 1</td><td><input name="CBankSignerAID" type="text" id="CBankSignerAID" size="10"></td></tr>');
                            $('#authorized').html('<tr><td>Firma Autorizada 2</td><td><input name="CBankSignerB" type="text" id="CBankSignerB" size="25"></td></tr><tr><td>Identificación 2</td><td><input name="CBankSignerBID" type="text" id="CBankSignerBID" size="10"></td></tr><tr><td>Firma Autorizada 3</td><td><input name="CBankSignerC" type="text" id="CBankSignerC" size="25"></td></tr><tr><td>Identificación 3</td><td><input name="CBankSignerCID" type="text" id="CBankSignerCID" size="10"></td></tr>');
                            break;
                        case "06":
                            switch ($('#CContractType').val()) {
                                case "P":
                                case "C":
                                    $('#CCommission').val(3.21).attr('readonly', 'readonly');
                                    $('#CFees').val(187.25).attr('readonly', 'readonly');
                                    break;
                                case "E":
                                    $('#CCommission').val(2.68).attr('readonly', 'readonly');
                                    $('#CFees').val(160.50).attr('readonly', 'readonly');
                                    break;
                            }
                            $('#empower').html('<tr><td>Firma Autorizada Contrato</td><td><select name="CBankSignerA" id="CBankSignerA"><option value="" selected>Seleccione el Apoderado</option><option value="OLIMPO ARIEL QUINTERO BECERRA">Olimpo Ariel Quintero Becerra</option><option value="MELISSA EUGENIA URRIOLA DE COHEN">Melissa Eugenia Urriola de Cohen</option></select><input type="hidden" name="CBankSignerAID" id="CBankSignerAID"><input type="hidden" name="CBankSignerASex" id="CBankSignerASex"><input type="hidden" name="CBankSignerAStatus" id="CBankSignerAStatus"><input type="hidden" name="CBankSignerAPosition" id="CBankSignerAPosition"></td></tr>');
                            $('#authorized').html('<tr><td>Firma Autorizada 2</td><td><input name="CBankSignerB" type="text" id="CBankSignerB" size="25"></td></tr><tr><td>Identificación 2</td><td><input name="CBankSignerBID" type="text" id="CBankSignerBID" size="10"></td></tr><tr><td>Firma Autorizada 3</td><td><input name="CBankSignerC" type="text" id="CBankSignerC" size="25"></td></tr><tr><td>Identificación 3</td><td><input name="CBankSignerCID" type="text" id="CBankSignerCID" size="10"></td></tr>');
                            break;
                        case "41":
                            $('#CCommission').val(0.00);
                            $('#CFees').val(187.25);
                            $('#empower').html('<tr><td>Firma Autorizada 1</td><td><input name="CBankSignerA" type="text" id="CBankSignerA" size="25"></td></tr><tr><td>Identificación 1</td><td><input name="CBankSignerAID" type="text" id="CBankSignerAID" size="10"></td></tr>');
                            break;
                        case "10":
                            $('#CCommission').val(1.30).attr('readonly', 'readonly');
                            $('#CFees').val(149.80).attr('readonly', 'readonly');
                            $('#empower').html('<tr><td>Firma Autorizada 1</td><td><input name="CBankSignerA" type="text" id="CBankSignerA" size="25"></td></tr><tr><td>Identificación 1</td><td><input name="CBankSignerAID" type="text" id="CBankSignerAID" size="10"></td></tr>');
                            $('#authorized').html('<tr><td>Firma Autorizada 2</td><td><input name="CBankSignerB" type="text" id="CBankSignerB" size="25"></td></tr><tr><td>Identificación 2</td><td><input name="CBankSignerBID" type="text" id="CBankSignerBID" size="10"></td></tr><tr><td>Firma Autorizada 3</td><td><input name="CBankSignerC" type="text" id="CBankSignerC" size="25"></td></tr><tr><td>Identificación 3</td><td><input name="CBankSignerCID" type="text" id="CBankSignerCID" size="10"></td></tr>');
                            break;
                        case "23":
                        case "55":
                            $('#CCommission').val(1.50).attr('readonly', 'readonly');
                            $('#CFees').val(139.10).attr('readonly', 'readonly');
                            $('#empower').html('<tr><td>Firma Autorizada 1</td><td><input name="CBankSignerA" type="text" id="CBankSignerA" size="25"></td></tr><tr><td>Identificación 1</td><td><input name="CBankSignerAID" type="text" id="CBankSignerAID" size="10"></td></tr>');
                            $('#authorized').html('<tr><td>Firma Autorizada 2</td><td><input name="CBankSignerB" type="text" id="CBankSignerB" size="25"></td></tr><tr><td>Identificación 2</td><td><input name="CBankSignerBID" type="text" id="CBankSignerBID" size="10"></td></tr><tr><td>Firma Autorizada 3</td><td><input name="CBankSignerC" type="text" id="CBankSignerC" size="25"></td></tr><tr><td>Identificación 3</td><td><input name="CBankSignerCID" type="text" id="CBankSignerCID" size="10"></td></tr>');
                            break;
                        case "20":
                        case "34":
                        case "43":
                            $('#CCommission').val(1.50).attr('readonly', 'readonly');
                            $('#CFees').val(176.55).attr('readonly', 'readonly');
                            $('#empower').html('<tr><td>Firma Autorizada 1</td><td><input name="CBankSignerA" type="text" id="CBankSignerA" size="25"></td></tr><tr><td>Identificación 1</td><td><input name="CBankSignerAID" type="text" id="CBankSignerAID" size="10"></td></tr>');
                            $('#authorized').html('<tr><td>Firma Autorizada 2</td><td><input name="CBankSignerB" type="text" id="CBankSignerB" size="25"></td></tr><tr><td>Identificación 2</td><td><input name="CBankSignerBID" type="text" id="CBankSignerBID" size="10"></td></tr><tr><td>Firma Autorizada 3</td><td><input name="CBankSignerC" type="text" id="CBankSignerC" size="25"></td></tr><tr><td>Identificación 3</td><td><input name="CBankSignerCID" type="text" id="CBankSignerCID" size="10"></td></tr>');
                            break;
                        case "46":
                            $('#CCommission').val(2.00).attr('readonly', 'readonly');
                            $('#CFees').val(171.20).attr('readonly', 'readonly');
                            $('#empower').html('<tr><td>Firma Autorizada 1</td><td><input name="CBankSignerA" type="text" id="CBankSignerA" size="25"></td></tr><tr><td>Identificación 1</td><td><input name="CBankSignerAID" type="text" id="CBankSignerAID" size="10"></td></tr>');
                            $('#authorized').html('<tr><td>Firma Autorizada 2</td><td><input name="CBankSignerB" type="text" id="CBankSignerB" size="25"></td></tr><tr><td>Identificación 2</td><td><input name="CBankSignerBID" type="text" id="CBankSignerBID" size="10"></td></tr><tr><td>Firma Autorizada 3</td><td><input name="CBankSignerC" type="text" id="CBankSignerC" size="25"></td></tr><tr><td>Identificación 3</td><td><input name="CBankSignerCID" type="text" id="CBankSignerCID" size="10"></td></tr>');
                            break;
                        case "53":
                        case "62":
                            $('#CCommission').val(2.00).attr('readonly', 'readonly');
                            $('#CFees').val(176.55).attr('readonly', 'readonly');
                            $('#empower').html('<tr><td>Firma Autorizada 1</td><td><input name="CBankSignerA" type="text" id="CBankSignerA" size="25"></td></tr><tr><td>Identificación 1</td><td><input name="CBankSignerAID" type="text" id="CBankSignerAID" size="10"></td></tr>');
                            $('#authorized').html('<tr><td>Firma Autorizada 2</td><td><input name="CBankSignerB" type="text" id="CBankSignerB" size="25"></td></tr><tr><td>Identificación 2</td><td><input name="CBankSignerBID" type="text" id="CBankSignerBID" size="10"></td></tr><tr><td>Firma Autorizada 3</td><td><input name="CBankSignerC" type="text" id="CBankSignerC" size="25"></td></tr><tr><td>Identificación 3</td><td><input name="CBankSignerCID" type="text" id="CBankSignerCID" size="10"></td></tr>');
                            break;
                        case "54":
                            $('#CCommission').val(2.00).attr('readonly', 'readonly');
                            $('#CFees').val(187.25).attr('readonly', 'readonly');
                            $('#empower').html('<tr><td>Firma Autorizada 1</td><td><input name="CBankSignerA" type="text" id="CBankSignerA" size="25"></td></tr><tr><td>Identificación 1</td><td><input name="CBankSignerAID" type="text" id="CBankSignerAID" size="10"></td></tr>');
                            $('#authorized').html('<tr><td>Firma Autorizada 2</td><td><input name="CBankSignerB" type="text" id="CBankSignerB" size="25"></td></tr><tr><td>Identificación 2</td><td><input name="CBankSignerBID" type="text" id="CBankSignerBID" size="10"></td></tr><tr><td>Firma Autorizada 3</td><td><input name="CBankSignerC" type="text" id="CBankSignerC" size="25"></td></tr><tr><td>Identificación 3</td><td><input name="CBankSignerCID" type="text" id="CBankSignerCID" size="10"></td></tr>');
                            break;
                        case "60":
                            $('#CCommission').val(2.00).attr('readonly', 'readonly');
                            $('#CFees').val(197.95).attr('readonly', 'readonly');
                            $('#empower').html('<tr><td>Firma Autorizada 1</td><td><input name="CBankSignerA" type="text" id="CBankSignerA" size="25"></td></tr><tr><td>Identificación 1</td><td><input name="CBankSignerAID" type="text" id="CBankSignerAID" size="10"></td></tr>');
                            $('#authorized').html('<tr><td>Firma Autorizada 2</td><td><input name="CBankSignerB" type="text" id="CBankSignerB" size="25"></td></tr><tr><td>Identificación 2</td><td><input name="CBankSignerBID" type="text" id="CBankSignerBID" size="10"></td></tr><tr><td>Firma Autorizada 3</td><td><input name="CBankSignerC" type="text" id="CBankSignerC" size="25"></td></tr><tr><td>Identificación 3</td><td><input name="CBankSignerCID" type="text" id="CBankSignerCID" size="10"></td></tr>');
                            break;
                        case "32":
                            $('#CCommission').val(2.50).attr('readonly', 'readonly');
                            $('#CFees').val(187.25).attr('readonly', 'readonly');
                            $('#empower').html('<tr><td>Firma Autorizada 1</td><td><input name="CBankSignerA" type="text" id="CBankSignerA" size="25"></td></tr><tr><td>Identificación 1</td><td><input name="CBankSignerAID" type="text" id="CBankSignerAID" size="10"></td></tr>');
                            $('#authorized').html('<tr><td>Firma Autorizada 2</td><td><input name="CBankSignerB" type="text" id="CBankSignerB" size="25"></td></tr><tr><td>Identificación 2</td><td><input name="CBankSignerBID" type="text" id="CBankSignerBID" size="10"></td></tr><tr><td>Firma Autorizada 3</td><td><input name="CBankSignerC" type="text" id="CBankSignerC" size="25"></td></tr><tr><td>Identificación 3</td><td><input name="CBankSignerCID" type="text" id="CBankSignerCID" size="10"></td></tr>');
                            break;
                        case "07":
                            $('#CCommission').val(3.00).attr('readonly', 'readonly');
                            $('#CFees').val(160.50).attr('readonly', 'readonly');
                            $('#empower').html('<tr><td>Firma Autorizada 1</td><td><input name="CBankSignerA" type="text" id="CBankSignerA" size="25"></td></tr><tr><td>Identificación 1</td><td><input name="CBankSignerAID" type="text" id="CBankSignerAID" size="10"></td></tr>');
                            $('#authorized').html('<tr><td>Firma Autorizada 2</td><td><input name="CBankSignerB" type="text" id="CBankSignerB" size="25"></td></tr><tr><td>Identificación 2</td><td><input name="CBankSignerBID" type="text" id="CBankSignerBID" size="10"></td></tr><tr><td>Firma Autorizada 3</td><td><input name="CBankSignerC" type="text" id="CBankSignerC" size="25"></td></tr><tr><td>Identificación 3</td><td><input name="CBankSignerCID" type="text" id="CBankSignerCID" size="10"></td></tr>');
                            break;
                        case "33":
                        case "38":
                        case "69":
                            $('#CCommission').val(3.00).attr('readonly', 'readonly');
                            $('#CFees').val(176.55).attr('readonly', 'readonly');
                            $('#empower').html('<tr><td>Firma Autorizada 1</td><td><input name="CBankSignerA" type="text" id="CBankSignerA" size="25"></td></tr><tr><td>Identificación 1</td><td><input name="CBankSignerAID" type="text" id="CBankSignerAID" size="10"></td></tr>');
                            $('#authorized').html('<tr><td>Firma Autorizada 2</td><td><input name="CBankSignerB" type="text" id="CBankSignerB" size="25"></td></tr><tr><td>Identificación 2</td><td><input name="CBankSignerBID" type="text" id="CBankSignerBID" size="10"></td></tr><tr><td>Firma Autorizada 3</td><td><input name="CBankSignerC" type="text" id="CBankSignerC" size="25"></td></tr><tr><td>Identificación 3</td><td><input name="CBankSignerCID" type="text" id="CBankSignerCID" size="10"></td></tr>');
                            break;
                        case "49":
                        case "70":
                        case "73":
                        case "77":
                        case "78":
                        case "79":
                        case "82":
                        case "83":
                        case "84":
                        case "89":
                        case "95":
                            $('#CCommission').val(3.00).attr('readonly', 'readonly');
                            $('#CFees').val(187.25).attr('readonly', 'readonly');
                            $('#empower').html('<tr><td>Firma Autorizada 1</td><td><input name="CBankSignerA" type="text" id="CBankSignerA" size="25"></td></tr><tr><td>Identificación 1</td><td><input name="CBankSignerAID" type="text" id="CBankSignerAID" size="10"></td></tr>');
                            $('#authorized').html('<tr><td>Firma Autorizada 2</td><td><input name="CBankSignerB" type="text" id="CBankSignerB" size="25"></td></tr><tr><td>Identificación 2</td><td><input name="CBankSignerBID" type="text" id="CBankSignerBID" size="10"></td></tr><tr><td>Firma Autorizada 3</td><td><input name="CBankSignerC" type="text" id="CBankSignerC" size="25"></td></tr><tr><td>Identificación 3</td><td><input name="CBankSignerCID" type="text" id="CBankSignerCID" size="10"></td></tr>');
                            break;
                        case "74":
                            $('#CCommission').val(3.00).attr('readonly', 'readonly');
                            $('#CFees').val(187.25).attr('readonly', 'readonly');
                            $('#empower').html('<tr><td>Firma Autorizada Contrato</td><td><select name="CBankSignerA" id="CBankSignerA"><option value="" selected>Seleccione el Apoderado</option><option value="ANGELA JOSEFINA VILLASMIL MARQUEZ">Angela Josefina Villasmil Márquez</option><option value="SANTOS ALONSO RAMOS">Santos Alonso Ramos</option><option value="DANIEL OBLITAS TEJADA">Daniel Oblitas Tejada</option><option value="MAYRA LONDOÑO CASTILLERO">Mayra Londoño Castillero</option><option value="KIRA ODERAY GARDELLINI ESCOBAR">Kira Oderay Gardellini Escobar</option><option value="MARCO ANTONIO FORERO PEREZ">Marco Antonio Forero Pérez</option></select><input type="hidden" name="CBankSignerAID" id="CBankSignerAID"><input type="hidden" name="CBankSignerAIDType" id="CBankSignerAIDType"><input type="hidden" name="CBankSignerASex" id="CBankSignerASex"><input type="hidden" name="CBankSignerAStatus" id="CBankSignerAStatus"><input type="hidden" name="CBankSignerAPosition" id="CBankSignerAPosition"><input type="hidden" name="CBankSignerACitizenship" id="CBankSignerACitizenship"></td></tr>');
                            $('#authorized').html('<tr><td>Firma Autorizada 2</td><td><input name="CBankSignerB" type="text" id="CBankSignerB" size="25"></td></tr><tr><td>Identificación 2</td><td><input name="CBankSignerBID" type="text" id="CBankSignerBID" size="10"></td></tr><tr><td>Firma Autorizada 3</td><td><input name="CBankSignerC" type="text" id="CBankSignerC" size="25"></td></tr><tr><td>Identificación 3</td><td><input name="CBankSignerCID" type="text" id="CBankSignerCID" size="10"></td></tr>');
                            break;
                        case "92":
                            $('#CCommission').val(3.00).attr('readonly', 'readonly');
                            $('#CFees').val(187.25).attr('readonly', 'readonly');
                            $('#empower').html('<tr><td>Firma Autorizada Contrato</td><td><select name="CBankSignerA" id="CBankSignerA"><option value="" selected>Seleccione el Apoderado</option><option value="BRITTANIA AMAYA">Brittania Amaya</option><option value="KATHERINA HOWARD">Katherina Howard</option><option value="RAMON MARCELINO">Ramón Marcelino</option><option value="ALEXANDRA CRISTINA CALIXTO DE VELASCO">Alexandra Cristina Calixto de Velasco</option><option value="SILVIA LEE">Silvia Lee</option><option value="YADILIA PINO OLIVE">Yadilia Pino Olive</option><option value="SONYA BELINDA MUÑOZ HUGHES">Sonya Belinda Muñoz Hughes</option><option value="GICELA NACARI TEJADA DE VACA">Gicela Nacari Tejada de Vaca</option><option value="IRAIZA ARGELIS ACHON BALLESTERO">Iraiza Argelis Achon Ballestero</option></select><input type="hidden" name="CBankSignerAID" id="CBankSignerAID"><input type="hidden" name="CBankSignerAIDType" id="CBankSignerAIDType"><input type="hidden" name="CBankSignerASex" id="CBankSignerASex"><input type="hidden" name="CBankSignerAStatus" id="CBankSignerAStatus"><input type="hidden" name="CBankSignerAPosition" id="CBankSignerAPosition"><input type="hidden" name="CBankSignerACitizenship" id="CBankSignerACitizenship"></td></tr>');
                            $('#authorized').html('<tr><td>Firma Autorizada B</td><td><select name="CBankSignerB" id="CBankSignerB"><option value="" selected>Seleccione el Firmante B</option><option value="FARAH ORTEGA">Farah Ortega</option><option value="JUAN ISAZA">Juan Isaza</option><option value="GONZALO GUTIERREZ">Gonzalo Gutiérrez</option><option value="KATHIUSKA MUÑOZ">Kathiuska Muñoz</option><option value="LAUSANNE GUTIERREZ">Lausanne Gutiérrez</option><option value="YURISSA SERRACIN">Yurissa Serracín</option><option value="SERGIO MITRE">Sergio Mitre</option><option value="PAOLA MATUTE">Paola Matute</option><option value="NELSON VANEGAS">Nelson Vanegas</option><option value="LUIS RIOS">Luis Ríos</option><option value="CESAR ENRIQUE BURGOS AVILA">César Enrique Burgos Avila</option><option value="SILVIA LEE MORENO">Silvia Lee Moreno</option><option value="EMANUEL DE JESUS RODRIGUEZ HERRERA">Emanuel De Jesús Rodríguez Herrera</option><option value="YVONNE ESTER ELLIOTT BENITEZ">Yvonne Ester Elliott BenÍtez</option><option value="LILIA ESTHER ARROCHA ARAUZ">Lilia Esther Arrocha AraÚz</option><option value="LORIELA RAMOS DELGADO">Loriela Ramos Delgado</option><option value="JORGE GONZALEZ PEREZ">Jorge González Pérez</option><option value="Dionisia Luna Cedeño">Dionisia Luna Cedeño</option><option value="KATINA PEREZ">Katina Pérez</option><option value="JONATHAN LARA">Jonathan Lara</option><option value="VICTOR AGRAZAL">Victor Agrazal</option><option value="CARMEN CASTILLO">Carmen Castillo</option><option value="LENIA DUMASA">Lenia Dumasa</option></select></td></tr><tr><td>Identificación B</td><td><input name="CBankSignerBID" type="text" id="CBankSignerBID" size="10" readonly></td></tr><tr><td>Firma Autorizada C</td><td><select name="CBankSignerC" id="CBankSignerC"><option value="" selected>Seleccione el Firmante C</option><option value="FARAH ORTEGA">Farah Ortega</option><option value="JUAN ISAZA">Juan Isaza</option><option value="GONZALO GUTIERREZ">Gonzalo Gutiérrez</option><option value="KATHIUSKA MUÑOZ">Kathiuska Muñoz</option><option value="LAUSANNE GUTIERREZ">Lausanne Gutiérrez</option><option value="YURISSA SERRACIN">Yurissa Serracín</option><option value="SERGIO MITRE">Sergio Mitre</option><option value="PAOLA MATUTE">Paola Matute</option><option value="NELSON VANEGAS">Nelson Vanegas</option><option value="LUIS RIOS">Luis Ríos</option><option value="CESAR ENRIQUE BURGOS AVILA">César Enrique Burgos Avila</option><option value="SILVIA LEE MORENO">Silvia Lee Moreno</option><option value="EMANUEL DE JESUS RODRIGUEZ HERRERA">Emanuel De Jesús Rodríguez Herrera</option><option value="YVONNE ESTER ELLIOTT BENITEZ">Yvonne Ester Elliott BenÍtez</option><option value="LILIA ESTHER ARROCHA ARAUZ">Lilia Esther Arrocha AraÚz</option><option value="LORIELA RAMOS DELGADO">Loriela Ramos Delgado</option><option value="JORGE GONZALEZ PEREZ">Jorge González Pérez</option><option value="Dionisia Luna Cedeño">Dionisia Luna Cedeño</option><option value="KATINA PEREZ">Katina Pérez</option><option value="JONATHAN LARA">Jonathan Lara</option><option value="VICTOR AGRAZAL">Victor Agrazal</option><option value="CARMEN CASTILLO">Carmen Castillo</option><option value="LENIA DUMASA">Lenia Dumasa</option></select></td></tr><tr><td>Identificación C</td><td><input name="CBankSignerCID" type="text" id="CBankSignerCID" size="10" readonly></td></tr>');
                            break;
                        case "59":
                            $('#CCommission').val(3.00).attr('readonly', 'readonly');
                            $('#CFees').val(203.30).attr('readonly', 'readonly');
                            $('#empower').html('<tr><td>Firma Autorizada 1</td><td><input name="CBankSignerA" type="text" id="CBankSignerA" size="25"></td></tr><tr><td>Identificación 1</td><td><input name="CBankSignerAID" type="text" id="CBankSignerAID" size="10"></td></tr>');
                            $('#authorized').html('<tr><td>Firma Autorizada 2</td><td><input name="CBankSignerB" type="text" id="CBankSignerB" size="25"></td></tr><tr><td>Identificación 2</td><td><input name="CBankSignerBID" type="text" id="CBankSignerBID" size="10"></td></tr><tr><td>Firma Autorizada 3</td><td><input name="CBankSignerC" type="text" id="CBankSignerC" size="25"></td></tr><tr><td>Identificación 3</td><td><input name="CBankSignerCID" type="text" id="CBankSignerCID" size="10"></td></tr>');
                            break;
                        case "63":
                            $('#CCommission').val(3.00).attr('readonly', 'readonly');
                            $('#CFees').val(181.90).attr('readonly', 'readonly');
                            $('#empower').html('<tr><td>Firma Autorizada 1</td><td><input name="CBankSignerA" type="text" id="CBankSignerA" size="25"></td></tr><tr><td>Identificación 1</td><td><input name="CBankSignerAID" type="text" id="CBankSignerAID" size="10"></td></tr>');
                            $('#authorized').html('<tr><td>Firma Autorizada 2</td><td><input name="CBankSignerB" type="text" id="CBankSignerB" size="25"></td></tr><tr><td>Identificación 2</td><td><input name="CBankSignerBID" type="text" id="CBankSignerBID" size="10"></td></tr><tr><td>Firma Autorizada 3</td><td><input name="CBankSignerC" type="text" id="CBankSignerC" size="25"></td></tr><tr><td>Identificación 3</td><td><input name="CBankSignerCID" type="text" id="CBankSignerCID" size="10"></td></tr>');
                            break;
                        case "65":
                            $('#CCommission').val(3.00).attr('readonly', 'readonly');
                            $('#CFees').val(192.60).attr('readonly', 'readonly');
                            $('#empower').html('<tr><td>Firma Autorizada 1</td><td><input name="CBankSignerA" type="text" id="CBankSignerA" size="25"></td></tr><tr><td>Identificación 1</td><td><input name="CBankSignerAID" type="text" id="CBankSignerAID" size="10"></td></tr>');
                            $('#authorized').html('<tr><td>Firma Autorizada 2</td><td><input name="CBankSignerB" type="text" id="CBankSignerB" size="25"></td></tr><tr><td>Identificación 2</td><td><input name="CBankSignerBID" type="text" id="CBankSignerBID" size="10"></td></tr><tr><td>Firma Autorizada 3</td><td><input name="CBankSignerC" type="text" id="CBankSignerC" size="25"></td></tr><tr><td>Identificación 3</td><td><input name="CBankSignerCID" type="text" id="CBankSignerCID" size="10"></td></tr>');
                            break;
                        case "81":
                            $('#CCommission').val(4.00).attr('readonly', 'readonly');
                            $('#CFees').val(214.00).attr('readonly', 'readonly');
                            $('#empower').html('<tr><td>Firma Autorizada 1</td><td><input name="CBankSignerA" type="text" id="CBankSignerA" size="25"></td></tr><tr><td>Identificación 1</td><td><input name="CBankSignerAID" type="text" id="CBankSignerAID" size="10"></td></tr>');
                            $('#authorized').html('<tr><td>Firma Autorizada 2</td><td><input name="CBankSignerB" type="text" id="CBankSignerB" size="25"></td></tr><tr><td>Identificación 2</td><td><input name="CBankSignerBID" type="text" id="CBankSignerBID" size="10"></td></tr><tr><td>Firma Autorizada 3</td><td><input name="CBankSignerC" type="text" id="CBankSignerC" size="25"></td></tr><tr><td>Identificación 3</td><td><input name="CBankSignerCID" type="text" id="CBankSignerCID" size="10"></td></tr>');
                            break;
                        case "61":
                            $('#CCommission').val(3.00).attr('readonly', 'readonly');
                            $('#CFees').val(187.25).attr('readonly', 'readonly');
                            $('#empower').html('<tr><td>Firma Autorizada 1</td><td><input name="CBankSignerA" type="text" id="CBankSignerA" size="25"></td></tr><tr><td>Identificación 1</td><td><input name="CBankSignerAID" type="text" id="CBankSignerAID" size="10"></td></tr>');
                            $('#authorized').html('<tr><td>Firma Autorizada 2</td><td><input name="CBankSignerB" type="text" id="CBankSignerB" size="25"></td></tr><tr><td>Identificación 2</td><td><input name="CBankSignerBID" type="text" id="CBankSignerBID" size="10"></td></tr><tr><td>Firma Autorizada 3</td><td><input name="CBankSignerC" type="text" id="CBankSignerC" size="25"></td></tr><tr><td>Identificación 3</td><td><input name="CBankSignerCID" type="text" id="CBankSignerCID" size="10"></td></tr>');
                            $('#lifeins').html('<tr><td>Póliza de Vida</td><td><select name="CInsurer" id="CInsurer" class="required"><option value="" selected>Seleccione la Póliza de Vida</option><option value="DENTRO DEL COLECTIVO DEL BANCO">Dentro del Colectivo del Banco</option><option value="ENDOSADA A FAVOR DE BUSA">Endosada a favor de BUSA</option></select></td></tr>');
                            $('#autoins').html('<tr><td>Seguro de Auto</td><td><select name="CAssesor" id="CAssesor" class="required"><option value="" selected>Seleccione el Seguro de Auto</option><option value="DENTRO DEL COLECTIVO DEL BANCO">Dentro del Colectivo del Banco</option><option value="ENDOSADA A FAVOR DE BUSA">Endosada a favor de BUSA</option></select></td></tr>');
                            break;
                        case "97":
                            $('#CCommission').val(3.00).attr('readonly', 'readonly');
                            $('#CFees').val(187.25).attr('readonly', 'readonly');
                            $('#empower').html('<tr><td>Firma Autorizada Contrato</td><td><select name="CBankSignerA" id="CBankSignerA"><option value="" selected>Seleccione el Apoderado</option><option value="BELKYS MAYKELYS HIDALGO REYES">Belkys Maykelys Hidalgo Reyes</option><option value="CARLA VACA RICO">Carla Vaca Rico</option><option value="EDUARDO ALBERTO IRIBARREN RENDON">Eduardo Alberto Iribarren Rendón</option><option value="EDMUNDO JAVIER IBAÑEZ TEJERINA">Edmundo Javier Ibañez Tejerina</option><option value="IRIABELL IANAITH RODRIGUEZ SANDOVAL">Iriabell Ianaith Rodríguez Sandoval</option><option value="KIRIA YANETH ADAMES MIRANDA">Kiria Yaneth Adames Miranda</option><option value="MILEIBY EDITH FRAGOZA MARQUEZ">Mileiby Edith Fragoza Márquez</option><option value="OMAR XAVIER GONZALEZ ARCIA">Omar Xavier González Arcia</option><option value="YOEL JOSE ROSALES UMBRIA">Yoel José Rosales Umbria</option><option value="VIELSA MAGALIS DOMINGUEZ CAMAÑO">Vielsa Magalis Domínguez Camaño</option></select><input type="hidden" name="CBankSignerAID" id="CBankSignerAID"><input type="hidden" name="CBankSignerAIDType" id="CBankSignerAIDType"><input type="hidden" name="CBankSignerASex" id="CBankSignerASex"><input type="hidden" name="CBankSignerAStatus" id="CBankSignerAStatus"><input type="hidden" name="CBankSignerAPosition" id="CBankSignerAPosition"><input type="hidden" name="CBankSignerACitizenship" id="CBankSignerACitizenship"></td></tr>');
                            $('#authorized').html('<tr><td>Firma Autorizada Promesa</td><td><select name="CBankSignerB" id="CBankSignerB"><option value="" selected>Seleccione el Firmante de Carta</option><option value="ARLINE VANESSA VALDERRAMA ARROCHA">Arline Vanessa Valderrama Arrocha</option><option value="ESTEFANY ESCOBAR">Estefany Escobar</option></select></td></tr>');
                            break;
                        case "115":
                            $('#CCommission').val(3.00).attr('readonly', 'readonly');
                            $('#CFees').val(187.25).attr('readonly', 'readonly');
                            $('#empower').html('<tr><td>Firma Autorizada Contrato</td><td><select name="CBankSignerA" id="CBankSignerA"><option value="" selected>Seleccione el Apoderado</option><option value="GUADALUPE M. FREIJEDO">Guadalupe M. Freijedo</option><option value="LUIS CARLOS DIAZ MARMOLEJO">Luis Carlos Diaz Marmolejo</option></select><input type="hidden" name="CBankSignerAID" id="CBankSignerAID"><input type="hidden" name="CBankSignerAIDType" id="CBankSignerAIDType"><input type="hidden" name="CBankSignerASex" id="CBankSignerASex"><input type="hidden" name="CBankSignerAStatus" id="CBankSignerAStatus"><input type="hidden" name="CBankSignerAPosition" id="CBankSignerAPosition"><input type="hidden" name="CBankSignerACitizenship" id="CBankSignerACitizenship"></td></tr>');
                            $('#authorized').html('<tr><td>Firma Autorizada Cartas</td><td><select name="CBankSignerB" id="CBankSignerB"><option value="" selected>Seleccione el Firmante de Cartas</option><option value="PRISCILA M. GONZALEZ">Priscila M. González</option><option value="LUIS CARLOS DIAZ M.">Luis Carlos Díaz M.</option></select></td></tr>');
                            break;
                        default:
                            $('#CCommission').val(0.00).removeAttr('readonly');
                            $('#CFees').val('').removeAttr('readonly');
                            $('#insurerN').show();
                            $('#insurerU').hide();
                            $('#empower').html('<tr><td>Firma Autorizada 1</td><td><input name="CBankSignerA" type="text" id="CBankSignerA" size="25"></td></tr><tr><td>Identificación 1</td><td><input name="CBankSignerAID" type="text" id="CBankSignerAID" size="10"></td></tr>');
                            $('#authorized').html('<tr><td>Firma Autorizada 2</td><td><input name="CBankSignerB" type="text" id="CBankSignerB" size="25"></td></tr><tr><td>Identificación 2</td><td><input name="CBankSignerBID" type="text" id="CBankSignerBID" size="10"></td></tr><tr><td>Firma Autorizada 3</td><td><input name="CBankSignerC" type="text" id="CBankSignerC" size="25"></td></tr><tr><td>Identificación 3</td><td><input name="CBankSignerCID" type="text" id="CBankSignerCID" size="10"></td></tr>');
                            $('#lifeins').html('<tr><td>Poliza de Vida</td><td><input name="CInsurer" type="text" id="CInsurer" size="25"></td></tr>');
                            $('#autoins').html('<tr><td>Seguro del Auto</td><td><input name="CAssessor" type="text" id="CAssessor" size="25"></td></tr>');
                            break;
                    }
                    break;
                default:
                    $('#CCommission').val(0.00);
                    break;
            }
            accordion.accordion("option", "active", 1);
            current = 0;
        }
    });
    $(".open2").click(function () {
        if ($('#mlgform').valid()) {
            $("div.error").hide();
            accordion.accordion("option", "active", 2);
            current = 1;
        }
    });
    $(".open3").click(function () {
        if ($('#mlgform').valid()) {
            if ($('select[name="CCustomerType[]"]').val() != 'Fideicomitente') {
                alert("El primer cliente debe ser el fideicomitente siempre");
                return false;
            }
            $("div.error").hide();
            switch ($('#WarrantyID').val()) {
                case "0101":
                case "0102":
                case "0103":
                case "0104":
                case "0105":
                    $('#auto').show();
                    $('#equipo').hide();
                    $('#inmueble').hide();
                    $('#deposito').hide();
                    $('#otros').hide();
                    break;
                case "0106":
                case "0107":
                case "0108":
                case "0109":
                    $('#auto').hide();
                    $('#equipo').show();
                    $('#inmueble').hide();
                    $('#deposito').hide();
                    $('#otros').hide();
                    break;
                case "0201":
                case "0202":
                case "0203":
                case "0204":
                case "0205":
                case "0206":
                    $('#auto').hide();
                    $('#equipo').hide();
                    $('#inmueble').show();
                    $('#deposito').hide();
                    $('#otros').hide();
                    break;
                case "0401":
                case "0402":
                case "0403":
                    $('#auto').hide();
                    $('#equipo').hide();
                    $('#inmueble').hide();
                    $('#deposito').show();
                    $('#otros').hide();
                    break;
                case "0301":
                case "0302":
                case "0303":
                case "0304":
                case "0305":
                case "0306":
                case "0307":
                    $('#auto').hide();
                    $('#equipo').hide();
                    $('#inmueble').hide();
                    $('#deposito').hide();
                    $('#otros').show();
                    break;
            }
            accordion.accordion("option", "active", 3);
            current = 2;
        }
    });
    $(".open4").click(function () {
        if ($('#mlgform').valid()) {
            $("div.error").hide();
            accordion.accordion("option", "active", 4);
            current = 3;
        }
    });

    $("#getuser").click(function () {
        $("#CustInfo").hide();
        if ($('#mlgform').valid()) {
            $.ajax({
                type: "GET",
                //url: "https://www.fwlatrust.com/eFWLA/modules/check_customer.php",
                url: BASE_URL + "eFWLA/check_customer",
                data: {
                    CLegalID: $("#CLegalID").val(),
                    UserBank: '88'
                }
            })
             .done(function (msg) {
                 if (msg != "false") {
                     $("#CLegalID").val("");
                     var trid = $(msg).attr('id');
                     var container = $("#CustomerCart").html();
                     if (container.indexOf('id="' + trid + '"') > -1) {
                         alert("Este Cliente ya fue seleccionado para este contrato.");
                     } else {
                         $("#CustomerCart").append(correctFromExternalRequest(msg)).show();
                         $("a[rel^='prettyPhoto']").prettyPhoto({
                             theme: 'facebook',
                             social_tools: false
                         });
                     }
                     if ($('#CustomerCart').css('display') == 'none') {
                         $('#CustomerCart').show();
                     }
                     $("#CLegalID").removeClass("required");
                     $("#NextButtons3").show();
                     //workflowRpa(2);
                 } else {
                     $('#CustInfo').children().find('input[type=text],select,textarea').each(function () {
                         $(this).val('');
                         if ($("#BankID").val() == '61') {
                             $("#CEmail").addClass("required");
                         }
                     });
                     $("#CustInfo").show();
                 }
             });
        }
    });

    $("#addCustomer").click(function () {
        if ($('#mlgform').valid()) {
            $("#CustInfo").fadeOut(1000);
            $.ajax({
                type: "POST",
                //url: "https://www.fwlatrust.com/eFWLA/modules/admin_add_customer.php",
                url: BASE_URL + "eFWLA/admin_add_customer",
                data: {
                    CLegalID: $("#CLegalID").val(),
                    CLegalType: $("#CLegalType").val(),
                    CLegalName: $("#CLegalName").val(),
                    CCommercialName: $("#CCommercialName").val(),
                    CCustType: $("#CCustType").val(),
                    CLegalRep: $("#CLegalRep").val(),
                    CLegalRT: $("#CLegalRT").val(),
                    CLegalRID: $("#CLegalRID").val(),
                    CCitizenship: $("#CCitizenship").val(),
                    CSex: $("#CSex").val(),
                    COccupation: $("#COccupation").val(),
                    CProvince: $("#CProvince").val(),
                    CDistrict: $("#CDistrict").val(),
                    CCorregiment: $("#CCorregiment").val(),
                    CStreet: $("#CStreet").val(),
                    CPostalAddress: $("#CPostalAddress").val(),
                    CEmail: $("#CEmail").val(),
                    CPhoneH: $("#CPhoneH").val(),
                    CPhoneHa: $("#CPhoneHa").val(),
                    CPhoneO: $("#CPhoneO").val(),
                    CPhoneOa: $("#CPhoneOa").val(),
                    CMobile: $("#CMobile").val(),
                    CMobilea: $("#CMobilea").val(),
                    MM_insert: $("#MM_insert").val(),
                    UsrCreated: $("#UsrCreated").val()
                }
            })
             .done(function (result) {
                 if (result != "false") {
                     $("#CustomerCart").append(correctFromExternalRequest(result)).show();
                     $("a[rel^='prettyPhoto']").prettyPhoto({
                         theme: 'facebook',
                         social_tools: false
                     });
                     $("#CLegalID").removeClass("required");
                     $('#CustInfo').children().find('input[type=text],select,textarea').each(function () {
                         $(this).val('');
                     });
                     $("#NextButtons3").show();
                 } else {
                     alert("Hubo un problema al guardar el cliente, intente nuevamente");
                 }
             });
        }
    });

    $('#CCustType').on('change', function () {
        switch ($(this).val()) {
            case 'N':
                $('#CLegalType').prop('selectedIndex', 0);
                $("#CLegalType option[value='C']").removeAttr('disabled');
                $("#CLegalType option[value='E']").removeAttr('disabled');
                $("#CLegalType option[value='P']").removeAttr('disabled');
                $("#CLegalType option[value='R']").attr('disabled', 'disabled')
                $('#CustCN').hide();
                $('#CustR').hide();
                $('#CustT').hide();
                $('#CustRI').hide();
                $('#Sexo').show();
                $('#CustCit').show();
                break;
            case 'J':
                $('#CLegalType').prop('selectedIndex', 0);
                $("#CLegalType option[value='C']").attr('disabled', 'disabled');
                $("#CLegalType option[value='E']").attr('disabled', 'disabled');
                $("#CLegalType option[value='P']").attr('disabled', 'disabled');
                $("#CLegalType option[value='R']").removeAttr('disabled');
                $('#CustCN').show();
                $('#CustR').show();
                $('#CustT').show();
                $('#CustRI').show();
                $('#Sexo').show();
                $('#CustCit').show();
                break;
            default:
                $('#CLegalType').prop('selectedIndex', 0);
                $("#CLegalType option[value='C']").removeAttr('disabled');
                $("#CLegalType option[value='E']").removeAttr('disabled');
                $("#CLegalType option[value='P']").removeAttr('disabled');
                $("#CLegalType option[value='R']").removeAttr('disabled');
                $('#CustCN').hide();
                $('#CustR').hide();
                $('#CustT').hide();
                $('#CustRI').hide();
                $('#Sexo').show();
                $('#CustCit').show();
                break;
        }
    });

    $("#CLegalType").change(function () {
        if ($(this).val() == "C") {
            $("#CCitizenship").val(22);
            $("#CRLang").hide();
            $("#CLanguage").removeClass("required").attr('checked', false);
        } else {
            $('#CCitizenship').prop('selectedIndex', 0);
            $("#CRLang").hide();
            $("#CLanguage").removeClass("required").attr('checked', false);
        }
    });

    $("#CAgency").change(function () {
        if ($(this).val() == "31") {
            $("#resell").show();
            $("#CReseller").addClass('required');
        } else {
            $('#resell').hide();
            $("#CReseller").removeClass('required');
        }
    });

    $("#CCitizenship").change(function () {
        var NSCountries = new Array('17', '18', '19', '20', '21', '22', '23', '24', '25', '28', '29', '30', '32', '33', '34', '36', '37', '39', '40', '69');
        if ($.inArray($(this).val(), NSCountries) == -1) {
            $("#CRLang").show();
            $("#CLanguage").addClass("required");
        } else {
            $("#CRLang").hide();
            $("#CLanguage").removeClass("required").attr('checked', false);
        }
    });

    /*$('#CBondValue,#CMonthlyPayment,#CInterestRate,#CEffectiveRate,#CClosingCommission,#CCommission,#CFees,#MaValue,#PValue,#AccountAmount,#InvestAmount,#CAAmount,#CPostalFee,#CAssetValue,#CClosingRate,input[id="CGuaranteedAmount[0]"],input[id="CGuaranteedAmount[1]"],input[id="CGuaranteedAmount[2]"],input[id="CGuaranteedAmount[3]"],input[id="CGuaranteedAmount[4]"]').blur(function(){
        $(this).formatCurrency();
    });*/

    $('#CBondValue,#CMonthlyPayment,#CInterestRate,#CEffectiveRate,#CClosingCommission,#CCommission,#CFees,#MaValue,#PValue,#AccountAmount,#AccountBalance,#InvestAmount,#OtherAmount,#OtherBalance,#CAAmount,#CPostalFee,#CAssetValue,#CClosingRate').blur(function () {
        $(this).formatCurrency();
    });

});

var cnt = $('#guarantee tr').length - 1;
if (cnt > 1) {
    //console.log(cnt);
    $("#rem_row").show();
}
$("#add_row").click(function () {
    var cnt = $('#guarantee tr').length - 1;
    $('#guarantee tr:last').after('<tr><td><select id="CGuarantee[' + cnt + ']" name="CGuarantee[' + cnt + ']"><option selected value="">Seleccione una Facilidad</option><option value="01">Préstamo</option><option value="02">Préstamo Comercial</option><option value="03">Línea de Crédito</option><option value="04">Línea de Sobregiro</option><option value="05">Emisión de Bonos</option></select></td><td><input id="CGuaranteedAmount[' + cnt + ']" name="CGuaranteedAmount[' + cnt + ']" type="text" size="15"></td></tr>');
    cnt++;
    console.log(cnt);
    $("#rem_row").show();
    if (cnt == 4) {
        $("#add_row").hide();
    }
});

$("#rem_row").click(function () {
    var cnt = $('#guarantee tr').length - 1;
    $('#guarantee tr:last').remove();
    cnt--;
    console.log(cnt);
    if (cnt == 1) {
        $("#add_row").show();
        $("#rem_row").hide();
    } else if (cnt > 1 && cnt < 4) {
        $("#add_row").show();
        $("#rem_row").show();
    } else if (cnt > 4) {
        $("#add_row").hide();
        $("#rem_row").show();
    }
});

$("#getcar").click(function () {
    $("#CarInfo").hide();
    if (!$("#MaVin").val()) {
        alert("El Chasis es requerido para su verificación.");
    } else {
        if ($('#mlgform').valid()) {
            $.ajax({
                type: "GET",
                //url: "https://www.fwlatrust.com/eFWLA/modules/check_moveable_vin.php",
                url: BASE_URL + "eFWLA/check_moveable_vin",
                dataType: 'json',
                data: {
                    MaVin: $("#MaVin").val(),
                    BankID: '88'
                }
            })
             .done(function (msg) {
                 if (msg.result == "found") {
                     $("#MaVin").val("");
                     var trid = $(msg['response']).attr('id');
                     var container = $("#MoveableCart").html();
                     if (container.indexOf('id="' + trid + '"') > -1) {
                         alert("Este Auto ya fue seleccionado para este contrato.");
                     } else {
                         $("#MoveableCart").append(correctFromExternalRequest(msg['response'])).show();
                         $("a[rel^='prettyPhoto']").prettyPhoto({
                             theme: 'facebook',
                             social_tools: false
                         });
                         $("#cSubmitA").show('slow');
                     }

                     $("#MaVin").removeClass("required");
                     $("#NextButtons4").show();
                     //workflowRpa(3);
                 } else if (msg.result == "notavail") {
                     alert(msg.response);
                     $("#MaVin").val("");
                 } else {
                     alert(msg.response);
                     $('#CarInfo').children().find('input[type=text],select,textarea').each(function () {
                         $(this).val('');
                     });
                     $("#CarInfo").show();
                 }
             });
        }
    }
});

$("#addCar").click(function () {
    if ($('#mlgform').valid()) {
        $("#CarInfo").fadeOut(1000);
        $.ajax({
            type: "POST",
            url: $("#MaTable").val(),
            data: {
                MaBrand: $("#MaBrand").val(),
                MaModel: $("#MaModel").val(),
                MaYear: $("#MaYear").val(),
                MaValue: $("#MaValue").val(),
                MaVin: $("#MaVin").val(),
                MaEngineN: $("#MaEngineN").val(),
                MaColor: $("#MaColor").val(),
                MaMunicipality: $("#MaMunicipality").val(),
                MaCapacity: $("#MaCapacity").val(),
                MaVehicleType: $("#MaVehicleType").val(),
                MaComments: $("#MaComments").val(),
                PType: $("#PType").val(),
                MM_insert: $("#MM_insert").val(),
                UsrCreated: $("#UsrCreated").val()
            }
        })
         .done(function (result) {
             if (result != "false") {
                 if ($('#MoveableCart').css('display') == 'none') {
                     $('#MoveableCart').show();
                 }
                 $("#MoveableCart tbody").append(correctFromExternalRequest(result)).show();
                 $("a[rel^='prettyPhoto']").prettyPhoto({
                     theme: 'facebook',
                     social_tools: false,
                     allow_resize: true
                 });
                 $("#MaVin").removeClass("required");
                 $('#CarInfo').children().find('input[type=text],select').each(function () {
                     $(this).val('');
                 });
                 $("#cSubmitA").show('slow');

             } else {
                 alert("Hubo un problema al guardar el auto, intente nuevamente");
             }
         });
    }
});

$("#getequipment").click(function () {
    $("#equipment").hide();
    if (!$("#MaEVin").val()) {
        alert("El chasis es requerido para su verificación.");
    } else {
        if ($('#mlgform').valid()) {
            $.ajax({
                type: "GET",
                url: "https://www.fwlatrust.com/eFWLA/modules/check_emoveable.php",
                dataType: 'json',
                data: {
                    MaEVin: $("#MaEVin").val()
                }
            })
             .done(function (msg) {
                 if (msg.result == "found") {
                     $("#MaEVin").val("");
                     var trid = $(msg['response']).attr('id');
                     var container = $("#MoveableECart").html();
                     if (container.indexOf('id="' + trid + '"') > -1) {
                         alert("Este Equipo ya fue seleccionado para este contrato.");
                     } else {
                         $("#MoveableECart").append(correctFromExternalRequest(msg['response'])).show();
                         $("a[rel^='prettyPhoto']").prettyPhoto({
                             theme: 'facebook',
                             social_tools: false
                         });
                     }

                     $("#MaEVin").removeClass("required");
                     $("#cSubmitE").show('slow');
                 } else if (msg.result == "true") {
                     $("#equipment").show();
                 } else {
                     alert(msg.response);
                 }
             });
        }
    }
});

$("#addEquipment").click(function () {
    if ($('#mlgform').valid()) {
        $("#equipment").fadeOut(1000);
        $.ajax({
            type: "POST",
            url: $("#MaTable").val(),
            data: {
                MaBrand: $("#MaEBrand").val(),
                MaModel: $("#MaEModel").val(),
                MaYear: $("#MaEYear").val(),
                MaValue: $("#MaEValue").val(),
                MaVin: $("#MaEVin").val(),
                MaEngineN: $("#MaEEngineN").val(),
                MaComments: $("#MaEComments").val(),
                PType: $("#PTypeE").val(),
                MM_insert: $("#MM_insert").val(),
                UsrCreated: $("#UsrCreated").val()
            }
        })
         .done(function (result) {
             if (result != "false") {
                 if ($('#MoveableECart').css('display') == 'none') {
                     $('#MoveableECart').show();
                 }
                 $("#MoveableECart tbody").append(correctFromExternalRequest(result)).show();
                 $("a[rel^='prettyPhoto']").prettyPhoto({
                     theme: 'facebook',
                     social_tools: false,
                     allow_resize: true
                 });
                 $("#MaEVin").removeClass("required");
                 $('#equipment').children().find('input[type=text],select').each(function () {
                     $(this).val('');
                 });
                 $("#cSubmitE").show('slow');

             } else {
                 alert("Hubo un problema al guardar el equipo, intente nuevamente");
             }
         });
    }
});

$("#getfinca").click(function () {
    $("#finca").hide();
    if (!$("#Finca").val()) {
        alert("El número de finca es requerida para su verificación.");
    } else {
        if ($('#mlgform').valid()) {
            $.ajax({
                type: "GET",
                url: "https://www.fwlatrust.com/eFWLA/modules/check_unmoveable.php",
                dataType: 'json',
                data: {
                    Finca: $("#Finca").val()
                }
            })
             .done(function (msg) {
                 if (msg.result == "found") {
                     $("#Finca").val("");
                     var trid = $(msg['response']).attr('id');
                     var container = $("#MoveablePCart").html();
                     if (container.indexOf('id="' + trid + '"') > -1) {
                         alert("Esta Finca ya fue seleccionada para este contrato.");
                     } else {
                         $("#MoveablePCart").append(correctFromExternalRequest(msg['response'])).show();
                         $("a[rel^='prettyPhoto']").prettyPhoto({
                             theme: 'facebook',
                             social_tools: false
                         });
                     }

                     $("#Finca").removeClass("required");
                     $("#NextPButtons4").show();
                 } else if (msg.result == "true") {
                     $("#finca").show();
                 } else {
                     alert(msg.response);
                 }
             });
        }
    }
});

$("#addProperty").click(function () {
    if ($('#mlgform').valid()) {
        $("#finca").fadeOut(1000);
        $.ajax({
            type: "POST",
            url: $("#MpTable").val(),
            data: {
                Finca: $("#Finca").val(),
                Tomo: $("#Tomo").val(),
                Rollo: $("#Rollo").val(),
                Asiento: $("#Asiento").val(),
                Folio: $("#Folio").val(),
                Documento: $("#Documento").val(),
                CUbicacion: $("#CUbicacion").val(),
                NIT: $("#NIT").val(),
                PValue: $("#PValue").val(),
                PropertyComments: $("#PropertyComments").val(),
                MM_insert: $("#MM_insert").val(),
                UsrCreated: $("#UsrCreated").val()
            }
        })
         .done(function (result) {
             if (result != "false") {
                 if ($('#MoveablePCart').css('display') == 'none') {
                     $('#MoveablePCart').show();
                 }
                 $("#MoveablePCart tbody").append(correctFromExternalRequest(result)).show();
                 $("a[rel^='prettyPhoto']").prettyPhoto({
                     theme: 'facebook',
                     social_tools: false,
                     allow_resize: true
                 });
                 $('#finca').children().find('input[type=text],select').each(function () {
                     $(this).val('');
                 });
                 $("#cSubmitP").show('slow');

             } else {
                 alert("Hubo un problema al guardar el inmueble, intente nuevamente");
             }
         });
    }
});

$("#getdeposit").click(function () {
    $("#fdeposit").hide();
    if (!$("#AccountNumber").val()) {
        alert("El número de cuenta es requerido para su verificación.");
    } else {
        if ($('#mlgform').valid()) {
            $.ajax({
                type: "GET",
                url: "https://www.fwlatrust.com/eFWLA/modules/check_deposit.php",
                dataType: 'json',
                data: {
                    AccountNumber: $("#AccountNumber").val()
                }
            })
             .done(function (msg) {
                 if (msg.result == "found") {
                     $("#AccountNumber").val("");
                     var trid = $(msg['response']).attr('id');
                     var container = $("#MoveableDCart").html();
                     if (container.indexOf('id="' + trid + '"') > -1) {
                         alert("Este Depósito ya fue seleccionado para este contrato.");
                     } else {
                         $("#MoveableDCart").append(correctFromExternalRequest(msg['response'])).show();
                         $("a[rel^='prettyPhoto']").prettyPhoto({
                             theme: 'facebook',
                             social_tools: false
                         });
                     }

                     $("#AccountNumber").removeClass("required");
                     $("#NextDButtons4").show();
                 } else if (msg.result == "true") {
                     $("#fdeposit").show();
                 } else {
                     alert(msg.response);
                 }
             });
        }
    }
});

$("#addDeposit").click(function () {
    if ($('#mlgform').valid()) {
        $("#fdeposit").fadeOut(1000);
        $.ajax({
            type: "POST",
            url: $("#MdTable").val(),
            data: {
                AccountType: $("#AccountType").val(),
                AccountNumber: $("#AccountNumber").val(),
                AccountBank: $("#AccountBank").val(),
                AccountAmount: $("#AccountAmount").val(),
                AccountComments: $("#AccountComments").val(),
                MM_insert: $("#MM_insert").val(),
                UsrCreated: $("#UsrCreated").val()
            }
        })
         .done(function (result) {
             if (result != "false") {
                 if ($('#MoveableDCart').css('display') == 'none') {
                     $('#MoveableDCart').show();
                 }
                 $("#AccountNumber").val("");
                 $("#AccountNumber").removeClass("required");
                 $("#MoveableDCart tbody").append(correctFromExternalRequest(result)).show();
                 $("a[rel^='prettyPhoto']").prettyPhoto({
                     theme: 'facebook',
                     social_tools: false,
                     allow_resize: true
                 });
                 $('#fdeposit').children().find('input[type=text],select').each(function () {
                     $(this).val('');
                 });
                 $("#cSubmitD").show('slow');

             } else {
                 alert("Hubo un problema al guardar el depósito, intente nuevamente");
             }
         });
    }
});

$("#getinvestment").click(function () {
    $("#inversion").hide();
    if (!$("#InvestNumber").val()) {
        alert("El número de certificado es requerido para su verificación.");
    } else {
        if ($('#mlgform').valid()) {
            $.ajax({
                type: "GET",
                url: "https://www.fwlatrust.com/eFWLA/modules/check_investment.php",
                dataType: 'json',
                data: {
                    InvestNumber: $("#InvestNumber").val()
                }
            })
             .done(function (msg) {
                 if (msg.result == "found") {
                     $("#InvestNumber").val("");
                     var trid = $(msg['response']).attr('id');
                     var container = $("#MoveableICart").html();
                     if (container.indexOf('id="' + trid + '"') > -1) {
                         alert("Esta Inversión ya fue seleccionado para este contrato.");
                     } else {
                         $("#MoveableICart").append(correctFromExternalRequest(msg['response'])).show();
                         $("a[rel^='prettyPhoto']").prettyPhoto({
                             theme: 'facebook',
                             social_tools: false
                         });
                     }

                     $("#InvestNumber").removeClass("required");
                     $("#NextIButtons4").show();
                 } else if (msg.result == "true") {
                     $("#inversion").show();
                 } else {
                     alert(msg.response);
                 }
             });
        }
    }
});

$("#addInvestment").click(function () {
    if ($('#mlgform').valid()) {
        $("#inversion").fadeOut(1000);
        $.ajax({
            type: "POST",
            url: $("#MiTable").val(),
            data: {
                InvestType: $("#InvestType").val(),
                InvestNumber: $("#InvestNumber").val(),
                InvestQty: $("#InvestQty").val(),
                InvestIssuer: $("#InvestIssuer").val(),
                InvestAmount: $("#InvestAmount").val(),
                InvestEmitedDate: $("#InvestEmitedDate").val(),
                InvestExpiryDate: $("#InvestExpiryDate").val(),
                InvestComments: $("#InvestComments").val(),
                MM_insert: $("#MM_insert").val(),
                UsrCreated: $("#UsrCreated").val()
            }
        })
         .done(function (result) {
             if (result != "false") {
                 if ($('#MoveableICart').css('display') == 'none') {
                     $('#MoveableICart').show();
                 }
                 $("#MoveableICart tbody").append(correctFromExternalRequest(result)).show();
                 $("a[rel^='prettyPhoto']").prettyPhoto({
                     theme: 'facebook',
                     social_tools: false,
                     allow_resize: true
                 });
                 $('#inversion').children().find('input[type=text],select').each(function () {
                     $(this).val('');
                 });
                 $("#cSubmitI").show('slow');

             } else {
                 alert("Hubo un problema al guardar la inversión, intente nuevamente");
             }
         });
    }
});

$("#getother").click(function () {
    $("#others").hide();
    if (!$("#OtherNumber").val()) {
        alert("El código de identificación es requerido para su verificación.");
    } else {
        if ($('#mlgform').valid()) {
            $.ajax({
                type: "GET",
                url: "https://www.fwlatrust.com/eFWLA/modules/check_others.php",
                dataType: 'json',
                data: {
                    OtherNumber: $("#OtherNumber").val()
                }
            })
             .done(function (msg) {
                 if (msg.result == "found") {
                     $("#OtherNumber").val("");
                     var trid = $(msg['response']).attr('id');
                     var container = $("#MoveableOCart").html();
                     if (container.indexOf('id="' + trid + '"') > -1) {
                         alert("Este Bien ya fue seleccionado para este contrato.");
                     } else {
                         $("#MoveableOCart").append(correctFromExternalRequest(msg['response'])).show();
                         $("a[rel^='prettyPhoto']").prettyPhoto({
                             theme: 'facebook',
                             social_tools: false
                         });
                     }

                     $("#OtherNumber").removeClass("required");
                     $("#NextOButtons4").show();
                 } else if (msg.result == "true") {
                     $("#others").show();
                 } else {
                     alert(msg.response);
                 }
             });
        }
    }
});

$("#addOther").click(function () {
    if ($('#mlgform').valid()) {
        $("#others").fadeOut(1000);
        $.ajax({
            type: "POST",
            url: $("#MoTable").val(),
            data: {
                OtherType: $("#OtherType").val(),
                OtherNumber: $("#OtherNumber").val(),
                OtherQty: $("#OtherQty").val(),
                OtherAmount: $("#OtherAmount").val(),
                OtherBalance: $("#OtherBalance").val(),
                OtherComments: $("#OtherComments").val(),
                MM_insert: $("#MM_insert").val(),
                UsrCreated: $("#UsrCreated").val()
            }
        })
         .done(function (result) {
             if (result != "false") {
                 $("#MoveableOCart").append(correctFromExternalRequest(result)).show();
                 $("a[rel^='prettyPhoto']").prettyPhoto({
                     theme: 'facebook',
                     social_tools: false,
                     allow_resize: true
                 });
                 $('#others').children().find('input[type=text],select').each(function () {
                     $(this).val('');
                 });
                 $("#cSubmitO").show('slow');

             } else {
                 alert("Hubo un problema al guardar el bien, intente nuevamente");
             }
         });
    }
});

function removeCustomer(id) {
    if (confirm("¿Está seguro que desea eliminar este cliente?") == true) {
        $('#c' + id).remove();
        $("a[rel^='prettyPhoto']").prettyPhoto({
            theme: 'facebook',
            social_tools: false
        });
        if ($.trim($('#CustomerCart tbody').html()) == '') {
            $("#CustomerCart").hide();
            $("#NextButtons3").hide();
            $("#CLegalID").addClass("required");
        }
    } else {
        return false;
    }
}

function removeCar(id) {
    if (confirm("¿Está seguro que desea eliminar este vehículo?") == true) {
        $('#m' + id).remove();
        $("a[rel^='prettyPhoto']").prettyPhoto({
            theme: 'facebook',
            social_tools: false,
            allow_resize: true
        });
        if ($.trim($('#MoveableCart tbody').html()) == '') {
            $("#MoveableCart").hide();
            $("#cSubmitA").hide();
            $("#MaVin").addClass("required");
        }
    } else {
        return false;
    }
}

function removeEquipment(id) {
    if (confirm("¿Está seguro que desea eliminar este equipo?") == true) {
        $('#e' + id).remove();
        $("a[rel^='prettyPhoto']").prettyPhoto({
            theme: 'facebook',
            social_tools: false,
            allow_resize: true
        });
        if ($.trim($('#MoveableECart tbody').html()) == '') {
            $("#MoveableECart").hide();
            $("#cSubmitE").hide();
            $("#MaEVin").addClass("required");
        }
    } else {
        return false;
    }
}

function removeProperty(id) {
    if (confirm("¿Está seguro que desea eliminar esta propiedad?") == true) {
        $('#u' + id).remove();
        $("a[rel^='prettyPhoto']").prettyPhoto({
            theme: 'facebook',
            social_tools: false,
            allow_resize: true
        });
        if ($.trim($('#MoveablePCart tbody').html()) == '') {
            $("#finca").fadeIn(1000);
            $("#MoveablePCart").hide();
            $("#cSubmitP").hide();
        }
    } else {
        return false;
    }
}

function removeDeposit(id) {
    if (confirm("¿Está seguro que desea eliminar este depósito?") == true) {
        $('#d' + id).remove();
        $("a[rel^='prettyPhoto']").prettyPhoto({
            theme: 'facebook',
            social_tools: false,
            allow_resize: true
        });
        if ($.trim($('#MoveableDCart tbody').html()) == '') {
            $("#MoveableDCart").hide();
            $("#cSubmitD").hide();
        }
    } else {
        return false;
    }
}

function removeInvestment(id) {
    if (confirm("¿Está seguro que desea eliminar esta inversión?") == true) {
        $('#i' + id).remove();
        $("a[rel^='prettyPhoto']").prettyPhoto({
            theme: 'facebook',
            social_tools: false,
            allow_resize: true
        });
        if ($.trim($('#MoveableICart tbody').html()) == '') {
            $("#inversion").fadeIn(1000);
            $("#MoveableICart").hide();
            $("#cSubmitI").hide();
        }
    } else {
        return false;
    }
}

function removeOther(id) {
    if (confirm("¿Está seguro que desea eliminar este bien?") == true) {
        $('#o' + id).remove();
        $("a[rel^='prettyPhoto']").prettyPhoto({
            theme: 'facebook',
            social_tools: false,
            allow_resize: true
        });
        if ($.trim($('#MoveableOCart tbody').html()) == '') {
            $("#MoveableOCart").hide();
            $("#cSubmitO").hide();
        }
    } else {
        return false;
    }
}
$('#BankID').on('change', function () {
    $("#BankID").removeData("previousValue");
    switch ($(this).val()) {
        case "02":
            $('#CCommission').val(0.00).attr('readonly', 'readonly');
            $('#CFees').val(176.55).attr('readonly', 'readonly');
            $('#insurerN').show();
            $('#insurerU').hide();
            $('#empower').html('<tr><td>Firma Autorizada 1</td><td><input name="CBankSignerA" type="text" id="CBankSignerA" size="25"></td></tr><tr><td>Identificación 1</td><td><input name="CBankSignerAID" type="text" id="CBankSignerAID" size="10"></td></tr>');
            $('#authorized').html('<tr><td>Firma Autorizada 2</td><td><input name="CBankSignerB" type="text" id="CBankSignerB" size="25"></td></tr><tr><td>Identificación 2</td><td><input name="CBankSignerBID" type="text" id="CBankSignerBID" size="10"></td></tr><tr><td>Firma Autorizada 3</td><td><input name="CBankSignerC" type="text" id="CBankSignerC" size="25"></td></tr><tr><td>Identificación 3</td><td><input name="CBankSignerCID" type="text" id="CBankSignerCID" size="10"></td></tr>');
            break;
        case "06":
            switch ($('#CContractType').val()) {
                case "P":
                case "C":
                    $('#CCommission').val(3.21).attr('readonly', 'readonly');
                    $('#CFees').val(187.25).attr('readonly', 'readonly');
                    break;
                case "E":
                    $('#CCommission').val(2.68).attr('readonly', 'readonly');
                    $('#CFees').val(160.50).attr('readonly', 'readonly');
                    break;
            }
            $('#insurerN').show();
            $('#insurerU').hide();
            $('#empower').html('<tr><td>Firma Autorizada Contrato</td><td><select name="CBankSignerA" id="CBankSignerA"><option value="" selected>Seleccione el Apoderado</option><option value="OLIMPO ARIEL QUINTERO BECERRA">Olimpo Ariel Quintero Becerra</option><option value="MELISSA EUGENIA URRIOLA DE COHEN">Melissa Eugenia Urriola de Cohen</option></select><input type="hidden" name="CBankSignerAID" id="CBankSignerAID"><input type="hidden" name="CBankSignerASex" id="CBankSignerASex"><input type="hidden" name="CBankSignerAStatus" id="CBankSignerAStatus"><input type="hidden" name="CBankSignerAPosition" id="CBankSignerAPosition"></td></tr>');
            $('#authorized').html('<tr><td>Firma Autorizada 2</td><td><input name="CBankSignerB" type="text" id="CBankSignerB" size="25"></td></tr><tr><td>Identificación 2</td><td><input name="CBankSignerBID" type="text" id="CBankSignerBID" size="10"></td></tr><tr><td>Firma Autorizada 3</td><td><input name="CBankSignerC" type="text" id="CBankSignerC" size="25"></td></tr><tr><td>Identificación 3</td><td><input name="CBankSignerCID" type="text" id="CBankSignerCID" size="10"></td></tr>');
            break;
        case "41":
            $('#CCommission').val(0.00).removeAttr('readonly');
            $('#CFees').val(187.25).removeAttr('readonly');
            $('#insurerN').show();
            $('#insurerU').hide();
            $('#empower').html('<tr><td>Firma Autorizada 1</td><td><input name="CBankSignerA" type="text" id="CBankSignerA" size="25"></td></tr><tr><td>Identificación 1</td><td><input name="CBankSignerAID" type="text" id="CBankSignerAID" size="10"></td></tr>');
            $('#authorized').html('<tr><td>Firma Autorizada 2</td><td><input name="CBankSignerB" type="text" id="CBankSignerB" size="25"></td></tr><tr><td>Identificación 2</td><td><input name="CBankSignerBID" type="text" id="CBankSignerBID" size="10"></td></tr><tr><td>Firma Autorizada 3</td><td><input name="CBankSignerC" type="text" id="CBankSignerC" size="25"></td></tr><tr><td>Identificación 3</td><td><input name="CBankSignerCID" type="text" id="CBankSignerCID" size="10"></td></tr>');
            break;
        case "10":
            $('#CCommission').val(1.30).attr('readonly', 'readonly');
            $('#CFees').val(149.80).attr('readonly', 'readonly');
            $('#insurerN').show();
            $('#insurerU').hide();
            $('#empower').html('<tr><td>Firma Autorizada 1</td><td><input name="CBankSignerA" type="text" id="CBankSignerA" size="25"></td></tr><tr><td>Identificación 1</td><td><input name="CBankSignerAID" type="text" id="CBankSignerAID" size="10"></td></tr>');
            $('#authorized').html('<tr><td>Firma Autorizada 2</td><td><input name="CBankSignerB" type="text" id="CBankSignerB" size="25"></td></tr><tr><td>Identificación 2</td><td><input name="CBankSignerBID" type="text" id="CBankSignerBID" size="10"></td></tr><tr><td>Firma Autorizada 3</td><td><input name="CBankSignerC" type="text" id="CBankSignerC" size="25"></td></tr><tr><td>Identificación 3</td><td><input name="CBankSignerCID" type="text" id="CBankSignerCID" size="10"></td></tr>');
            break;
        case "23":
        case "55":
            $('#CCommission').val(1.50).attr('readonly', 'readonly');
            $('#CFees').val(139.10).attr('readonly', 'readonly');
            $('#insurerN').show();
            $('#insurerU').hide();
            $('#empower').html('<tr><td>Firma Autorizada 1</td><td><input name="CBankSignerA" type="text" id="CBankSignerA" size="25"></td></tr><tr><td>Identificación 1</td><td><input name="CBankSignerAID" type="text" id="CBankSignerAID" size="10"></td></tr>');
            $('#authorized').html('<tr><td>Firma Autorizada 2</td><td><input name="CBankSignerB" type="text" id="CBankSignerB" size="25"></td></tr><tr><td>Identificación 2</td><td><input name="CBankSignerBID" type="text" id="CBankSignerBID" size="10"></td></tr><tr><td>Firma Autorizada 3</td><td><input name="CBankSignerC" type="text" id="CBankSignerC" size="25"></td></tr><tr><td>Identificación 3</td><td><input name="CBankSignerCID" type="text" id="CBankSignerCID" size="10"></td></tr>');
            break;
        case "20":
        case "34":
        case "43":
            $('#CCommission').val(1.50).attr('readonly', 'readonly');
            $('#CFees').val(176.55).attr('readonly', 'readonly');
            $('#insurerN').show();
            $('#insurerU').hide();
            $('#empower').html('<tr><td>Firma Autorizada 1</td><td><input name="CBankSignerA" type="text" id="CBankSignerA" size="25"></td></tr><tr><td>Identificación 1</td><td><input name="CBankSignerAID" type="text" id="CBankSignerAID" size="10"></td></tr>');
            $('#authorized').html('<tr><td>Firma Autorizada 2</td><td><input name="CBankSignerB" type="text" id="CBankSignerB" size="25"></td></tr><tr><td>Identificación 2</td><td><input name="CBankSignerBID" type="text" id="CBankSignerBID" size="10"></td></tr><tr><td>Firma Autorizada 3</td><td><input name="CBankSignerC" type="text" id="CBankSignerC" size="25"></td></tr><tr><td>Identificación 3</td><td><input name="CBankSignerCID" type="text" id="CBankSignerCID" size="10"></td></tr>');
            break;
        case "46":
            $('#CCommission').val(2.00).attr('readonly', 'readonly');
            $('#CFees').val(171.20).attr('readonly', 'readonly');
            $('#insurerN').show();
            $('#insurerU').hide();
            $('#empower').html('<tr><td>Firma Autorizada 1</td><td><input name="CBankSignerA" type="text" id="CBankSignerA" size="25"></td></tr><tr><td>Identificación 1</td><td><input name="CBankSignerAID" type="text" id="CBankSignerAID" size="10"></td></tr>');
            $('#authorized').html('<tr><td>Firma Autorizada 2</td><td><input name="CBankSignerB" type="text" id="CBankSignerB" size="25"></td></tr><tr><td>Identificación 2</td><td><input name="CBankSignerBID" type="text" id="CBankSignerBID" size="10"></td></tr><tr><td>Firma Autorizada 3</td><td><input name="CBankSignerC" type="text" id="CBankSignerC" size="25"></td></tr><tr><td>Identificación 3</td><td><input name="CBankSignerCID" type="text" id="CBankSignerCID" size="10"></td></tr>');
            break;
        case "53":
        case "62":
            $('#CCommission').val(2.00).attr('readonly', 'readonly');
            $('#CFees').val(176.55).attr('readonly', 'readonly');
            $('#insurerN').show();
            $('#insurerU').hide();
            $('#empower').html('<tr><td>Firma Autorizada 1</td><td><input name="CBankSignerA" type="text" id="CBankSignerA" size="25"></td></tr><tr><td>Identificación 1</td><td><input name="CBankSignerAID" type="text" id="CBankSignerAID" size="10"></td></tr>');
            $('#authorized').html('<tr><td>Firma Autorizada 2</td><td><input name="CBankSignerB" type="text" id="CBankSignerB" size="25"></td></tr><tr><td>Identificación 2</td><td><input name="CBankSignerBID" type="text" id="CBankSignerBID" size="10"></td></tr><tr><td>Firma Autorizada 3</td><td><input name="CBankSignerC" type="text" id="CBankSignerC" size="25"></td></tr><tr><td>Identificación 3</td><td><input name="CBankSignerCID" type="text" id="CBankSignerCID" size="10"></td></tr>');
            break;
        case "54":
            $('#CCommission').val(2.00).attr('readonly', 'readonly');
            $('#CFees').val(187.25).attr('readonly', 'readonly');
            $('#insurerN').show();
            $('#insurerU').hide();
            $('#empower').html('<tr><td>Firma Autorizada 1</td><td><input name="CBankSignerA" type="text" id="CBankSignerA" size="25"></td></tr><tr><td>Identificación 1</td><td><input name="CBankSignerAID" type="text" id="CBankSignerAID" size="10"></td></tr>');
            $('#authorized').html('<tr><td>Firma Autorizada 2</td><td><input name="CBankSignerB" type="text" id="CBankSignerB" size="25"></td></tr><tr><td>Identificación 2</td><td><input name="CBankSignerBID" type="text" id="CBankSignerBID" size="10"></td></tr><tr><td>Firma Autorizada 3</td><td><input name="CBankSignerC" type="text" id="CBankSignerC" size="25"></td></tr><tr><td>Identificación 3</td><td><input name="CBankSignerCID" type="text" id="CBankSignerCID" size="10"></td></tr>');
            break;
        case "60":
            $('#CCommission').val(2.00).attr('readonly', 'readonly');
            $('#CFees').val(197.95).attr('readonly', 'readonly');
            $('#insurerN').show();
            $('#insurerU').hide();
            $('#empower').html('<tr><td>Firma Autorizada 1</td><td><input name="CBankSignerA" type="text" id="CBankSignerA" size="25"></td></tr><tr><td>Identificación 1</td><td><input name="CBankSignerAID" type="text" id="CBankSignerAID" size="10"></td></tr>');
            $('#authorized').html('<tr><td>Firma Autorizada 2</td><td><input name="CBankSignerB" type="text" id="CBankSignerB" size="25"></td></tr><tr><td>Identificación 2</td><td><input name="CBankSignerBID" type="text" id="CBankSignerBID" size="10"></td></tr><tr><td>Firma Autorizada 3</td><td><input name="CBankSignerC" type="text" id="CBankSignerC" size="25"></td></tr><tr><td>Identificación 3</td><td><input name="CBankSignerCID" type="text" id="CBankSignerCID" size="10"></td></tr>');
            break;
        case "32":
            $('#CCommission').val(2.50).attr('readonly', 'readonly');
            $('#CFees').val(187.25).attr('readonly', 'readonly');
            $('#insurerN').show();
            $('#insurerU').hide();
            $('#empower').html('<tr><td>Firma Autorizada 1</td><td><input name="CBankSignerA" type="text" id="CBankSignerA" size="25"></td></tr><tr><td>Identificación 1</td><td><input name="CBankSignerAID" type="text" id="CBankSignerAID" size="10"></td></tr>');
            $('#authorized').html('<tr><td>Firma Autorizada 2</td><td><input name="CBankSignerB" type="text" id="CBankSignerB" size="25"></td></tr><tr><td>Identificación 2</td><td><input name="CBankSignerBID" type="text" id="CBankSignerBID" size="10"></td></tr><tr><td>Firma Autorizada 3</td><td><input name="CBankSignerC" type="text" id="CBankSignerC" size="25"></td></tr><tr><td>Identificación 3</td><td><input name="CBankSignerCID" type="text" id="CBankSignerCID" size="10"></td></tr>');
            break;
        case "07":
            $('#CCommission').val(3.00).attr('readonly', 'readonly');
            $('#CFees').val(160.50).attr('readonly', 'readonly');
            $('#insurerN').show();
            $('#insurerU').hide();
            $('#empower').html('<tr><td>Firma Autorizada 1</td><td><input name="CBankSignerA" type="text" id="CBankSignerA" size="25"></td></tr><tr><td>Identificación 1</td><td><input name="CBankSignerAID" type="text" id="CBankSignerAID" size="10"></td></tr>');
            $('#authorized').html('<tr><td>Firma Autorizada 2</td><td><input name="CBankSignerB" type="text" id="CBankSignerB" size="25"></td></tr><tr><td>Identificación 2</td><td><input name="CBankSignerBID" type="text" id="CBankSignerBID" size="10"></td></tr><tr><td>Firma Autorizada 3</td><td><input name="CBankSignerC" type="text" id="CBankSignerC" size="25"></td></tr><tr><td>Identificación 3</td><td><input name="CBankSignerCID" type="text" id="CBankSignerCID" size="10"></td></tr>');
            break;
        case "33":
        case "38":
        case "69":
            $('#CCommission').val(3.00).attr('readonly', 'readonly');
            $('#CFees').val(176.55).attr('readonly', 'readonly');
            $('#insurerN').show();
            $('#insurerU').hide();
            $('#empower').html('<tr><td>Firma Autorizada 1</td><td><input name="CBankSignerA" type="text" id="CBankSignerA" size="25"></td></tr><tr><td>Identificación 1</td><td><input name="CBankSignerAID" type="text" id="CBankSignerAID" size="10"></td></tr>');
            $('#authorized').html('<tr><td>Firma Autorizada 2</td><td><input name="CBankSignerB" type="text" id="CBankSignerB" size="25"></td></tr><tr><td>Identificación 2</td><td><input name="CBankSignerBID" type="text" id="CBankSignerBID" size="10"></td></tr><tr><td>Firma Autorizada 3</td><td><input name="CBankSignerC" type="text" id="CBankSignerC" size="25"></td></tr><tr><td>Identificación 3</td><td><input name="CBankSignerCID" type="text" id="CBankSignerCID" size="10"></td></tr>');
            break;
        case "49":
        case "70":
        case "73":
        case "77":
        case "78":
        case "79":
        case "82":
        case "83":
        case "84":
            $('#CCommission').val(3.00).attr('readonly', 'readonly');
            $('#CFees').val(187.25).attr('readonly', 'readonly');
            $('#insurerN').show();
            $('#insurerU').hide();
            $('#empower').html('<tr><td>Firma Autorizada 1</td><td><input name="CBankSignerA" type="text" id="CBankSignerA" size="25"></td></tr><tr><td>Identificación 1</td><td><input name="CBankSignerAID" type="text" id="CBankSignerAID" size="10"></td></tr>');
            $('#authorized').html('<tr><td>Firma Autorizada 2</td><td><input name="CBankSignerB" type="text" id="CBankSignerB" size="25"></td></tr><tr><td>Identificación 2</td><td><input name="CBankSignerBID" type="text" id="CBankSignerBID" size="10"></td></tr><tr><td>Firma Autorizada 3</td><td><input name="CBankSignerC" type="text" id="CBankSignerC" size="25"></td></tr><tr><td>Identificación 3</td><td><input name="CBankSignerCID" type="text" id="CBankSignerCID" size="10"></td></tr>');
            break;
        case "74":
            $('#CCommission').val(3.00).attr('readonly', 'readonly');
            $('#CFees').val(187.25).attr('readonly', 'readonly');
            $('#empower').html('<tr><td>Firma Autorizada Contrato</td><td><select name="CBankSignerA" id="CBankSignerA"><option value="" selected>Seleccione el Apoderado</option><option value="ANGELA JOSEFINA VILLASMIL MARQUEZ">Angela Josefina Villasmil Márquez</option><option value="SANTOS ALONSO RAMOS">Santos Alonso Ramos</option><option value="DANIEL OBLITAS TEJADA">Daniel Oblitas Tejada</option><option value="MAYRA LONDOÑO CASTILLERO">Mayra Londoño Castillero</option><option value="KIRA ODERAY GARDELLINI ESCOBAR">Kira Oderay Gardellini Escobar</option><option value="MARCO ANTONIO FORERO PEREZ">Marco Antonio Forero Pérez</option></select><input type="hidden" name="CBankSignerAID" id="CBankSignerAID"><input type="hidden" name="CBankSignerAIDType" id="CBankSignerAIDType"><input type="hidden" name="CBankSignerASex" id="CBankSignerASex"><input type="hidden" name="CBankSignerAStatus" id="CBankSignerAStatus"><input type="hidden" name="CBankSignerAPosition" id="CBankSignerAPosition"><input type="hidden" name="CBankSignerACitizenship" id="CBankSignerACitizenship"></td></tr>');
            $('#authorized').html('<tr><td>Firma Autorizada 2</td><td><input name="CBankSignerB" type="text" id="CBankSignerB" size="25"></td></tr><tr><td>Identificación 2</td><td><input name="CBankSignerBID" type="text" id="CBankSignerBID" size="10"></td></tr><tr><td>Firma Autorizada 3</td><td><input name="CBankSignerC" type="text" id="CBankSignerC" size="25"></td></tr><tr><td>Identificación 3</td><td><input name="CBankSignerCID" type="text" id="CBankSignerCID" size="10"></td></tr>');
            break;
        case "92":
            $('#CCommission').val(3.00).attr('readonly', 'readonly');
            $('#CFees').val(187.25).attr('readonly', 'readonly');
            $('#empower').html('<tr><td>Firma Autorizada Contrato</td><td><select name="CBankSignerA" id="CBankSignerA"><option value="" selected>Seleccione el Apoderado</option><option value="BRITTANIA AMAYA">Brittania Amaya</option><option value="KATHERINA HOWARD">Katherina Howard</option><option value="RAMON MARCELINO">Ramón Marcelino</option><option value="ALEXANDRA CRISTINA CALIXTO DE VELASCO">Alexandra Cristina Calixto de Velasco</option><option value="SILVIA LEE">Silvia Lee</option><option value="YADILIA PINO OLIVE">Yadilia Pino Olive</option><option value="SONYA BELINDA MUÑOZ HUGHES">Sonya Belinda Muñoz Hughes</option><option value="GICELA NACARI TEJADA DE VACA">Gicela Nacari Tejada de Vaca</option><option value="IRAIZA ARGELIS ACHON BALLESTERO">Iraiza Argelis Achon Ballestero</option></select><input type="hidden" name="CBankSignerAID" id="CBankSignerAID"><input type="hidden" name="CBankSignerAIDType" id="CBankSignerAIDType"><input type="hidden" name="CBankSignerASex" id="CBankSignerASex"><input type="hidden" name="CBankSignerAStatus" id="CBankSignerAStatus"><input type="hidden" name="CBankSignerAPosition" id="CBankSignerAPosition"><input type="hidden" name="CBankSignerACitizenship" id="CBankSignerACitizenship"></td></tr>');
            $('#authorized').html('<tr><td>Firma Autorizada B</td><td><select name="CBankSignerB" id="CBankSignerB"><option value="" selected>Seleccione el Firmante B</option><option value="FARAH ORTEGA">Farah Ortega</option><option value="JUAN ISAZA">Juan Isaza</option><option value="GONZALO GUTIERREZ">Gonzalo Gutiérrez</option><option value="KATHIUSKA MUÑOZ">Kathiuska Muñoz</option><option value="LAUSANNE GUTIERREZ">Lausanne Gutiérrez</option><option value="YURISSA SERRACIN">Yurissa Serracín</option><option value="SERGIO MITRE">Sergio Mitre</option><option value="PAOLA MATUTE">Paola Matute</option><option value="NELSON VANEGAS">Nelson Vanegas</option><option value="LUIS RIOS">Luis Ríos</option><option value="CESAR ENRIQUE BURGOS AVILA">César Enrique Burgos Avila</option><option value="SILVIA LEE MORENO">Silvia Lee Moreno</option><option value="EMANUEL DE JESUS RODRIGUEZ HERRERA">Emanuel De Jesús Rodríguez Herrera</option><option value="YVONNE ESTER ELLIOTT BENITEZ">Yvonne Ester Elliott BenÍtez</option><option value="LILIA ESTHER ARROCHA ARAUZ">Lilia Esther Arrocha AraÚz</option><option value="LORIELA RAMOS DELGADO">Loriela Ramos Delgado</option><option value="JORGE GONZALEZ PEREZ">Jorge González Pérez</option><option value="Dionisia Luna Cedeño">Dionisia Luna Cedeño</option><option value="KATINA PEREZ">Katina Pérez</option><option value="JONATHAN LARA">Jonathan Lara</option><option value="VICTOR AGRAZAL">Victor Agrazal</option><option value="CARMEN CASTILLO">Carmen Castillo</option><option value="LENIA DUMASA">Lenia Dumasa</option></select></td></tr><tr><td>Identificación B</td><td><input name="CBankSignerBID" type="text" id="CBankSignerBID" size="10" readonly></td></tr><tr><td>Firma Autorizada C</td><td><select name="CBankSignerC" id="CBankSignerC"><option value="" selected>Seleccione el Firmante C</option><option value="FARAH ORTEGA">Farah Ortega</option><option value="JUAN ISAZA">Juan Isaza</option><option value="GONZALO GUTIERREZ">Gonzalo Gutiérrez</option><option value="KATHIUSKA MUÑOZ">Kathiuska Muñoz</option><option value="LAUSANNE GUTIERREZ">Lausanne Gutiérrez</option><option value="YURISSA SERRACIN">Yurissa Serracín</option><option value="SERGIO MITRE">Sergio Mitre</option><option value="PAOLA MATUTE">Paola Matute</option><option value="NELSON VANEGAS">Nelson Vanegas</option><option value="LUIS RIOS">Luis Ríos</option><option value="CESAR ENRIQUE BURGOS AVILA">César Enrique Burgos Avila</option><option value="SILVIA LEE MORENO">Silvia Lee Moreno</option><option value="EMANUEL DE JESUS RODRIGUEZ HERRERA">Emanuel De Jesús Rodríguez Herrera</option><option value="YVONNE ESTER ELLIOTT BENITEZ">Yvonne Ester Elliott BenÍtez</option><option value="LILIA ESTHER ARROCHA ARAUZ">Lilia Esther Arrocha AraÚz</option><option value="LORIELA RAMOS DELGADO">Loriela Ramos Delgado</option><option value="JORGE GONZALEZ PEREZ">Jorge González Pérez</option><option value="Dionisia Luna Cedeño">Dionisia Luna Cedeño</option><option value="KATINA PEREZ">Katina Pérez</option><option value="JONATHAN LARA">Jonathan Lara</option><option value="VICTOR AGRAZAL">Victor Agrazal</option><option value="CARMEN CASTILLO">Carmen Castillo</option><option value="LENIA DUMASA">Lenia Dumasa</option></select></td></tr><tr><td>Identificación C</td><td><input name="CBankSignerCID" type="text" id="CBankSignerCID" size="10" readonly></td></tr>');
            break;
        case "59":
            $('#CCommission').val(3.00).attr('readonly', 'readonly');
            $('#CFees').val(203.30).attr('readonly', 'readonly');
            $('#insurerN').show();
            $('#insurerU').hide();
            $('#empower').html('<tr><td>Firma Autorizada 1</td><td><input name="CBankSignerA" type="text" id="CBankSignerA" size="25"></td></tr><tr><td>Identificación 1</td><td><input name="CBankSignerAID" type="text" id="CBankSignerAID" size="10"></td></tr>');
            $('#authorized').html('<tr><td>Firma Autorizada 2</td><td><input name="CBankSignerB" type="text" id="CBankSignerB" size="25"></td></tr><tr><td>Identificación 2</td><td><input name="CBankSignerBID" type="text" id="CBankSignerBID" size="10"></td></tr><tr><td>Firma Autorizada 3</td><td><input name="CBankSignerC" type="text" id="CBankSignerC" size="25"></td></tr><tr><td>Identificación 3</td><td><input name="CBankSignerCID" type="text" id="CBankSignerCID" size="10"></td></tr>');
            break;
        case "63":
            $('#CCommission').val(3.00).attr('readonly', 'readonly');
            $('#CFees').val(181.90).attr('readonly', 'readonly');
            $('#insurerN').show();
            $('#insurerU').hide();
            $('#empower').html('<tr><td>Firma Autorizada 1</td><td><input name="CBankSignerA" type="text" id="CBankSignerA" size="25"></td></tr><tr><td>Identificación 1</td><td><input name="CBankSignerAID" type="text" id="CBankSignerAID" size="10"></td></tr>');
            $('#authorized').html('<tr><td>Firma Autorizada 2</td><td><input name="CBankSignerB" type="text" id="CBankSignerB" size="25"></td></tr><tr><td>Identificación 2</td><td><input name="CBankSignerBID" type="text" id="CBankSignerBID" size="10"></td></tr><tr><td>Firma Autorizada 3</td><td><input name="CBankSignerC" type="text" id="CBankSignerC" size="25"></td></tr><tr><td>Identificación 3</td><td><input name="CBankSignerCID" type="text" id="CBankSignerCID" size="10"></td></tr>');
            break;
        case "65":
            $('#CCommission').val(3.00).attr('readonly', 'readonly');
            $('#CFees').val(192.60).attr('readonly', 'readonly');
            $('#insurerN').show();
            $('#insurerU').hide();
            $('#empower').html('<tr><td>Firma Autorizada 1</td><td><input name="CBankSignerA" type="text" id="CBankSignerA" size="25"></td></tr><tr><td>Identificación 1</td><td><input name="CBankSignerAID" type="text" id="CBankSignerAID" size="10"></td></tr>');
            $('#authorized').html('<tr><td>Firma Autorizada 2</td><td><input name="CBankSignerB" type="text" id="CBankSignerB" size="25"></td></tr><tr><td>Identificación 2</td><td><input name="CBankSignerBID" type="text" id="CBankSignerBID" size="10"></td></tr><tr><td>Firma Autorizada 3</td><td><input name="CBankSignerC" type="text" id="CBankSignerC" size="25"></td></tr><tr><td>Identificación 3</td><td><input name="CBankSignerCID" type="text" id="CBankSignerCID" size="10"></td></tr>');
            break;
        case "81":
            $('#CCommission').val(4.00).attr('readonly', 'readonly');
            $('#CFees').val(214.00).attr('readonly', 'readonly');
            $('#insurerN').show();
            $('#insurerU').hide();
            $('#empower').html('<tr><td>Firma Autorizada 1</td><td><input name="CBankSignerA" type="text" id="CBankSignerA" size="25"></td></tr><tr><td>Identificación 1</td><td><input name="CBankSignerAID" type="text" id="CBankSignerAID" size="10"></td></tr>');
            $('#authorized').html('<tr><td>Firma Autorizada 2</td><td><input name="CBankSignerB" type="text" id="CBankSignerB" size="25"></td></tr><tr><td>Identificación 2</td><td><input name="CBankSignerBID" type="text" id="CBankSignerBID" size="10"></td></tr><tr><td>Firma Autorizada 3</td><td><input name="CBankSignerC" type="text" id="CBankSignerC" size="25"></td></tr><tr><td>Identificación 3</td><td><input name="CBankSignerCID" type="text" id="CBankSignerCID" size="10"></td></tr>');
            break;
        case "61":
            $('#CCommission').val(3.00).attr('readonly', 'readonly');
            $('#CFees').val(187.25).attr('readonly', 'readonly');
            $('#insurerU').show();
            $('#insurerN').hide();
            $('#empower').html('<tr><td>Firma Autorizada 1</td><td><input name="CBankSignerA" type="text" id="CBankSignerA" size="25"></td></tr><tr><td>Identificación 1</td><td><input name="CBankSignerAID" type="text" id="CBankSignerAID" size="10"></td></tr>');
            $('#authorized').html('<tr><td>Firma Autorizada 2</td><td><input name="CBankSignerB" type="text" id="CBankSignerB" size="25"></td></tr><tr><td>Identificación 2</td><td><input name="CBankSignerBID" type="text" id="CBankSignerBID" size="10"></td></tr><tr><td>Firma Autorizada 3</td><td><input name="CBankSignerC" type="text" id="CBankSignerC" size="25"></td></tr><tr><td>Identificación 3</td><td><input name="CBankSignerCID" type="text" id="CBankSignerCID" size="10"></td></tr>');
            $('#lifeins').html('<tr><td>Póliza de Vida</td><td><select name="CInsurer" id="CInsurer" class="required"><option value="" selected>Seleccione la Póliza de Vida</option><option value="DENTRO DEL COLECTIVO DEL BANCO">Dentro del Colectivo del Banco</option><option value="ENDOSADA A FAVOR DE BUSA">Endosada a favor de BUSA</option></select></td></tr>');
            $('#autoins').html('<tr><td>Seguro de Auto</td><td><select name="CAssesor" id="CAssesor" class="required"><option value="" selected>Seleccione el Seguro de Auto</option><option value="DENTRO DEL COLECTIVO DEL BANCO">Dentro del Colectivo del Banco</option><option value="ENDOSADO A FAVOR DE BUSA">Endosado a favor de BUSA</option></select></td></tr>');
            break;
        case "97":
            $('#CCommission').val(3.00).attr('readonly', 'readonly');
            $('#CFees').val(187.25).attr('readonly', 'readonly');
            $('#empower').html('<tr><td>Firma Autorizada Contrato</td><td><select name="CBankSignerA" id="CBankSignerA"><option value="" selected>Seleccione el Apoderado</option><option value="BELKYS MAYKELYS HIDALGO REYES">Belkys Maykelys Hidalgo Reyes</option><option value="CARLA VACA RICO">Carla Vaca Rico</option><option value="EDUARDO ALBERTO IRIBARREN RENDON">Eduardo Alberto Iribarren Rendón</option><option value="EDMUNDO JAVIER IBAÑEZ TEJERINA">Edmundo Javier Ibañez Tejerina</option><option value="IRIABELL IANAITH RODRIGUEZ SANDOVAL">Iriabell Ianaith Rodríguez Sandoval</option><option value="KIRIA YANETH ADAMES MIRANDA">Kiria Yaneth Adames Miranda</option><option value="MILEIBY EDITH FRAGOZA MARQUEZ">Mileiby Edith Fragoza Márquez</option><option value="OMAR XAVIER GONZALEZ ARCIA">Omar Xavier González Arcia</option><option value="YOEL JOSE ROSALES UMBRIA">Yoel José Rosales Umbria</option><option value="VIELSA MAGALIS DOMINGUEZ CAMAÑO">Vielsa Magalis Domínguez Camaño</option></select><input type="hidden" name="CBankSignerAID" id="CBankSignerAID"><input type="hidden" name="CBankSignerAIDType" id="CBankSignerAIDType"><input type="hidden" name="CBankSignerASex" id="CBankSignerASex"><input type="hidden" name="CBankSignerAStatus" id="CBankSignerAStatus"><input type="hidden" name="CBankSignerAPosition" id="CBankSignerAPosition"><input type="hidden" name="CBankSignerACitizenship" id="CBankSignerACitizenship"></td></tr>');
            $('#authorized').html('<tr><td>Firma Autorizada Promesa</td><td><select name="CBankSignerB" id="CBankSignerB"><option value="" selected>Seleccione el Firmante de Carta</option><option value="ARLINE VANESSA VALDERRAMA ARROCHA">Arline Vanessa Valderrama Arrocha</option><option value="ESTEFANY ESCOBAR">Estefany Escobar</option></select></td></tr>');
            break;
        case "115":
            $('#CCommission').val(3.00).attr('readonly', 'readonly');
            $('#CFees').val(187.25).attr('readonly', 'readonly');
            $('#empower').html('<tr><td>Firma Autorizada Contrato</td><td><select name="CBankSignerA" id="CBankSignerA"><option value="" selected>Seleccione el Apoderado</option><option value="GUADALUPE M. FREIJEDO">Guadalupe M. Freijedo</option><option value="LUIS CARLOS DIAZ MARMOLEJO">Luis Carlos Diaz Marmolejo</option></select><input type="hidden" name="CBankSignerAID" id="CBankSignerAID"><input type="hidden" name="CBankSignerAIDType" id="CBankSignerAIDType"><input type="hidden" name="CBankSignerASex" id="CBankSignerASex"><input type="hidden" name="CBankSignerAStatus" id="CBankSignerAStatus"><input type="hidden" name="CBankSignerAPosition" id="CBankSignerAPosition"><input type="hidden" name="CBankSignerACitizenship" id="CBankSignerACitizenship"></td></tr>');
            $('#authorized').html('<tr><td>Firma Autorizada Cartas</td><td><select name="CBankSignerB" id="CBankSignerB"><option value="" selected>Seleccione el Firmante de Cartas</option><option value="PRISCILA M. GONZALEZ">Priscila M. González</option><option value="LUIS CARLOS DIAZ M.">Luis Carlos Díaz M.</option></select></td></tr>');
            break;
        default:
            $('#CCommission').val(0.00).removeAttr('readonly');
            $('#CFees').val('').removeAttr('readonly');
            $('#insurerN').show();
            $('#insurerU').hide();
            $('#empower').html('<tr><td>Firma Autorizada 1</td><td><input name="CBankSignerA" type="text" id="CBankSignerA" size="25"></td></tr><tr><td>Identificación 1</td><td><input name="CBankSignerAID" type="text" id="CBankSignerAID" size="10"></td></tr>');
            $('#authorized').html('<tr><td>Firma Autorizada 2</td><td><input name="CBankSignerB" type="text" id="CBankSignerB" size="25"></td></tr><tr><td>Identificación 2</td><td><input name="CBankSignerBID" type="text" id="CBankSignerBID" size="10"></td></tr><tr><td>Firma Autorizada 3</td><td><input name="CBankSignerC" type="text" id="CBankSignerC" size="25"></td></tr><tr><td>Identificación 3</td><td><input name="CBankSignerCID" type="text" id="CBankSignerCID" size="10"></td></tr>');
            $('#lifeins').html('<tr><td>Poliza de Vida</td><td><input name="CInsurer" type="text" id="CInsurer" size="25"></td></tr>');
            $('#autoins').html('<tr><td>Seguro del Auto</td><td><input name="CAssessor" type="text" id="CAssessor" size="25"></td></tr>');
            break;
    }
});

$(document).on('change', '#CBankSignerA', function () {
    switch ($(this).val()) {
        // Caja de Ahorros
        case "OLIMPO ARIEL QUINTERO BECERRA":
            $('#CBankSignerAID').val('8-720-596');
            $('#CBankSignerASex').val('varón');
            $('#CBankSignerAStatus').val('casado');
            $('#CBankSignerAPosition').val('Gerente de Productos de Banca Personal');
            break;
        case "MELISSA EUGENIA URRIOLA DE COHEN":
            $('#CBankSignerAID').val('9-701-2064');
            $('#CBankSignerASex').val('mujer');
            $('#CBankSignerAStatus').val('casada');
            $('#CBankSignerAPosition').val('Gerente Ejecutiva de Banca Personal');
            break;
            // Allbank
        case "ANGELA JOSEFINA VILLASMIL MARQUEZ":
            $('#CBankSignerAID').val('070885132');
            $('#CBankSignerAIDType').val('pasaporte');
            $('#CBankSignerASex').val('mujer');
            $('#CBankSignerAStatus').val('casada');
            $('#CBankSignerACitizenship').val('venezolana');
            $('#CBankSignerAPosition').val('Banquera');
            break;
        case "SANTOS ALONSO RAMOS":
            $('#CBankSignerAID').val('E-8-102-952');
            $('#CBankSignerAIDType').val('cédula');
            $('#CBankSignerASex').val('varón');
            $('#CBankSignerAStatus').val('casado');
            $('#CBankSignerACitizenship').val('español');
            $('#CBankSignerAPosition').val('Banquero');
            break;
        case "DANIEL OBLITAS TEJADA":
            $('#CBankSignerAID').val('E-8-120807');
            $('#CBankSignerAIDType').val('cédula');
            $('#CBankSignerASex').val('varón');
            $('#CBankSignerAStatus').val('casado');
            $('#CBankSignerACitizenship').val('peruano');
            $('#CBankSignerAPosition').val('Banquero');
            break;
        case "MAYRA LONDOÑO CASTILLERO":
            $('#CBankSignerAID').val('9-129-567');
            $('#CBankSignerAIDType').val('cédula');
            $('#CBankSignerASex').val('mujer');
            $('#CBankSignerAStatus').val('casada');
            $('#CBankSignerACitizenship').val('panameña');
            $('#CBankSignerAPosition').val('Banquera');
            break;
        case "KIRA ODERAY GARDELLINI ESCOBAR":
            $('#CBankSignerAID').val('8-441-454');
            $('#CBankSignerAIDType').val('cédula');
            $('#CBankSignerASex').val('mujer');
            $('#CBankSignerAStatus').val('casada');
            $('#CBankSignerACitizenship').val('panameña');
            $('#CBankSignerAPosition').val('Banquera');
            break;
        case "MARCO ANTONIO FORERO PEREZ":
            $('#CBankSignerAID').val('8-345-273');
            $('#CBankSignerAIDType').val('cédula');
            $('#CBankSignerASex').val('varón');
            $('#CBankSignerAStatus').val('casado');
            $('#CBankSignerACitizenship').val('panameño');
            $('#CBankSignerAPosition').val('Banquero');
            break;
            // Scotiabank
        case "BRITTANIA AMAYA":
            $('#CBankSignerAID').val('8-374-770');
            $('#CBankSignerAIDType').val('cédula');
            $('#CBankSignerASex').val('mujer');
            $('#CBankSignerAStatus').val('casada');
            $('#CBankSignerACitizenship').val('panameña');
            $('#CBankSignerAPosition').val('Banquera');
            break;
        case "KATHERINA HOWARD":
            $('#CBankSignerAID').val('8-434-561');
            $('#CBankSignerAIDType').val('cédula');
            $('#CBankSignerASex').val('mujer');
            $('#CBankSignerAStatus').val('casada');
            $('#CBankSignerACitizenship').val('panameña');
            $('#CBankSignerAPosition').val('Banquera');
            break;
        case "RAMON MARCELINO":
            $('#CBankSignerAID').val('SC1131987');
            $('#CBankSignerAIDType').val('pasaporte');
            $('#CBankSignerASex').val('varón');
            $('#CBankSignerAStatus').val('casado');
            $('#CBankSignerACitizenship').val('dominicano');
            $('#CBankSignerAPosition').val('Banquero');
            break;
        case "ALEXANDRA CRISTINA CALIXTO DE VELASCO":
            $('#CBankSignerAID').val('E-8-79982');
            $('#CBankSignerAIDType').val('cédula');
            $('#CBankSignerASex').val('mujer');
            $('#CBankSignerAStatus').val('casada');
            $('#CBankSignerACitizenship').val('brasileña');
            $('#CBankSignerAPosition').val('Banquera');
            break;
        case "SILVIA LEE":
            $('#CBankSignerAID').val('8-327-272');
            $('#CBankSignerAIDType').val('cédula');
            $('#CBankSignerASex').val('mujer');
            $('#CBankSignerAStatus').val('casada');
            $('#CBankSignerACitizenship').val('panameña');
            $('#CBankSignerAPosition').val('Banquera');
            break;
        case "YADILIA PINO OLIVE":
            $('#CBankSignerAID').val('8-704-732');
            $('#CBankSignerAIDType').val('cédula');
            $('#CBankSignerASex').val('mujer');
            $('#CBankSignerAStatus').val('casada');
            $('#CBankSignerACitizenship').val('panameña');
            $('#CBankSignerAPosition').val('Banquera');
            break;
        case "SONYA BELINDA MUÑOZ HUGHES":
            $('#CBankSignerAID').val('8-309-274');
            $('#CBankSignerAIDType').val('cédula');
            $('#CBankSignerASex').val('mujer');
            $('#CBankSignerAStatus').val('casada');
            $('#CBankSignerACitizenship').val('panameña');
            $('#CBankSignerAPosition').val('Banquera');
            break;
        case "GICELA NACARI TEJADA DE VACA":
            $('#CBankSignerAID').val('7-93-2300');
            $('#CBankSignerAIDType').val('cédula');
            $('#CBankSignerASex').val('mujer');
            $('#CBankSignerAStatus').val('casada');
            $('#CBankSignerACitizenship').val('panameña');
            $('#CBankSignerAPosition').val('Banquera');
            break;
        case "IRAIZA ARGELIS ACHON BALLESTERO":
            $('#CBankSignerAID').val('3-81-1477');
            $('#CBankSignerAIDType').val('cédula');
            $('#CBankSignerASex').val('mujer');
            $('#CBankSignerAStatus').val('soltera');
            $('#CBankSignerACitizenship').val('panameña');
            $('#CBankSignerAPosition').val('Banquera');
            break;
            // Suma Financiera
        case "BELKYS MAYKELYS HIDALGO REYES":
            $('#CBankSignerAID').val('8-732-628');
            $('#CBankSignerAIDType').val('cédula');
            $('#CBankSignerASex').val('mujer');
            $('#CBankSignerAStatus').val('casada');
            $('#CBankSignerACitizenship').val('panameña');
            $('#CBankSignerAPosition').val('Licenciada en Banca y Finanzas');
            break;
        case "CARLA VACA RICO":
            $('#CBankSignerAID').val('1891155');
            $('#CBankSignerAIDType').val('pasaporte');
            $('#CBankSignerASex').val('mujer');
            $('#CBankSignerAStatus').val('soltera');
            $('#CBankSignerACitizenship').val('boliviana');
            $('#CBankSignerAPosition').val('Administradora');
            break;
        case "EDUARDO ALBERTO IRIBARREN RENDON":
            $('#CBankSignerAID').val('E-8-102808');
            $('#CBankSignerAIDType').val('cédula');
            $('#CBankSignerASex').val('varón');
            $('#CBankSignerAStatus').val('soltero');
            $('#CBankSignerACitizenship').val('venezolano');
            $('#CBankSignerAPosition').val('Ingeniero');
            break;
        case "EDMUNDO JAVIER IBAÑEZ TEJERINA":
            $('#CBankSignerAID').val('3329546');
            $('#CBankSignerAIDType').val('pasaporte');
            $('#CBankSignerASex').val('varón');
            $('#CBankSignerAStatus').val('casado');
            $('#CBankSignerACitizenship').val('boliviano');
            $('#CBankSignerAPosition').val('Economista');
            break;
        case "IRIABELL IANITH RODRIGUEZ SANDOVAL":
            $('#CBankSignerAID').val('6-703-2029');
            $('#CBankSignerAIDType').val('cédula');
            $('#CBankSignerASex').val('mujer');
            $('#CBankSignerAStatus').val('soltera');
            $('#CBankSignerACitizenship').val('panameña');
            $('#CBankSignerAPosition').val('Licenciada en Administración');
            break;
        case "KIRIA YANETH ADAMES MIRANDA":
            $('#CBankSignerAID').val('4-714-1445');
            $('#CBankSignerAIDType').val('cédula');
            $('#CBankSignerASex').val('mujer');
            $('#CBankSignerAStatus').val('casada');
            $('#CBankSignerACitizenship').val('panameña');
            $('#CBankSignerAPosition').val('Economista');
            break;
        case "MILEIBY EDITH FRAGOZA MARQUEZ":
            $('#CBankSignerAID').val('E-8-145362');
            $('#CBankSignerAIDType').val('cédula');
            $('#CBankSignerASex').val('mujer');
            $('#CBankSignerAStatus').val('soltera');
            $('#CBankSignerACitizenship').val('venezolana');
            $('#CBankSignerAPosition').val('Administradora');
            break;
        case "OMAR XAVIER GONZALEZ ARCIA":
            $('#CBankSignerAID').val('8-842-78');
            $('#CBankSignerAIDType').val('cédula');
            $('#CBankSignerASex').val('varón');
            $('#CBankSignerAStatus').val('soltero');
            $('#CBankSignerACitizenship').val('panameño');
            $('#CBankSignerAPosition').val('Comerciante');
            break;
        case "YOEL JOSE ROSALES UMBRIA":
            $('#CBankSignerAID').val('030250817');
            $('#CBankSignerAIDType').val('pasaporte');
            $('#CBankSignerASex').val('varón');
            $('#CBankSignerAStatus').val('casado');
            $('#CBankSignerACitizenship').val('venezonalo');
            $('#CBankSignerAPosition').val('Comerciante');
            break;
        case "VIELSA MAGALIS DOMINGUEZ CAMAÑO":
            $('#CBankSignerAID').val('8-727-2383');
            $('#CBankSignerAIDType').val('cédula');
            $('#CBankSignerASex').val('mujer');
            $('#CBankSignerAStatus').val('soltera');
            $('#CBankSignerACitizenship').val('panameña');
            $('#CBankSignerAPosition').val('Financista');
            break;
            // Banco Lafise
        case "GUADALUPE M. FREIJEDO":
            $('#CBankSignerAID').val('2-710-399');
            $('#CBankSignerAIDType').val('cédula');
            $('#CBankSignerASex').val('mujer');
            $('#CBankSignerAStatus').val('casada');
            $('#CBankSignerACitizenship').val('panameña');
            $('#CBankSignerAPosition').val('Financista');
            break;
        case "LUIS CARLOS DIAZ MARMOLEJO":
            $('#CBankSignerAID').val('8-224-652');
            $('#CBankSignerAIDType').val('cédula');
            $('#CBankSignerASex').val('varón');
            $('#CBankSignerAStatus').val('casado');
            $('#CBankSignerACitizenship').val('panameña');
            $('#CBankSignerAPosition').val('Banquero');
            break;
        default:
            $('#CBankSignerAID').val('');
            $('#CBankSignerASex').val('');
            $('#CBankSignerAStatus').val('');
            $('#CBankSignerAPosition').val('');
            break;
    }
});

$(document).on('change', '#CBankSignerB', function () {
    switch ($(this).val()) {
        case "FARAH ORTEGA":
            $('#CBankSignerBID').val('8-729-438');
            break;
        case "JUAN ISAZA":
            $('#CBankSignerBID').val('2-702-2334');
            break;
        case "GONZALO GUTIERREZ":
            $('#CBankSignerBID').val('8-783-731');
            break;
        case "KATHIUSKA MUÑOZ":
            $('#CBankSignerBID').val('8-862-22');
            break;
        case "LAUSANNE GUTIERREZ":
            $('#CBankSignerBID').val('8-850-197');
            break;
        case "YURISSA SERRACIN":
            $('#CBankSignerBID').val('8-835-1672');
            break;
        case "SERGIO MITRE":
            $('#CBankSignerBID').val('6-701-1683');
            break;
        case "PAOLA MATUTE":
            $('#CBankSignerBID').val('8-891-227');
            break;
        case "NELSON VANEGAS":
            $('#CBankSignerBID').val('8-835-2469');
            break;
        case "LUIS RIOS":
            $('#CBankSignerBID').val('PE-13-1660');
            break;
        case "CESAR ENRIQUE BURGOS AVILA":
            $('#CBankSignerBID').val('8-230-2593');
            break;
        case "SILVIA LEE MORENO":
            $('#CBankSignerBID').val('8-327-272');
            break;
        case "EMANUEL DE JESUS RODRIGUEZ HERRERA":
            $('#CBankSignerBID').val('8-724-640');
            break;
        case "YVONNE ESTER ELLIOT BENITEZ":
            $('#CBankSignerBID').val('8-479-630');
            break;
        case "LILIA ESTHER ARROCHA ARAUZ":
            $('#CBankSignerBID').val('2-139-201');
            break;
        case "LORIELA RAMOS DELGADO":
            $('#CBankSignerBID').val('8-388-576');
            break;
        case "JORGE GONZALEZ PEREZ":
            $('#CBankSignerBID').val('8-828-2375');
            break;
        case "DIONISIA LUNA CEDEÑO":
            $('#CBankSignerBID').val('8-302-23');
            break;
        case "KATINA PEREZ":
            $('#CBankSignerBID').val('8-705-2443');
            break;
        case "JONATHAN LARA":
            $('#CBankSignerBID').val('8-844-235');
            break;
        case "VICTOR AGRAZAL":
            $('#CBankSignerBID').val('8-836-2185');
            break;
        case "CARMEN CASTILLO":
            $('#CBankSignerBID').val('8-771-71');
            break;
        case "LENIA DUMASA":
            $('#CBankSignerBID').val('5-704-253');
            break;
        case "ARLINE VANESSA VALDERRAMA ARROCHA":
            $('#CBankSignerBID').val('2-716-1107');
            break;
        case "ESTEFANY ESCOBAR":
            $('#CBankSignerBID').val('8-792-1790');
            break;
        case "PRISCILA M. GONZALEZ":
            $('#CBankSignerBID').val('Gerente de Administración de Crédito');
            break;
        case "LUIS CARLOS DIAZ M.":
            $('#CBankSignerBID').val('Vicepresidente de Crédito');
            break;
        default:
            $('#CBankSignerBID').val('');
            break;
    }
});

$(document).on('change', '#CBankSignerC', function () {
    switch ($(this).val()) {
        case "FARAH ORTEGA":
            $('#CBankSignerCID').val('8-729-438');
            break;
        case "JUAN ISAZA":
            $('#CBankSignerCID').val('2-702-2334');
            break;
        case "GONZALO GUTIERREZ":
            $('#CBankSignerCID').val('8-783-731');
            break;
        case "KATHIUSKA MUÑOZ":
            $('#CBankSignerCID').val('8-862-22');
            break;
        case "LAUSANNE GUTIERREZ":
            $('#CBankSignerCID').val('8-850-197');
            break;
        case "YURISSA SERRACIN":
            $('#CBankSignerCID').val('8-835-1672');
            break;
        case "SERGIO MITRE":
            $('#CBankSignerCID').val('6-701-1683');
            break;
        case "PAOLA MATUTE":
            $('#CBankSignerCID').val('8-891-227');
            break;
        case "NELSON VANEGAS":
            $('#CBankSignerCID').val('8-835-2469');
            break;
        case "LUIS RIOS":
            $('#CBankSignerCID').val('PE-13-1660');
            break;
        case "CESAR ENRIQUE BURGOS AVILA":
            $('#CBankSignerCID').val('8-230-2593');
            break;
        case "SILVIA LEE MORENO":
            $('#CBankSignerCID').val('8-327-272');
            break;
        case "EMANUEL DE JESUS RODRIGUEZ HERRERA":
            $('#CBankSignerCID').val('8-724-640');
            break;
        case "YVONNE ESTER ELLIOT BENITEZ":
            $('#CBankSignerCID').val('8-479-630');
            break;
        case "LILIA ESTHER ARROCHA ARAUZ":
            $('#CBankSignerCID').val('2-139-201');
            break;
        case "LORIELA RAMOS DELGADO":
            $('#CBankSignerCID').val('8-388-576');
            break;
        case "JORGE GONZALEZ PEREZ":
            $('#CBankSignerCID').val('8-828-2375');
            break;
        case "DIONISIA LUNA CEDEÑO":
            $('#CBankSignerCID').val('8-302-23');
            break;
        case "KATINA PEREZ":
            $('#CBankSignerCID').val('8-705-2443');
            break;
        case "JONATHAN LARA":
            $('#CBankSignerCID').val('8-844-235');
            break;
        case "VICTOR AGRAZAL":
            $('#CBankSignerCID').val('8-836-2185');
            break;
        case "CARMEN CASTILLO":
            $('#CBankSignerCID').val('8-771-71');
            break;
        case "LENIA DUMASA":
            $('#CBankSignerCID').val('5-704-253');
            break;
        default:
            $('#CBankSignerCID').val('');
            break;
    }
});

TCN_contents = new Array();
TCN_tempArray = new Array();
TCN_counter = 0;

function TCN_addContent(str) {
    TCN_contents[TCN_counter] = str;
    TCN_counter++;
}

function TCN_split() {
    TCN_arrayValues = new Array();
    for (i = 0; i < TCN_contents.length; i++) {
        TCN_arrayValues[i] = TCN_contents[i].split(separator);
        TCN_tempArray[0] = TCN_arrayValues;
    }
}

function TCN_makeSelValueGroup() {
    TCN_selValueGroup = new Array();
    var args = TCN_makeSelValueGroup.arguments;
    for (i = 0; i < args.length; i++) {
        TCN_selValueGroup[i] = args[i];
        TCN_tempArray[i] = new Array();
    }
}

function TCN_makeComboGroup() {
    TCN_comboGroup = new Array();
    var args = TCN_makeComboGroup.arguments;
    for (i = 0; i < args.length; i++) TCN_comboGroup[i] = findObj(args[i]);
}

function TCN_setDefault() {
    for (i = TCN_selValueGroup.length - 1; i >= 0; i--) {
        if (TCN_selValueGroup[i] != "") {
            for (j = 0; j < TCN_contents.length; j++) {
                if (TCN_arrayValues[j][(i * 2) + 1] == TCN_selValueGroup[i]) {
                    for (k = i; k >= 0; k--) {
                        if (TCN_selValueGroup[k] == "") TCN_selValueGroup[k] = TCN_arrayValues[j][(k * 2) + 1];
                    }
                }
            }
        }
    }
}

function TCN_loadMenu(daIndex) {
    var selectionMade = false;
    daArray = TCN_tempArray[daIndex];
    TCN_comboGroup[daIndex].options.length = 1;
    for (i = 0; i < daArray.length; i++) {
        existe = false;
        for (j = 0; j < TCN_comboGroup[daIndex].options.length; j++) {
            if (daArray[i][(daIndex * 2) + 1] == TCN_comboGroup[daIndex].options[j].value) existe = true;
        }
        if (existe == false) {
            lastValue = TCN_comboGroup[daIndex].options.length;
            TCN_comboGroup[daIndex].options[TCN_comboGroup[daIndex].options.length] = new Option(daArray[i][daIndex * 2], daArray[i][(daIndex * 2) + 1]);
            if (TCN_selValueGroup[daIndex] == TCN_comboGroup[daIndex].options[lastValue].value) {
                TCN_comboGroup[daIndex].options[lastValue].selected = true;
                selectionMade = true;
            }
        }
    }
    if (selectionMade == false) TCN_comboGroup[daIndex].options[0].selected = true;
}

function TCN_reload(from) {
    if (!from) {
        TCN_split();
        TCN_setDefault();
        TCN_loadMenu(0);
        TCN_reload(TCN_comboGroup[0]);
    } else {
        for (j = 0; j < TCN_comboGroup.length; j++) {
            if (TCN_comboGroup[j] == from) index = j + 1;
        }
        if (index < TCN_comboGroup.length) {
            TCN_tempArray[index].length = 0;
            for (i = 0; i < TCN_comboGroup[index - 1].options.length; i++) {
                if (TCN_comboGroup[index - 1].options[i].selected == true) {
                    for (j = 0; j < TCN_tempArray[index - 1].length; j++) {
                        if (TCN_comboGroup[index - 1].options[i].value == TCN_tempArray[index - 1][j][(index * 2) - 1]) TCN_tempArray[index][TCN_tempArray[index].length] = TCN_tempArray[index - 1][j];
                    }
                }
            }
            TCN_loadMenu(index);
            TCN_reload(TCN_comboGroup[index]);
        }
    }
}

function findObj(n, d) { //v4.01
    var p, i, x;
    if (!d) d = document;
    if ((p = n.indexOf("?")) > 0 && parent.frames.length) {
        d = parent.frames[n.substring(p + 1)].document;
        n = n.substring(0, p);
    }
    if (!(x = d[n]) && d.all) x = d.all[n];
    for (i = 0; !x && i < d.forms.length; i++) x = d.forms[i][n];
    for (i = 0; !x && d.layers && i < d.layers.length; i++) x = findObj(n, d.layers[i].document);
    if (!x && d.getElementById) x = d.getElementById(n);
    return x;
}
TCN_makeSelValueGroup("01", "0101");
TCN_makeComboGroup("TContractID", "WarrantyID");
var separator = "+#+";
TCN_addContent("Depósitos Bancarios+#+04+#+Cuentas de Ahorro+#+0401");
TCN_addContent("Depósitos Bancarios+#+04+#+Depósitos a la Vista+#+0403");
TCN_addContent("Depósitos Bancarios+#+04+#+Depósitos a Plazo+#+0402");
TCN_addContent("Inmueble+#+02+#+Aeronaves+#+0205");
TCN_addContent("Inmueble+#+02+#+Edificación+#+0203");
TCN_addContent("Inmueble+#+02+#+Naves Con Registro+#+0206");
TCN_addContent("Inmueble+#+02+#+Propiedad Horizontal+#+0204");
TCN_addContent("Inmueble+#+02+#+Terreno+#+0201");
TCN_addContent("Inmueble+#+02+#+Terreno y Edificación+#+0202");
TCN_addContent("Mueble+#+01+#+Equipo Agrícola+#+0107");
TCN_addContent("Mueble+#+01+#+Equipo Industrial+#+0106");
TCN_addContent("Mueble+#+01+#+Equipos Varios+#+0108");
TCN_addContent("Mueble+#+01+#+Flotas+#+0105");
TCN_addContent("Mueble+#+01+#+Moto Comercial+#+0104");
TCN_addContent("Mueble+#+01+#+Moto Particular+#+0103");
TCN_addContent("Mueble+#+01+#+Naves Sin Registro+#+0109");
TCN_addContent("Mueble+#+01+#+Vehículo Comercial+#+0102");
TCN_addContent("Mueble+#+01+#+Vehículo Particular+#+0101");
TCN_addContent("Otros+#+03+#+Cuentas por Cobrar+#+0303");
TCN_addContent("Otros+#+03+#+Inventario+#+0302");
TCN_addContent("Otros+#+03+#+Metales y Piedras Preciosas+#+0301");
TCN_addContent("Otros+#+03+#+Obras de Arte+#+0304");
TCN_addContent("Otros+#+03+#+Pagarés+#+0306");
TCN_addContent("Otros+#+03+#+Pagos Anticipados+#+0307");
TCN_addContent("Otros+#+03+#+Póliza de Seguro+#+0305");
TCN_reload();

TCN_contentsL = new Array();
TCN_tempArrayL = new Array();
TCN_counterL = 0;

function TCN_addContentL(str) {
    TCN_contentsL[TCN_counterL] = str;
    TCN_counterL++;
}

function TCN_splitL() {
    TCN_arrayValuesL = new Array();
    for (i = 0; i < TCN_contentsL.length; i++) {
        TCN_arrayValuesL[i] = TCN_contentsL[i].split(separator);
        TCN_tempArrayL[0] = TCN_arrayValuesL;
    }
}

function TCN_makeSelValueGroupL() {
    TCN_selValueGroupL = new Array();
    var args = TCN_makeSelValueGroupL.arguments;
    for (i = 0; i < args.length; i++) {
        TCN_selValueGroupL[i] = args[i];
        TCN_tempArrayL[i] = new Array();
    }
}

function TCN_makeComboGroupL() {
    TCN_comboGroupL = new Array();
    var args = TCN_makeComboGroupL.arguments;
    for (i = 0; i < args.length; i++) TCN_comboGroupL[i] = findObj(args[i]);
}

function TCN_setDefaultL() {
    for (i = TCN_selValueGroupL.length - 1; i >= 0; i--) {
        if (TCN_selValueGroupL[i] != "") {
            for (j = 0; j < TCN_contentsL.length; j++) {
                if (TCN_arrayValuesL[j][(i * 2) + 1] == TCN_selValueGroupL[i]) {
                    for (k = i; k >= 0; k--) {
                        if (TCN_selValueGroupL[k] == "") TCN_selValueGroupL[k] = TCN_arrayValuesL[j][(k * 2) + 1];
                    }
                }
            }
        }
    }
}

function TCN_loadMenuL(daIndexL) {
    var selectionMadeL = false;
    daArrayL = TCN_tempArrayL[daIndexL];
    TCN_comboGroupL[daIndexL].options.length = 1;
    for (i = 0; i < daArrayL.length; i++) {
        existeL = false;
        for (j = 0; j < TCN_comboGroupL[daIndexL].options.length; j++) {
            if (daArrayL[i][(daIndexL * 2) + 1] == TCN_comboGroupL[daIndexL].options[j].value) existeL = true;
        }
        if (existeL == false) {
            lastValueL = TCN_comboGroupL[daIndexL].options.length;
            TCN_comboGroupL[daIndexL].options[TCN_comboGroupL[daIndexL].options.length] = new Option(daArrayL[i][daIndexL * 2], daArrayL[i][(daIndexL * 2) + 1]);
            if (TCN_selValueGroupL[daIndexL] == TCN_comboGroupL[daIndexL].options[lastValueL].value) {
                TCN_comboGroupL[daIndexL].options[lastValueL].selected = true;
                selectionMadeL = true;
            }
        }
    }
    if (selectionMadeL == false) TCN_comboGroupL[daIndexL].options[0].selected = true;
}

function TCN_reloadL(from) {
    if (!from) {
        TCN_splitL();
        TCN_setDefaultL();
        TCN_loadMenuL(0);
        TCN_reloadL(TCN_comboGroupL[0]);
    } else {
        for (j = 0; j < TCN_comboGroupL.length; j++) {
            if (TCN_comboGroupL[j] == from) index = j + 1;
        }
        if (index < TCN_comboGroupL.length) {
            TCN_tempArrayL[index].length = 0;
            for (i = 0; i < TCN_comboGroupL[index - 1].options.length; i++) {
                if (TCN_comboGroupL[index - 1].options[i].selected == true) {
                    for (j = 0; j < TCN_tempArrayL[index - 1].length; j++) {
                        if (TCN_comboGroupL[index - 1].options[i].value == TCN_tempArrayL[index - 1][j][(index * 2) - 1]) TCN_tempArrayL[index][TCN_tempArrayL[index].length] = TCN_tempArrayL[index - 1][j];
                    }
                }
            }
            TCN_loadMenuL(index);
            TCN_reloadL(TCN_comboGroupL[index]);
        }
    }
}

TCN_makeSelValueGroupL("Seleccione una Provincia", "Seleccione un Distrito", "Seleccione un Corregimiento");
TCN_makeComboGroupL("CProvince", "CDistrict", "CCorregiment");
var separator = "+#+";
TCN_addContentL("Bocas del Toro+#+1+#+Bocas del Toro+#+1+#+Bastimentos+#+2");
TCN_addContentL("Bocas del Toro+#+1+#+Bocas del Toro+#+1+#+Bocas del Toro+#+1");
TCN_addContentL("Bocas del Toro+#+1+#+Bocas del Toro+#+1+#+Cauchero+#+3");
TCN_addContentL("Bocas del Toro+#+1+#+Bocas del Toro+#+1+#+Punta Laurel+#+4");
TCN_addContentL("Bocas del Toro+#+1+#+Bocas del Toro+#+1+#+Tierra Oscura+#+5");
TCN_addContentL("Bocas del Toro+#+1+#+Changuinola+#+2+#+Almirante+#+7");
TCN_addContentL("Bocas del Toro+#+1+#+Changuinola+#+2+#+Changuinola+#+6");
TCN_addContentL("Bocas del Toro+#+1+#+Changuinola+#+2+#+El Empalme+#+11");
TCN_addContentL("Bocas del Toro+#+1+#+Changuinola+#+2+#+El Teribe+#+9");
TCN_addContentL("Bocas del Toro+#+1+#+Changuinola+#+2+#+Guabito+#+8");
TCN_addContentL("Bocas del Toro+#+1+#+Changuinola+#+2+#+Las Tablas+#+12");
TCN_addContentL("Bocas del Toro+#+1+#+Changuinola+#+2+#+Valle del Risco+#+10");
TCN_addContentL("Bocas del Toro+#+1+#+Chiriquí Grande+#+3+#+Chiriquí Grande+#+13");
TCN_addContentL("Bocas del Toro+#+1+#+Chiriquí Grande+#+3+#+Miramar+#+14");
TCN_addContentL("Bocas del Toro+#+1+#+Chiriquí Grande+#+3+#+Punta Peña+#+15");
TCN_addContentL("Bocas del Toro+#+1+#+Chiriquí Grande+#+3+#+Punta Róbalo+#+16");
TCN_addContentL("Bocas del Toro+#+1+#+Chiriquí Grande+#+3+#+Rambala+#+17");
TCN_addContentL("Chiriquí+#+4+#+Alanje+#+14+#+Alanje+#+95");
TCN_addContentL("Chiriquí+#+4+#+Alanje+#+14+#+Canta Gallo+#+102");
TCN_addContentL("Chiriquí+#+4+#+Alanje+#+14+#+Divalá+#+96");
TCN_addContentL("Chiriquí+#+4+#+Alanje+#+14+#+El Tejar+#+97");
TCN_addContentL("Chiriquí+#+4+#+Alanje+#+14+#+Guarumal+#+98");
TCN_addContentL("Chiriquí+#+4+#+Alanje+#+14+#+Nuevo México+#+103");
TCN_addContentL("Chiriquí+#+4+#+Alanje+#+14+#+Palo Grande+#+99");
TCN_addContentL("Chiriquí+#+4+#+Alanje+#+14+#+Querévalo+#+100");
TCN_addContentL("Chiriquí+#+4+#+Alanje+#+14+#+Santo Tomás+#+101");
TCN_addContentL("Chiriquí+#+4+#+Barú+#+15+#+Baco+#+107");
TCN_addContentL("Chiriquí+#+4+#+Barú+#+15+#+Limones+#+105");
TCN_addContentL("Chiriquí+#+4+#+Barú+#+15+#+Progreso+#+106");
TCN_addContentL("Chiriquí+#+4+#+Barú+#+15+#+Puerto Armuelles+#+104");
TCN_addContentL("Chiriquí+#+4+#+Barú+#+15+#+Rodolfo Aguilar Delgado+#+108");
TCN_addContentL("Chiriquí+#+4+#+Boquerón+#+16+#+Bágala+#+110");
TCN_addContentL("Chiriquí+#+4+#+Boquerón+#+16+#+Boquerón+#+109");
TCN_addContentL("Chiriquí+#+4+#+Boquerón+#+16+#+Cordillera+#+111");
TCN_addContentL("Chiriquí+#+4+#+Boquerón+#+16+#+Guabal+#+112");
TCN_addContentL("Chiriquí+#+4+#+Boquerón+#+16+#+Guayabal+#+113");
TCN_addContentL("Chiriquí+#+4+#+Boquerón+#+16+#+Paraíso+#+114");
TCN_addContentL("Chiriquí+#+4+#+Boquerón+#+16+#+Pedregal+#+115");
TCN_addContentL("Chiriquí+#+4+#+Boquerón+#+16+#+Tijeras+#+116");
TCN_addContentL("Chiriquí+#+4+#+Boquete+#+17+#+Alto Boquete+#+120");
TCN_addContentL("Chiriquí+#+4+#+Boquete+#+17+#+Bajo Boquete+#+117");
TCN_addContentL("Chiriquí+#+4+#+Boquete+#+17+#+Caldera+#+118");
TCN_addContentL("Chiriquí+#+4+#+Boquete+#+17+#+Jaramillo+#+121");
TCN_addContentL("Chiriquí+#+4+#+Boquete+#+17+#+Los Naranjos+#+122");
TCN_addContentL("Chiriquí+#+4+#+Boquete+#+17+#+Palmira+#+119");
TCN_addContentL("Chiriquí+#+4+#+Bugaba+#+18+#+Aserrío de Gariché+#+124");
TCN_addContentL("Chiriquí+#+4+#+Bugaba+#+18+#+Bugaba+#+125");
TCN_addContentL("Chiriquí+#+4+#+Bugaba+#+18+#+Cerro Punta+#+126");
TCN_addContentL("Chiriquí+#+4+#+Bugaba+#+18+#+El Bongo+#+135");
TCN_addContentL("Chiriquí+#+4+#+Bugaba+#+18+#+Gómez+#+127");
TCN_addContentL("Chiriquí+#+4+#+Bugaba+#+18+#+La Concepción+#+123");
TCN_addContentL("Chiriquí+#+4+#+Bugaba+#+18+#+La Estrella+#+128");
TCN_addContentL("Chiriquí+#+4+#+Bugaba+#+18+#+San Andrés+#+129");
TCN_addContentL("Chiriquí+#+4+#+Bugaba+#+18+#+Santa Marta+#+130");
TCN_addContentL("Chiriquí+#+4+#+Bugaba+#+18+#+Santa Rosa+#+131");
TCN_addContentL("Chiriquí+#+4+#+Bugaba+#+18+#+Santo Domingo+#+132");
TCN_addContentL("Chiriquí+#+4+#+Bugaba+#+18+#+Sortová+#+133");
TCN_addContentL("Chiriquí+#+4+#+Bugaba+#+18+#+Volcán+#+134");
TCN_addContentL("Chiriquí+#+4+#+David+#+19+#+Bijagual+#+137");
TCN_addContentL("Chiriquí+#+4+#+David+#+19+#+Chiriquí+#+139");
TCN_addContentL("Chiriquí+#+4+#+David+#+19+#+Cochea+#+138");
TCN_addContentL("Chiriquí+#+4+#+David+#+19+#+David+#+136");
TCN_addContentL("Chiriquí+#+4+#+David+#+19+#+Guacá+#+140");
TCN_addContentL("Chiriquí+#+4+#+David+#+19+#+Las Lomas+#+141");
TCN_addContentL("Chiriquí+#+4+#+David+#+19+#+Pedregal+#+142");
TCN_addContentL("Chiriquí+#+4+#+David+#+19+#+San Carlos+#+143");
TCN_addContentL("Chiriquí+#+4+#+David+#+19+#+San Pablo Nuevo+#+144");
TCN_addContentL("Chiriquí+#+4+#+David+#+19+#+San Pablo Viejo+#+145");
TCN_addContentL("Chiriquí+#+4+#+Dolega+#+20+#+Dolega+#+146");
TCN_addContentL("Chiriquí+#+4+#+Dolega+#+20+#+Dos Ríos+#+147");
TCN_addContentL("Chiriquí+#+4+#+Dolega+#+20+#+Los Algarrobos+#+153");
TCN_addContentL("Chiriquí+#+4+#+Dolega+#+20+#+Los Anastacios+#+148");
TCN_addContentL("Chiriquí+#+4+#+Dolega+#+20+#+Potrerillos+#+149");
TCN_addContentL("Chiriquí+#+4+#+Dolega+#+20+#+Potrerillos Abajo+#+150");
TCN_addContentL("Chiriquí+#+4+#+Dolega+#+20+#+Rovira+#+151");
TCN_addContentL("Chiriquí+#+4+#+Dolega+#+20+#+Tinajas+#+152");
TCN_addContentL("Chiriquí+#+4+#+Gualaca+#+21+#+Gualaca+#+154");
TCN_addContentL("Chiriquí+#+4+#+Gualaca+#+21+#+Hornito+#+155");
TCN_addContentL("Chiriquí+#+4+#+Gualaca+#+21+#+Los Angeles+#+156");
TCN_addContentL("Chiriquí+#+4+#+Gualaca+#+21+#+Paja de Sombrero+#+157");
TCN_addContentL("Chiriquí+#+4+#+Gualaca+#+21+#+Rincón+#+158");
TCN_addContentL("Chiriquí+#+4+#+Remedios+#+22+#+El Nancito+#+160");
TCN_addContentL("Chiriquí+#+4+#+Remedios+#+22+#+El Porvenir+#+161");
TCN_addContentL("Chiriquí+#+4+#+Remedios+#+22+#+El Puerto+#+162");
TCN_addContentL("Chiriquí+#+4+#+Remedios+#+22+#+Remedios+#+159");
TCN_addContentL("Chiriquí+#+4+#+Remedios+#+22+#+Santa Lucía+#+163");
TCN_addContentL("Chiriquí+#+4+#+Renacimiento+#+23+#+Breñón+#+165");
TCN_addContentL("Chiriquí+#+4+#+Renacimiento+#+23+#+Cañas Gordas+#+166");
TCN_addContentL("Chiriquí+#+4+#+Renacimiento+#+23+#+Dominical+#+170");
TCN_addContentL("Chiriquí+#+4+#+Renacimiento+#+23+#+Monte Lirio+#+167");
TCN_addContentL("Chiriquí+#+4+#+Renacimiento+#+23+#+Plaza de Caisán+#+168");
TCN_addContentL("Chiriquí+#+4+#+Renacimiento+#+23+#+Río Sereno+#+164");
TCN_addContentL("Chiriquí+#+4+#+Renacimiento+#+23+#+Santa Clara+#+171");
TCN_addContentL("Chiriquí+#+4+#+Renacimiento+#+23+#+Santa Cruz+#+169");
TCN_addContentL("Chiriquí+#+4+#+San Félix+#+24+#+Juay+#+173");
TCN_addContentL("Chiriquí+#+4+#+San Félix+#+24+#+Lajas Adentro+#+175");
TCN_addContentL("Chiriquí+#+4+#+San Félix+#+24+#+Las Lajas+#+172");
TCN_addContentL("Chiriquí+#+4+#+San Félix+#+24+#+San Félix+#+174");
TCN_addContentL("Chiriquí+#+4+#+San Félix+#+24+#+Santa Cruz+#+176");
TCN_addContentL("Chiriquí+#+4+#+San Lorenzo+#+25+#+Boca Chica+#+178");
TCN_addContentL("Chiriquí+#+4+#+San Lorenzo+#+25+#+Boca del Monte+#+179");
TCN_addContentL("Chiriquí+#+4+#+San Lorenzo+#+25+#+Horconcitos+#+177");
TCN_addContentL("Chiriquí+#+4+#+San Lorenzo+#+25+#+San Juan+#+180");
TCN_addContentL("Chiriquí+#+4+#+San Lorenzo+#+25+#+San Lorenzo+#+181");
TCN_addContentL("Chiriquí+#+4+#+Tolé+#+26+#+Bella Vista+#+187");
TCN_addContentL("Chiriquí+#+4+#+Tolé+#+26+#+Cerro Viejo+#+183");
TCN_addContentL("Chiriquí+#+4+#+Tolé+#+26+#+El Cristo+#+188");
TCN_addContentL("Chiriquí+#+4+#+Tolé+#+26+#+Justo Fidel Palacios+#+189");
TCN_addContentL("Chiriquí+#+4+#+Tolé+#+26+#+Lajas de Tolé+#+184");
TCN_addContentL("Chiriquí+#+4+#+Tolé+#+26+#+Potrero de Caña+#+185");
TCN_addContentL("Chiriquí+#+4+#+Tolé+#+26+#+Quebrada de Piedra+#+186");
TCN_addContentL("Chiriquí+#+4+#+Tolé+#+26+#+Tolé+#+182");
TCN_addContentL("Chiriquí+#+4+#+Tolé+#+26+#+Veladero+#+190");
TCN_addContentL("Coclé+#+2+#+Aguadulce+#+4+#+Aguadulce+#+18");
TCN_addContentL("Coclé+#+2+#+Aguadulce+#+4+#+Barrios Unidos+#+22");
TCN_addContentL("Coclé+#+2+#+Aguadulce+#+4+#+El Cristo+#+19");
TCN_addContentL("Coclé+#+2+#+Aguadulce+#+4+#+El Roble+#+20");
TCN_addContentL("Coclé+#+2+#+Aguadulce+#+4+#+Pocrí+#+21");
TCN_addContentL("Coclé+#+2+#+Antón+#+5+#+Antón+#+23");
TCN_addContentL("Coclé+#+2+#+Antón+#+5+#+Caballero+#+32");
TCN_addContentL("Coclé+#+2+#+Antón+#+5+#+Cabuya+#+24");
TCN_addContentL("Coclé+#+2+#+Antón+#+5+#+El Chirú+#+25");
TCN_addContentL("Coclé+#+2+#+Antón+#+5+#+El Retiro+#+26");
TCN_addContentL("Coclé+#+2+#+Antón+#+5+#+El Valle+#+27");
TCN_addContentL("Coclé+#+2+#+Antón+#+5+#+Juan Díaz+#+28");
TCN_addContentL("Coclé+#+2+#+Antón+#+5+#+Río Hato+#+29");
TCN_addContentL("Coclé+#+2+#+Antón+#+5+#+San Juan de Dios+#+30");
TCN_addContentL("Coclé+#+2+#+Antón+#+5+#+Santa Rita+#+31");
TCN_addContentL("Coclé+#+2+#+La Pintada+#+6+#+El Harino+#+34");
TCN_addContentL("Coclé+#+2+#+La Pintada+#+6+#+El Potrero+#+35");
TCN_addContentL("Coclé+#+2+#+La Pintada+#+6+#+La Pintada+#+33");
TCN_addContentL("Coclé+#+2+#+La Pintada+#+6+#+Llano Grande+#+36");
TCN_addContentL("Coclé+#+2+#+La Pintada+#+6+#+Piedras Gordas+#+37");
TCN_addContentL("Coclé+#+2+#+Natá+#+66+#+Capellanía+#+556");
TCN_addContentL("Coclé+#+2+#+Natá+#+66+#+El Caño+#+557");
TCN_addContentL("Coclé+#+2+#+Natá+#+66+#+Guzmán+#+558");
TCN_addContentL("Coclé+#+2+#+Natá+#+66+#+Las Huacas+#+559");
TCN_addContentL("Coclé+#+2+#+Natá+#+66+#+Natá+#+555");
TCN_addContentL("Coclé+#+2+#+Natá+#+66+#+Toza+#+560");
TCN_addContentL("Coclé+#+2+#+Olá+#+7+#+El Copé+#+39");
TCN_addContentL("Coclé+#+2+#+Olá+#+7+#+El Palmar+#+40");
TCN_addContentL("Coclé+#+2+#+Olá+#+7+#+El Picacho+#+41");
TCN_addContentL("Coclé+#+2+#+Olá+#+7+#+La Pava+#+42");
TCN_addContentL("Coclé+#+2+#+Olá+#+7+#+Olá+#+38");
TCN_addContentL("Coclé+#+2+#+Penonomé+#+8+#+Cañaveral+#+44");
TCN_addContentL("Coclé+#+2+#+Penonomé+#+8+#+Chiguirí Arriba+#+46");
TCN_addContentL("Coclé+#+2+#+Penonomé+#+8+#+Coclé+#+45");
TCN_addContentL("Coclé+#+2+#+Penonomé+#+8+#+El Coco+#+47");
TCN_addContentL("Coclé+#+2+#+Penonomé+#+8+#+El Valle de San Miguel+#+53");
TCN_addContentL("Coclé+#+2+#+Penonomé+#+8+#+Pajonal+#+48");
TCN_addContentL("Coclé+#+2+#+Penonomé+#+8+#+Penonomé+#+43");
TCN_addContentL("Coclé+#+2+#+Penonomé+#+8+#+Río Grande+#+49");
TCN_addContentL("Coclé+#+2+#+Penonomé+#+8+#+Río Indio+#+50");
TCN_addContentL("Coclé+#+2+#+Penonomé+#+8+#+Toabré+#+51");
TCN_addContentL("Coclé+#+2+#+Penonomé+#+8+#+Tulú+#+52");
TCN_addContentL("Colón+#+3+#+Chagres+#+10+#+Achiote+#+69");
TCN_addContentL("Colón+#+3+#+Chagres+#+10+#+El Guabo+#+70");
TCN_addContentL("Colón+#+3+#+Chagres+#+10+#+Icacal+#+75");
TCN_addContentL("Colón+#+3+#+Chagres+#+10+#+La Encantada+#+71");
TCN_addContentL("Colón+#+3+#+Chagres+#+10+#+Nuevo Chagres+#+68");
TCN_addContentL("Colón+#+3+#+Chagres+#+10+#+Palmas Bellas+#+72");
TCN_addContentL("Colón+#+3+#+Chagres+#+10+#+Piña+#+73");
TCN_addContentL("Colón+#+3+#+Chagres+#+10+#+Salud+#+74");
TCN_addContentL("Colón+#+3+#+Colón+#+9+#+Barrio Norte+#+54");
TCN_addContentL("Colón+#+3+#+Colón+#+9+#+Barrio Sur+#+55");
TCN_addContentL("Colón+#+3+#+Colón+#+9+#+Buena Vista+#+56");
TCN_addContentL("Colón+#+3+#+Colón+#+9+#+Cativá+#+57");
TCN_addContentL("Colón+#+3+#+Colón+#+9+#+Ciricito+#+58");
TCN_addContentL("Colón+#+3+#+Colón+#+9+#+Cristobal+#+64");
TCN_addContentL("Colón+#+3+#+Colón+#+9+#+Escobal+#+65");
TCN_addContentL("Colón+#+3+#+Colón+#+9+#+Limón+#+61");
TCN_addContentL("Colón+#+3+#+Colón+#+9+#+Nueva Providencia+#+62");
TCN_addContentL("Colón+#+3+#+Colón+#+9+#+Puerto Pilón+#+63");
TCN_addContentL("Colón+#+3+#+Colón+#+9+#+Sabanitas+#+59");
TCN_addContentL("Colón+#+3+#+Colón+#+9+#+Salamanca+#+60");
TCN_addContentL("Colón+#+3+#+Colón+#+9+#+San Juan+#+66");
TCN_addContentL("Colón+#+3+#+Colón+#+9+#+Santa Rosa+#+67");
TCN_addContentL("Colón+#+3+#+Donoso+#+11+#+Coclé del Norte+#+77");
TCN_addContentL("Colón+#+3+#+Donoso+#+11+#+El Guásimo+#+78");
TCN_addContentL("Colón+#+3+#+Donoso+#+11+#+Gobea+#+79");
TCN_addContentL("Colón+#+3+#+Donoso+#+11+#+Miguel de la Borda+#+76");
TCN_addContentL("Colón+#+3+#+Donoso+#+11+#+Río Indio+#+80");
TCN_addContentL("Colón+#+3+#+Donoso+#+11+#+San José del General+#+81");
TCN_addContentL("Colón+#+3+#+Portobelo+#+12+#+Cacique+#+83");
TCN_addContentL("Colón+#+3+#+Portobelo+#+12+#+Garrote+#+84");
TCN_addContentL("Colón+#+3+#+Portobelo+#+12+#+Isla Grande+#+85");
TCN_addContentL("Colón+#+3+#+Portobelo+#+12+#+María Chiquita+#+86");
TCN_addContentL("Colón+#+3+#+Portobelo+#+12+#+Portobelo+#+82");
TCN_addContentL("Colón+#+3+#+Santa Isabel+#+13+#+Cuango+#+88");
TCN_addContentL("Colón+#+3+#+Santa Isabel+#+13+#+Miramar+#+89");
TCN_addContentL("Colón+#+3+#+Santa Isabel+#+13+#+Nombre de Dios+#+90");
TCN_addContentL("Colón+#+3+#+Santa Isabel+#+13+#+Palenque+#+87");
TCN_addContentL("Colón+#+3+#+Santa Isabel+#+13+#+Palmira+#+91");
TCN_addContentL("Colón+#+3+#+Santa Isabel+#+13+#+Playa Chiquita+#+92");
TCN_addContentL("Colón+#+3+#+Santa Isabel+#+13+#+Santa Isabel+#+93");
TCN_addContentL("Colón+#+3+#+Santa Isabel+#+13+#+Viento Frío+#+94");
TCN_addContentL("Darién+#+5+#+Chepigana+#+27+#+Agua Fría+#+203");
TCN_addContentL("Darién+#+5+#+Chepigana+#+27+#+Camogantí+#+192");
TCN_addContentL("Darién+#+5+#+Chepigana+#+27+#+Chepigana+#+193");
TCN_addContentL("Darién+#+5+#+Chepigana+#+27+#+Cucunatí+#+204");
TCN_addContentL("Darién+#+5+#+Chepigana+#+27+#+Garachiné+#+194");
TCN_addContentL("Darién+#+5+#+Chepigana+#+27+#+Jaqué+#+195");
TCN_addContentL("Darién+#+5+#+Chepigana+#+27+#+La Palma+#+191");
TCN_addContentL("Darién+#+5+#+Chepigana+#+27+#+Puerto Piña+#+196");
TCN_addContentL("Darién+#+5+#+Chepigana+#+27+#+Río Congo+#+197");
TCN_addContentL("Darién+#+5+#+Chepigana+#+27+#+Río Congo Arriba+#+205");
TCN_addContentL("Darién+#+5+#+Chepigana+#+27+#+Río Iglesias+#+198");
TCN_addContentL("Darién+#+5+#+Chepigana+#+27+#+Sambú+#+199");
TCN_addContentL("Darién+#+5+#+Chepigana+#+27+#+Santa Fe+#+206");
TCN_addContentL("Darién+#+5+#+Chepigana+#+27+#+Setegantí+#+200");
TCN_addContentL("Darién+#+5+#+Chepigana+#+27+#+Taimatí+#+201");
TCN_addContentL("Darién+#+5+#+Chepigana+#+27+#+Tucutí+#+202");
TCN_addContentL("Darién+#+5+#+Pinogana+#+28+#+Boca de Cupe+#+208");
TCN_addContentL("Darién+#+5+#+Pinogana+#+28+#+El Real de Santa María+#+207");
TCN_addContentL("Darién+#+5+#+Pinogana+#+28+#+Metetí+#+214");
TCN_addContentL("Darién+#+5+#+Pinogana+#+28+#+Paya+#+209");
TCN_addContentL("Darién+#+5+#+Pinogana+#+28+#+Pinogana+#+210");
TCN_addContentL("Darién+#+5+#+Pinogana+#+28+#+Púcuro+#+211");
TCN_addContentL("Darién+#+5+#+Pinogana+#+28+#+Wargandí+#+215");
TCN_addContentL("Darién+#+5+#+Pinogana+#+28+#+Yape+#+212");
TCN_addContentL("Darién+#+5+#+Pinogana+#+28+#+Yaviza+#+213");
TCN_addContentL("Herrera+#+6+#+Chitré+#+29+#+Chitré+#+216");
TCN_addContentL("Herrera+#+6+#+Chitré+#+29+#+La Arena+#+217");
TCN_addContentL("Herrera+#+6+#+Chitré+#+29+#+Llano Bonito+#+219");
TCN_addContentL("Herrera+#+6+#+Chitré+#+29+#+Monagrillo+#+218");
TCN_addContentL("Herrera+#+6+#+Chitré+#+29+#+San Juan Bautista+#+220");
TCN_addContentL("Herrera+#+6+#+Las Minas+#+30+#+Chepo+#+222");
TCN_addContentL("Herrera+#+6+#+Las Minas+#+30+#+Chumical+#+223");
TCN_addContentL("Herrera+#+6+#+Las Minas+#+30+#+El Toro+#+224");
TCN_addContentL("Herrera+#+6+#+Las Minas+#+30+#+Las Minas+#+221");
TCN_addContentL("Herrera+#+6+#+Las Minas+#+30+#+Leones+#+225");
TCN_addContentL("Herrera+#+6+#+Las Minas+#+30+#+Quebrada del Rosario+#+226");
TCN_addContentL("Herrera+#+6+#+Las Minas+#+30+#+Quebrada El Ciprián+#+227");
TCN_addContentL("Herrera+#+6+#+Los Pozos+#+31+#+El Calabacito+#+230");
TCN_addContentL("Herrera+#+6+#+Los Pozos+#+31+#+El Capurí+#+229");
TCN_addContentL("Herrera+#+6+#+Los Pozos+#+31+#+El Cedro+#+231");
TCN_addContentL("Herrera+#+6+#+Los Pozos+#+31+#+La Arena+#+232");
TCN_addContentL("Herrera+#+6+#+Los Pozos+#+31+#+La Pitaloza+#+233");
TCN_addContentL("Herrera+#+6+#+Los Pozos+#+31+#+Las Llanas+#+236");
TCN_addContentL("Herrera+#+6+#+Los Pozos+#+31+#+Los Cerritos+#+234");
TCN_addContentL("Herrera+#+6+#+Los Pozos+#+31+#+Los Cerros de Paja+#+235");
TCN_addContentL("Herrera+#+6+#+Los Pozos+#+31+#+Los Pozos+#+228");
TCN_addContentL("Herrera+#+6+#+Ocú+#+32+#+Cerro Largo+#+238");
TCN_addContentL("Herrera+#+6+#+Ocú+#+32+#+El Tijera+#+242");
TCN_addContentL("Herrera+#+6+#+Ocú+#+32+#+Llano Grande+#+240");
TCN_addContentL("Herrera+#+6+#+Ocú+#+32+#+Los Llanos+#+239");
TCN_addContentL("Herrera+#+6+#+Ocú+#+32+#+Menchaca+#+243");
TCN_addContentL("Herrera+#+6+#+Ocú+#+32+#+Ocú+#+237");
TCN_addContentL("Herrera+#+6+#+Ocú+#+32+#+Peñas Chatas+#+241");
TCN_addContentL("Herrera+#+6+#+Parita+#+33+#+Cabuya+#+245");
TCN_addContentL("Herrera+#+6+#+Parita+#+33+#+Llano de la Cruz+#+247");
TCN_addContentL("Herrera+#+6+#+Parita+#+33+#+Los Castillos+#+246");
TCN_addContentL("Herrera+#+6+#+Parita+#+33+#+París+#+248");
TCN_addContentL("Herrera+#+6+#+Parita+#+33+#+Parita+#+244");
TCN_addContentL("Herrera+#+6+#+Parita+#+33+#+Portobelillo+#+249");
TCN_addContentL("Herrera+#+6+#+Parita+#+33+#+Potuga+#+250");
TCN_addContentL("Herrera+#+6+#+Pesé+#+34+#+El Barrero+#+254");
TCN_addContentL("Herrera+#+6+#+Pesé+#+34+#+El Ciruelo+#+256");
TCN_addContentL("Herrera+#+6+#+Pesé+#+34+#+El Pájaro+#+253");
TCN_addContentL("Herrera+#+6+#+Pesé+#+34+#+El Pedregoso+#+255");
TCN_addContentL("Herrera+#+6+#+Pesé+#+34+#+Las Cabras+#+252");
TCN_addContentL("Herrera+#+6+#+Pesé+#+34+#+Pesé+#+251");
TCN_addContentL("Herrera+#+6+#+Pesé+#+34+#+Rincón Hondo+#+258");
TCN_addContentL("Herrera+#+6+#+Pesé+#+34+#+Sabanagrande+#+257");
TCN_addContentL("Herrera+#+6+#+Santa María+#+35+#+Chupampa+#+260");
TCN_addContentL("Herrera+#+6+#+Santa María+#+35+#+El Limón+#+262");
TCN_addContentL("Herrera+#+6+#+Santa María+#+35+#+El Rincón+#+261");
TCN_addContentL("Herrera+#+6+#+Santa María+#+35+#+Los Canelos+#+263");
TCN_addContentL("Herrera+#+6+#+Santa María+#+35+#+Santa María+#+259");
TCN_addContentL("Los Santos+#+7+#+Guararé+#+36+#+El Espinal+#+265");
TCN_addContentL("Los Santos+#+7+#+Guararé+#+36+#+El Hato+#+272");
TCN_addContentL("Los Santos+#+7+#+Guararé+#+36+#+El Macano+#+266");
TCN_addContentL("Los Santos+#+7+#+Guararé+#+36+#+Guararé+#+264");
TCN_addContentL("Los Santos+#+7+#+Guararé+#+36+#+Guararé Arriba+#+267");
TCN_addContentL("Los Santos+#+7+#+Guararé+#+36+#+La Enea+#+268");
TCN_addContentL("Los Santos+#+7+#+Guararé+#+36+#+La Pasera+#+269");
TCN_addContentL("Los Santos+#+7+#+Guararé+#+36+#+Las Trancas+#+270");
TCN_addContentL("Los Santos+#+7+#+Guararé+#+36+#+Llano Abajo+#+271");
TCN_addContentL("Los Santos+#+7+#+Guararé+#+36+#+Perales+#+273");
TCN_addContentL("Los Santos+#+7+#+Las Tablas+#+37+#+Bajo Corral+#+275");
TCN_addContentL("Los Santos+#+7+#+Las Tablas+#+37+#+Bayano+#+276");
TCN_addContentL("Los Santos+#+7+#+Las Tablas+#+37+#+El Carate+#+277");
TCN_addContentL("Los Santos+#+7+#+Las Tablas+#+37+#+El Cocal+#+278");
TCN_addContentL("Los Santos+#+7+#+Las Tablas+#+37+#+El Manantial+#+279");
TCN_addContentL("Los Santos+#+7+#+Las Tablas+#+37+#+El Muñoz+#+280");
TCN_addContentL("Los Santos+#+7+#+Las Tablas+#+37+#+El Pedregoso+#+281");
TCN_addContentL("Los Santos+#+7+#+Las Tablas+#+37+#+El Sesteadero+#+295");
TCN_addContentL("Los Santos+#+7+#+Las Tablas+#+37+#+La Laja+#+282");
TCN_addContentL("Los Santos+#+7+#+Las Tablas+#+37+#+La Miel+#+283");
TCN_addContentL("Los Santos+#+7+#+Las Tablas+#+37+#+La Palma+#+284");
TCN_addContentL("Los Santos+#+7+#+Las Tablas+#+37+#+La Tiza+#+285");
TCN_addContentL("Los Santos+#+7+#+Las Tablas+#+37+#+Las Palmitas+#+286");
TCN_addContentL("Los Santos+#+7+#+Las Tablas+#+37+#+Las Tablas+#+274");
TCN_addContentL("Los Santos+#+7+#+Las Tablas+#+37+#+Las Tablas Abajo+#+287");
TCN_addContentL("Los Santos+#+7+#+Las Tablas+#+37+#+Nuario+#+288");
TCN_addContentL("Los Santos+#+7+#+Las Tablas+#+37+#+Palmira+#+289");
TCN_addContentL("Los Santos+#+7+#+Las Tablas+#+37+#+Peña Blanca+#+290");
TCN_addContentL("Los Santos+#+7+#+Las Tablas+#+37+#+Río Hondo+#+291");
TCN_addContentL("Los Santos+#+7+#+Las Tablas+#+37+#+San José+#+292");
TCN_addContentL("Los Santos+#+7+#+Las Tablas+#+37+#+San Miguel+#+293");
TCN_addContentL("Los Santos+#+7+#+Las Tablas+#+37+#+Santo Domingo+#+294");
TCN_addContentL("Los Santos+#+7+#+Las Tablas+#+37+#+Valle Rico+#+296");
TCN_addContentL("Los Santos+#+7+#+Las Tablas+#+37+#+Valleriquito+#+297");
TCN_addContentL("Los Santos+#+7+#+Los Santos+#+38+#+Agua Buena+#+311");
TCN_addContentL("Los Santos+#+7+#+Los Santos+#+38+#+El Guásimo+#+299");
TCN_addContentL("Los Santos+#+7+#+Los Santos+#+38+#+La Colorada+#+300");
TCN_addContentL("Los Santos+#+7+#+Los Santos+#+38+#+La Espigadilla+#+301");
TCN_addContentL("Los Santos+#+7+#+Los Santos+#+38+#+La Villa de Los Santos+#+298");
TCN_addContentL("Los Santos+#+7+#+Los Santos+#+38+#+Las Cruces+#+302");
TCN_addContentL("Los Santos+#+7+#+Los Santos+#+38+#+Llano Largo+#+306");
TCN_addContentL("Los Santos+#+7+#+Los Santos+#+38+#+Los Angeles+#+304");
TCN_addContentL("Los Santos+#+7+#+Los Santos+#+38+#+Los Guabas+#+303");
TCN_addContentL("Los Santos+#+7+#+Los Santos+#+38+#+Los Olivos+#+305");
TCN_addContentL("Los Santos+#+7+#+Los Santos+#+38+#+Sabanagrande+#+307");
TCN_addContentL("Los Santos+#+7+#+Los Santos+#+38+#+Santa Ana+#+308");
TCN_addContentL("Los Santos+#+7+#+Los Santos+#+38+#+Tres Quebradas+#+309");
TCN_addContentL("Los Santos+#+7+#+Los Santos+#+38+#+Villa Lourdes+#+310");
TCN_addContentL("Los Santos+#+7+#+Macaracas+#+39+#+Bahía Honda+#+313");
TCN_addContentL("Los Santos+#+7+#+Macaracas+#+39+#+Bajos de Güera+#+314");
TCN_addContentL("Los Santos+#+7+#+Macaracas+#+39+#+Chupá+#+316");
TCN_addContentL("Los Santos+#+7+#+Macaracas+#+39+#+Corozal+#+315");
TCN_addContentL("Los Santos+#+7+#+Macaracas+#+39+#+El Cedro+#+317");
TCN_addContentL("Los Santos+#+7+#+Macaracas+#+39+#+Espino Amarillo+#+318");
TCN_addContentL("Los Santos+#+7+#+Macaracas+#+39+#+La Mesa+#+319");
TCN_addContentL("Los Santos+#+7+#+Macaracas+#+39+#+Las Palmas+#+321");
TCN_addContentL("Los Santos+#+7+#+Macaracas+#+39+#+Llano de Piedras+#+320");
TCN_addContentL("Los Santos+#+7+#+Macaracas+#+39+#+Macaracas+#+312");
TCN_addContentL("Los Santos+#+7+#+Macaracas+#+39+#+Mogollón+#+322");
TCN_addContentL("Los Santos+#+7+#+Pedasí+#+40+#+Los Asientos+#+324");
TCN_addContentL("Los Santos+#+7+#+Pedasí+#+40+#+Mariabé+#+325");
TCN_addContentL("Los Santos+#+7+#+Pedasí+#+40+#+Oria Arriba+#+327");
TCN_addContentL("Los Santos+#+7+#+Pedasí+#+40+#+Pedasí+#+323");
TCN_addContentL("Los Santos+#+7+#+Pedasí+#+40+#+Purio+#+326");
TCN_addContentL("Los Santos+#+7+#+Pocrí+#+41+#+El Cañafístulo+#+329");
TCN_addContentL("Los Santos+#+7+#+Pocrí+#+41+#+Lajamina+#+330");
TCN_addContentL("Los Santos+#+7+#+Pocrí+#+41+#+Paraíso+#+331");
TCN_addContentL("Los Santos+#+7+#+Pocrí+#+41+#+Paritilla+#+332");
TCN_addContentL("Los Santos+#+7+#+Pocrí+#+41+#+Pocrí+#+328");
TCN_addContentL("Los Santos+#+7+#+Tonosí+#+42+#+Altos del Güera+#+334");
TCN_addContentL("Los Santos+#+7+#+Tonosí+#+42+#+Cambutal+#+342");
TCN_addContentL("Los Santos+#+7+#+Tonosí+#+42+#+Cañas+#+335");
TCN_addContentL("Los Santos+#+7+#+Tonosí+#+42+#+El Bebedero+#+336");
TCN_addContentL("Los Santos+#+7+#+Tonosí+#+42+#+El Cacao+#+337");
TCN_addContentL("Los Santos+#+7+#+Tonosí+#+42+#+El Cortezo+#+338");
TCN_addContentL("Los Santos+#+7+#+Tonosí+#+42+#+Flores+#+339");
TCN_addContentL("Los Santos+#+7+#+Tonosí+#+42+#+Guánico+#+340");
TCN_addContentL("Los Santos+#+7+#+Tonosí+#+42+#+Isla de Cañas+#+343");
TCN_addContentL("Los Santos+#+7+#+Tonosí+#+42+#+La Tronosa+#+341");
TCN_addContentL("Los Santos+#+7+#+Tonosí+#+42+#+Tonosí+#+333");
TCN_addContentL("Panamá+#+8+#+Balboa+#+44+#+La Ensenada+#+353");
TCN_addContentL("Panamá+#+8+#+Balboa+#+44+#+La Esmeralda+#+354");
TCN_addContentL("Panamá+#+8+#+Balboa+#+44+#+La Guinea+#+355");
TCN_addContentL("Panamá+#+8+#+Balboa+#+44+#+Pedro González+#+356");
TCN_addContentL("Panamá+#+8+#+Balboa+#+44+#+Saboga+#+357");
TCN_addContentL("Panamá+#+8+#+Balboa+#+44+#+San Miguel+#+352");
TCN_addContentL("Panamá+#+8+#+Chepo+#+47+#+Cañita+#+383");
TCN_addContentL("Panamá+#+8+#+Chepo+#+47+#+Chepillo+#+384");
TCN_addContentL("Panamá+#+8+#+Chepo+#+47+#+Chepo+#+382");
TCN_addContentL("Panamá+#+8+#+Chepo+#+47+#+El Llano+#+385");
TCN_addContentL("Panamá+#+8+#+Chepo+#+47+#+Las Margaritas+#+386");
TCN_addContentL("Panamá+#+8+#+Chepo+#+47+#+Madungandí+#+388");
TCN_addContentL("Panamá+#+8+#+Chepo+#+47+#+Santa Cruz de Chinina+#+387");
TCN_addContentL("Panamá+#+8+#+Chepo+#+47+#+Tortí+#+389");
TCN_addContentL("Panamá+#+8+#+Chimán+#+48+#+Brujas+#+391");
TCN_addContentL("Panamá+#+8+#+Chimán+#+48+#+Chimán+#+390");
TCN_addContentL("Panamá+#+8+#+Chimán+#+48+#+Gonzalo Vásquez+#+392");
TCN_addContentL("Panamá+#+8+#+Chimán+#+48+#+Pásiga+#+393");
TCN_addContentL("Panamá+#+8+#+Chimán+#+48+#+Unión Santeña+#+394");
TCN_addContentL("Panamá+#+8+#+Panamá+#+50+#+24 de Diciembre+#+435");
TCN_addContentL("Panamá+#+8+#+Panamá+#+50+#+Alcalde Díaz+#+428");
TCN_addContentL("Panamá+#+8+#+Panamá+#+50+#+Ancón+#+421");
TCN_addContentL("Panamá+#+8+#+Panamá+#+50+#+Bella Vista+#+419");
TCN_addContentL("Panamá+#+8+#+Panamá+#+50+#+Betania+#+418");
TCN_addContentL("Panamá+#+8+#+Panamá+#+50+#+Calidonia+#+416");
TCN_addContentL("Panamá+#+8+#+Panamá+#+50+#+Chilibre+#+426");
TCN_addContentL("Panamá+#+8+#+Panamá+#+50+#+Curundú+#+417");
TCN_addContentL("Panamá+#+8+#+Panamá+#+50+#+El Chorrillo+#+414");
TCN_addContentL("Panamá+#+8+#+Panamá+#+50+#+Ernesto Córdoba Campos+#+429");
TCN_addContentL("Panamá+#+8+#+Panamá+#+50+#+Juan Díaz+#+425");
TCN_addContentL("Panamá+#+8+#+Panamá+#+50+#+Las Cumbres+#+427");
TCN_addContentL("Panamá+#+8+#+Panamá+#+50+#+Las Mañanitas+#+434");
TCN_addContentL("Panamá+#+8+#+Panamá+#+50+#+Pacora+#+430");
TCN_addContentL("Panamá+#+8+#+Panamá+#+50+#+Parque Lefevre+#+423");
TCN_addContentL("Panamá+#+8+#+Panamá+#+50+#+Pedregal+#+431");
TCN_addContentL("Panamá+#+8+#+Panamá+#+50+#+Pueblo Nuevo+#+420");
TCN_addContentL("Panamá+#+8+#+Panamá+#+50+#+Río Abajo+#+424");
TCN_addContentL("Panamá+#+8+#+Panamá+#+50+#+San Felipe+#+413");
TCN_addContentL("Panamá+#+8+#+Panamá+#+50+#+San Francisco+#+422");
TCN_addContentL("Panamá+#+8+#+Panamá+#+50+#+San Martín+#+432");
TCN_addContentL("Panamá+#+8+#+Panamá+#+50+#+Santa Ana+#+415");
TCN_addContentL("Panamá+#+8+#+Panamá+#+50+#+Tocumen+#+433");
TCN_addContentL("Panamá+#+8+#+San Miguelito+#+52+#+Amelia Denis de Icaza+#+445");
TCN_addContentL("Panamá+#+8+#+San Miguelito+#+52+#+Arnulfo Arias+#+450");
TCN_addContentL("Panamá+#+8+#+San Miguelito+#+52+#+Belisario Frías+#+451");
TCN_addContentL("Panamá+#+8+#+San Miguelito+#+52+#+Belisario Porras+#+446");
TCN_addContentL("Panamá+#+8+#+San Miguelito+#+52+#+José Domingo Espinar+#+447");
TCN_addContentL("Panamá+#+8+#+San Miguelito+#+52+#+Mateo Iturralde+#+448");
TCN_addContentL("Panamá+#+8+#+San Miguelito+#+52+#+Omar Torrijos+#+452");
TCN_addContentL("Panamá+#+8+#+San Miguelito+#+52+#+Rufina Alfaro+#+453");
TCN_addContentL("Panamá+#+8+#+San Miguelito+#+52+#+Victoriano Lorenzo+#+449");
TCN_addContentL("Panamá+#+8+#+Taboga+#+53+#+Otoque Occidente+#+455");
TCN_addContentL("Panamá+#+8+#+Taboga+#+53+#+Otoque Oriente+#+456");
TCN_addContentL("Panamá+#+8+#+Taboga+#+53+#+Taboga+#+454");
TCN_addContentL("Panamá Oeste+#+10+#+Arraiján+#+43+#+Arraiján+#+344");
TCN_addContentL("Panamá Oeste+#+10+#+Arraiján+#+43+#+Burunga+#+350");
TCN_addContentL("Panamá Oeste+#+10+#+Arraiján+#+43+#+Cerro Silvestre+#+351");
TCN_addContentL("Panamá Oeste+#+10+#+Arraiján+#+43+#+Juan Demóstenes Arosemena+#+345");
TCN_addContentL("Panamá Oeste+#+10+#+Arraiján+#+43+#+Nuevo Emperador+#+346");
TCN_addContentL("Panamá Oeste+#+10+#+Arraiján+#+43+#+Santa Clara+#+347");
TCN_addContentL("Panamá Oeste+#+10+#+Arraiján+#+43+#+Veracruz+#+348");
TCN_addContentL("Panamá Oeste+#+10+#+Arraiján+#+43+#+Vista Alegre+#+349");
TCN_addContentL("Panamá Oeste+#+10+#+Capira+#+45+#+Caimito+#+359");
TCN_addContentL("Panamá Oeste+#+10+#+Capira+#+45+#+Campana+#+360");
TCN_addContentL("Panamá Oeste+#+10+#+Capira+#+45+#+Capira+#+358");
TCN_addContentL("Panamá Oeste+#+10+#+Capira+#+45+#+Cermeño+#+361");
TCN_addContentL("Panamá Oeste+#+10+#+Capira+#+45+#+Cirí de Los Sotos+#+362");
TCN_addContentL("Panamá Oeste+#+10+#+Capira+#+45+#+Cirí Grande+#+363");
TCN_addContentL("Panamá Oeste+#+10+#+Capira+#+45+#+El Cacao+#+364");
TCN_addContentL("Panamá Oeste+#+10+#+Capira+#+45+#+La Trinidad+#+365");
TCN_addContentL("Panamá Oeste+#+10+#+Capira+#+45+#+Las Ollas Arriba+#+366");
TCN_addContentL("Panamá Oeste+#+10+#+Capira+#+45+#+Lídice+#+367");
TCN_addContentL("Panamá Oeste+#+10+#+Capira+#+45+#+Santa Rosa+#+370");
TCN_addContentL("Panamá Oeste+#+10+#+Capira+#+45+#+Villa Carmen+#+368");
TCN_addContentL("Panamá Oeste+#+10+#+Capira+#+45+#+Villa Rosario+#+369");
TCN_addContentL("Panamá Oeste+#+10+#+Chame+#+46+#+Bejuco+#+372");
TCN_addContentL("Panamá Oeste+#+10+#+Chame+#+46+#+Buenos Aires+#+373");
TCN_addContentL("Panamá Oeste+#+10+#+Chame+#+46+#+Cabuya+#+374");
TCN_addContentL("Panamá Oeste+#+10+#+Chame+#+46+#+Chame+#+371");
TCN_addContentL("Panamá Oeste+#+10+#+Chame+#+46+#+Chicá+#+375");
TCN_addContentL("Panamá Oeste+#+10+#+Chame+#+46+#+El Líbano+#+376");
TCN_addContentL("Panamá Oeste+#+10+#+Chame+#+46+#+Las Lajas+#+377");
TCN_addContentL("Panamá Oeste+#+10+#+Chame+#+46+#+Nueva Gorgona+#+378");
TCN_addContentL("Panamá Oeste+#+10+#+Chame+#+46+#+Punta Chame+#+379");
TCN_addContentL("Panamá Oeste+#+10+#+Chame+#+46+#+Sajalices+#+380");
TCN_addContentL("Panamá Oeste+#+10+#+Chame+#+46+#+Sorá+#+381");
TCN_addContentL("Panamá Oeste+#+10+#+La Chorrera+#+49+#+Amador+#+397");
TCN_addContentL("Panamá Oeste+#+10+#+La Chorrera+#+49+#+Arosemena+#+398");
TCN_addContentL("Panamá Oeste+#+10+#+La Chorrera+#+49+#+Barrio Balboa+#+395");
TCN_addContentL("Panamá Oeste+#+10+#+La Chorrera+#+49+#+Barrio Colón+#+396");
TCN_addContentL("Panamá Oeste+#+10+#+La Chorrera+#+49+#+El Arado+#+399");
TCN_addContentL("Panamá Oeste+#+10+#+La Chorrera+#+49+#+El Coco+#+400");
TCN_addContentL("Panamá Oeste+#+10+#+La Chorrera+#+49+#+Feuillet+#+401");
TCN_addContentL("Panamá Oeste+#+10+#+La Chorrera+#+49+#+Guadalupe+#+402");
TCN_addContentL("Panamá Oeste+#+10+#+La Chorrera+#+49+#+Herrera+#+403");
TCN_addContentL("Panamá Oeste+#+10+#+La Chorrera+#+49+#+Hurtado+#+404");
TCN_addContentL("Panamá Oeste+#+10+#+La Chorrera+#+49+#+Iturralde+#+405");
TCN_addContentL("Panamá Oeste+#+10+#+La Chorrera+#+49+#+La Represa+#+406");
TCN_addContentL("Panamá Oeste+#+10+#+La Chorrera+#+49+#+Los Díaz+#+407");
TCN_addContentL("Panamá Oeste+#+10+#+La Chorrera+#+49+#+Mendoza+#+408");
TCN_addContentL("Panamá Oeste+#+10+#+La Chorrera+#+49+#+Obaldía+#+409");
TCN_addContentL("Panamá Oeste+#+10+#+La Chorrera+#+49+#+Playa Leona+#+410");
TCN_addContentL("Panamá Oeste+#+10+#+La Chorrera+#+49+#+Puerto Caimito+#+411");
TCN_addContentL("Panamá Oeste+#+10+#+La Chorrera+#+49+#+Santa Rita+#+412");
TCN_addContentL("Panamá Oeste+#+10+#+San Carlos+#+51+#+El Espino+#+437");
TCN_addContentL("Panamá Oeste+#+10+#+San Carlos+#+51+#+El Higo+#+438");
TCN_addContentL("Panamá Oeste+#+10+#+San Carlos+#+51+#+Guayabito+#+439");
TCN_addContentL("Panamá Oeste+#+10+#+San Carlos+#+51+#+La Ermita+#+440");
TCN_addContentL("Panamá Oeste+#+10+#+San Carlos+#+51+#+La Laguna+#+441");
TCN_addContentL("Panamá Oeste+#+10+#+San Carlos+#+51+#+Las Uvas+#+442");
TCN_addContentL("Panamá Oeste+#+10+#+San Carlos+#+51+#+Los Llanitos+#+443");
TCN_addContentL("Panamá Oeste+#+10+#+San Carlos+#+51+#+San Carlos+#+436");
TCN_addContentL("Panamá Oeste+#+10+#+San Carlos+#+51+#+San José+#+444");
TCN_addContentL("Veraguas+#+9+#+Atalaya+#+54+#+Atalaya+#+457");
TCN_addContentL("Veraguas+#+9+#+Atalaya+#+54+#+El Barrito+#+458");
TCN_addContentL("Veraguas+#+9+#+Atalaya+#+54+#+La Carrillo+#+461");
TCN_addContentL("Veraguas+#+9+#+Atalaya+#+54+#+La Montañuela+#+459");
TCN_addContentL("Veraguas+#+9+#+Atalaya+#+54+#+San Antonio+#+460");
TCN_addContentL("Veraguas+#+9+#+Calobre+#+55+#+Barnizal+#+463");
TCN_addContentL("Veraguas+#+9+#+Calobre+#+55+#+Calobre+#+462");
TCN_addContentL("Veraguas+#+9+#+Calobre+#+55+#+Chitra+#+464");
TCN_addContentL("Veraguas+#+9+#+Calobre+#+55+#+El Cocla+#+465");
TCN_addContentL("Veraguas+#+9+#+Calobre+#+55+#+El Potrero+#+466");
TCN_addContentL("Veraguas+#+9+#+Calobre+#+55+#+La Laguna+#+467");
TCN_addContentL("Veraguas+#+9+#+Calobre+#+55+#+La Raya de Calobre+#+468");
TCN_addContentL("Veraguas+#+9+#+Calobre+#+55+#+La Tetilla+#+469");
TCN_addContentL("Veraguas+#+9+#+Calobre+#+55+#+La Yeguada+#+470");
TCN_addContentL("Veraguas+#+9+#+Calobre+#+55+#+Las Guías+#+471");
TCN_addContentL("Veraguas+#+9+#+Calobre+#+55+#+Monjarás+#+472");
TCN_addContentL("Veraguas+#+9+#+Calobre+#+55+#+San José+#+473");
TCN_addContentL("Veraguas+#+9+#+Cañazas+#+56+#+Cañazas+#+474");
TCN_addContentL("Veraguas+#+9+#+Cañazas+#+56+#+Cerro de Plata+#+475");
TCN_addContentL("Veraguas+#+9+#+Cañazas+#+56+#+El Aromillo+#+480");
TCN_addContentL("Veraguas+#+9+#+Cañazas+#+56+#+El Picador+#+478");
TCN_addContentL("Veraguas+#+9+#+Cañazas+#+56+#+Las Cruces+#+481");
TCN_addContentL("Veraguas+#+9+#+Cañazas+#+56+#+Los Valles+#+476");
TCN_addContentL("Veraguas+#+9+#+Cañazas+#+56+#+San José+#+479");
TCN_addContentL("Veraguas+#+9+#+Cañazas+#+56+#+San Marcelo+#+477");
TCN_addContentL("Veraguas+#+9+#+Cañazas+#+56+#+Tierra Cortada+#+482");
TCN_addContentL("Veraguas+#+9+#+La Mesa+#+57+#+Bisvalles+#+484");
TCN_addContentL("Veraguas+#+9+#+La Mesa+#+57+#+Boró+#+485");
TCN_addContentL("Veraguas+#+9+#+La Mesa+#+57+#+La Mesa+#+483");
TCN_addContentL("Veraguas+#+9+#+La Mesa+#+57+#+Llano Grande+#+486");
TCN_addContentL("Veraguas+#+9+#+La Mesa+#+57+#+Los Milagros+#+488");
TCN_addContentL("Veraguas+#+9+#+La Mesa+#+57+#+San Bartolo+#+487");
TCN_addContentL("Veraguas+#+9+#+Las Palmas+#+58+#+Cerro de Casa+#+490");
TCN_addContentL("Veraguas+#+9+#+Las Palmas+#+58+#+Corozal+#+491");
TCN_addContentL("Veraguas+#+9+#+Las Palmas+#+58+#+El María+#+492");
TCN_addContentL("Veraguas+#+9+#+Las Palmas+#+58+#+El Prado+#+493");
TCN_addContentL("Veraguas+#+9+#+Las Palmas+#+58+#+El Rincón+#+494");
TCN_addContentL("Veraguas+#+9+#+Las Palmas+#+58+#+Las Palmas+#+489");
TCN_addContentL("Veraguas+#+9+#+Las Palmas+#+58+#+Lolá+#+495");
TCN_addContentL("Veraguas+#+9+#+Las Palmas+#+58+#+Pixvae+#+496");
TCN_addContentL("Veraguas+#+9+#+Las Palmas+#+58+#+Puerto Vidal+#+497");
TCN_addContentL("Veraguas+#+9+#+Las Palmas+#+58+#+San Martín de Porres+#+499");
TCN_addContentL("Veraguas+#+9+#+Las Palmas+#+58+#+Viguí+#+500");
TCN_addContentL("Veraguas+#+9+#+Las Palmas+#+58+#+Zapotillo+#+498");
TCN_addContentL("Veraguas+#+9+#+Mariato+#+59+#+Arenas+#+502");
TCN_addContentL("Veraguas+#+9+#+Mariato+#+59+#+El Cacao+#+503");
TCN_addContentL("Veraguas+#+9+#+Mariato+#+59+#+Mariato+#+501");
TCN_addContentL("Veraguas+#+9+#+Mariato+#+59+#+Quebro+#+504");
TCN_addContentL("Veraguas+#+9+#+Mariato+#+59+#+Tebario+#+505");
TCN_addContentL("Veraguas+#+9+#+Montijo+#+60+#+Cébaco+#+511");
TCN_addContentL("Veraguas+#+9+#+Montijo+#+60+#+Costa Hermosa+#+512");
TCN_addContentL("Veraguas+#+9+#+Montijo+#+60+#+Gobernadora+#+507");
TCN_addContentL("Veraguas+#+9+#+Montijo+#+60+#+La Garceana+#+508");
TCN_addContentL("Veraguas+#+9+#+Montijo+#+60+#+Leones+#+509");
TCN_addContentL("Veraguas+#+9+#+Montijo+#+60+#+Montijo+#+506");
TCN_addContentL("Veraguas+#+9+#+Montijo+#+60+#+Pilón+#+510");
TCN_addContentL("Veraguas+#+9+#+Montijo+#+60+#+Unión del Norte+#+513");
TCN_addContentL("Veraguas+#+9+#+Río de Jesús+#+61+#+14 de Noviembre+#+518");
TCN_addContentL("Veraguas+#+9+#+Río de Jesús+#+61+#+Las Huacas+#+515");
TCN_addContentL("Veraguas+#+9+#+Río de Jesús+#+61+#+Los Castillos+#+516");
TCN_addContentL("Veraguas+#+9+#+Río de Jesús+#+61+#+Río de Jesús+#+514");
TCN_addContentL("Veraguas+#+9+#+Río de Jesús+#+61+#+Utira+#+517");
TCN_addContentL("Veraguas+#+9+#+San Francisco+#+62+#+Corral Falso+#+520");
TCN_addContentL("Veraguas+#+9+#+San Francisco+#+62+#+Los Hatillos+#+521");
TCN_addContentL("Veraguas+#+9+#+San Francisco+#+62+#+Remance+#+522");
TCN_addContentL("Veraguas+#+9+#+San Francisco+#+62+#+San Francisco+#+519");
TCN_addContentL("Veraguas+#+9+#+San Francisco+#+62+#+San José+#+524");
TCN_addContentL("Veraguas+#+9+#+San Francisco+#+62+#+San Juan+#+523");
TCN_addContentL("Veraguas+#+9+#+Santa Fé+#+63+#+Calovébora+#+526");
TCN_addContentL("Veraguas+#+9+#+Santa Fé+#+63+#+El Alto+#+527");
TCN_addContentL("Veraguas+#+9+#+Santa Fé+#+63+#+El Cuay+#+528");
TCN_addContentL("Veraguas+#+9+#+Santa Fé+#+63+#+El Pantano+#+529");
TCN_addContentL("Veraguas+#+9+#+Santa Fé+#+63+#+Gatuncito+#+530");
TCN_addContentL("Veraguas+#+9+#+Santa Fé+#+63+#+Río Luis+#+531");
TCN_addContentL("Veraguas+#+9+#+Santa Fé+#+63+#+Rubén Cantú+#+532");
TCN_addContentL("Veraguas+#+9+#+Santa Fé+#+63+#+Santa Fé+#+525");
TCN_addContentL("Veraguas+#+9+#+Santiago+#+64+#+Canto del Llano+#+539");
TCN_addContentL("Veraguas+#+9+#+Santiago+#+64+#+Carlos Santana Avila+#+541");
TCN_addContentL("Veraguas+#+9+#+Santiago+#+64+#+Edwin Fábrega+#+542");
TCN_addContentL("Veraguas+#+9+#+Santiago+#+64+#+La Colorada+#+534");
TCN_addContentL("Veraguas+#+9+#+Santiago+#+64+#+La Peña+#+535");
TCN_addContentL("Veraguas+#+9+#+Santiago+#+64+#+La Raya de Santa María+#+536");
TCN_addContentL("Veraguas+#+9+#+Santiago+#+64+#+Los Algarrobos+#+540");
TCN_addContentL("Veraguas+#+9+#+Santiago+#+64+#+Ponuga+#+537");
TCN_addContentL("Veraguas+#+9+#+Santiago+#+64+#+San Martín de Porres+#+543");
TCN_addContentL("Veraguas+#+9+#+Santiago+#+64+#+San Pedro del Espino+#+538");
TCN_addContentL("Veraguas+#+9+#+Santiago+#+64+#+Santiago+#+533");
TCN_addContentL("Veraguas+#+9+#+Santiago+#+64+#+Urracá+#+544");
TCN_addContentL("Veraguas+#+9+#+Soná+#+65+#+Bahía Honda+#+546");
TCN_addContentL("Veraguas+#+9+#+Soná+#+65+#+Calidonia+#+547");
TCN_addContentL("Veraguas+#+9+#+Soná+#+65+#+Cativé+#+548");
TCN_addContentL("Veraguas+#+9+#+Soná+#+65+#+El Marañón+#+549");
TCN_addContentL("Veraguas+#+9+#+Soná+#+65+#+Guarumal+#+550");
TCN_addContentL("Veraguas+#+9+#+Soná+#+65+#+La Soledad+#+551");
TCN_addContentL("Veraguas+#+9+#+Soná+#+65+#+Quebrada de Oro+#+552");
TCN_addContentL("Veraguas+#+9+#+Soná+#+65+#+Río Grande+#+553");
TCN_addContentL("Veraguas+#+9+#+Soná+#+65+#+Rodeo Viejo+#+554");
TCN_addContentL("Veraguas+#+9+#+Soná+#+65+#+Soná+#+545");
TCN_reloadL();
