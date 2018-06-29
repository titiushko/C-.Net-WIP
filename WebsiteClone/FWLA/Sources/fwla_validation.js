 $(document).ready(function(){

	jQuery.validator.addMethod("username", function( value, element ) {
		var result = this.optional(element) || ( value.length >= 6 && value.length <= 8); // && /\d/.test(value) && /[a-z]/i.test(value);
		if (!result) {
			element.value = "";
			var validator = this;
			setTimeout(function() {
				validator.blockFocusCleanup = true;
				element.focus();
				validator.blockFocusCleanup = false;
			}, 1);
		}
		return result;
	}, "El Usuario debe contener mínimo 6 y máximo 8 caracteres.");
	
	$.validator.addMethod("pageRequired", function(value, element) {
		var $element = $(element)
		function match(index) {
			return current == index && $(element).parents("#sf" + (index + 1)).length;
		}
		if (match(0) || match(1) || match(2)) {
			return !this.optional(element);
		}
		return "dependency-mismatch";
	}, $.validator.messages.required)
	
	jQuery.validator.addMethod("terminal", function( value, element ) {
		var result = this.optional(element) || (value.length <= 8 && /^[a-z0-9\_]+$/i.test(value));
		if (!result) {
			element.value = "";
			var validator = this;
			setTimeout(function() {
				validator.blockFocusCleanup = true;
				element.focus();
				validator.blockFocusCleanup = false;
			}, 1);
		}
		return result;
	}, "El Nombre de Terminal debe tener máximo 8 caracteres. No se permiten caracteres especiales.");
	
	jQuery.validator.addMethod("bankvalid", function( value, element ) {
		var result = this.optional(element) || (value.length <= 31 && /^[a-zA-Z0-9., ]+$/i.test(value));
		if (!result) {
			element.value = "";
			var validator = this;
			setTimeout(function() {
				validator.blockFocusCleanup = true;
				element.focus();
				validator.blockFocusCleanup = false;
			}, 1);
		}
		return result;
	}, "El Nombre del Banco sólo debe hasta 31 caracteres entre letras y números. No se permiten caracteres especiales.");
	
	jQuery.validator.addMethod("contrato", function( value, element ) {
		var result = this.optional(element) || (/^[a-z0-9\-]+$/i.test(value));
		if (!result) {
			element.value = "";
			var validator = this;
			setTimeout(function() {
				validator.blockFocusCleanup = true;
				element.focus();
				validator.blockFocusCleanup = false;
			}, 1);
		}
		return result;
	}, "El Nº de contrato sólo debe contener letras, digitos y guiones. No se permiten otros caracteres.");
	
	jQuery.validator.addMethod("bono", function( value, element ) {
		var result = this.optional(element) || (/^[A-Za-z0-9]+$/i.test(value));
		if (!result) {
			element.value = "";
			var validator = this;
			setTimeout(function() {
				validator.blockFocusCleanup = true;
				element.focus();
				validator.blockFocusCleanup = false;
			}, 1);
		}
		return result;
	}, "El Nº de Bono/Deuda/Pagaré sólo debe contener letras y digitos. Sin guiones, ni otros caracteres.");
	
	jQuery.validator.addMethod("password", function( value, element ) {
		var result = this.optional(element) || value.length >= 8; // && /\d/.test(value) && /[a-z]/i.test(value);
		if (!result) {
			element.value = "";
			var validator = this;
			setTimeout(function() {
				validator.blockFocusCleanup = true;
				element.focus();
				validator.blockFocusCleanup = false;
			}, 1);
		}
		return result;
	}, "Su contraseña debe tener por lo menos 8 caracteres.");
	
	jQuery.validator.addMethod("approval", function( value, element ) {
		var result = this.optional(element) || ( value.length > 5 && value.length < 7); // && /\d/.test(value) && /[a-z]/i.test(value);
		if (!result) {
			element.value = "";
			var validator = this;
			setTimeout(function() {
				validator.blockFocusCleanup = true;
				element.focus();
				validator.blockFocusCleanup = false;
			}, 1);
		}
		return result;
	}, "El código de aprobación debe tener 6 caracteres solamente.");
	
	jQuery.validator.addMethod("celular", function( value, element ) {
		var result = this.optional(element) || (value.length > 7 && value.length < 9  && /\d/.test(value) ); //&& /[a-z]/i.test(value);
		if (!result) {
			element.value = "";
			var validator = this;
			setTimeout(function() {
				validator.blockFocusCleanup = true;
				element.focus();
				validator.blockFocusCleanup = false;
			}, 1);
		}
		return result;
	}, "El Celular debe tener 8 digitos solamente. Sólo números, sin guiones.");
	
	jQuery.validator.addMethod("telefono", function( value, element ) {
		var result = this.optional(element) || (value.length > 6 && value.length < 8  && /\d/.test(value) ); //&& /[a-z]/i.test(value);
		if (!result) {
			element.value = "";
			var validator = this;
			setTimeout(function() {
				validator.blockFocusCleanup = true;
				element.focus();
				validator.blockFocusCleanup = false;
			}, 1);
		}
		return result;
	}, "El Telefono debe tener 7 digitos solamente. Sólo números, sin guiones.");
	
	jQuery.validator.addMethod("PlayerPwd", function( value, element ) {
		var result = this.optional(element) || value.length >= 8; // && /\d/.test(value) && /[a-z]/i.test(value);
		if (!result) {
			element.value = "";
			var validator = this;
			setTimeout(function() {
				validator.blockFocusCleanup = true;
				element.focus();
				validator.blockFocusCleanup = false;
			}, 1);
		}
		return result;
	}, "Su contraseña debe tener por lo menos 8 caracteres.");
	
	jQuery.validator.addMethod("PlayerPwdE", function( value, element ) {
		var result = this.optional(element) || value.length >= 8; // && /\d/.test(value) && /[a-z]/i.test(value);
		if (!result) {
			element.value = "";
			var validator = this;
			setTimeout(function() {
				validator.blockFocusCleanup = true;
				element.focus();
				validator.blockFocusCleanup = false;
			}, 1);
		}
		return result;
	}, "Su contraseña debe tener por lo menos 8 caracteres.");
	
	$.validator.addMethod('CheckDOB', function(value, element) {
	var PlayerDOB = $("#PlayerDOB").val();
		var PlayDate = PlayerDOB.split("-");
		var day = PlayDate[2];
		var month = PlayDate[1];
		var year = PlayDate[0];
		var age = 18;
		var mydate = new Date();
		mydate.setFullYear(year, month-1, day);

		var currdate = new Date();
		currdate.setFullYear(currdate.getFullYear() - age);

		return (currdate - mydate < 0 ? false : true);
}, "Usted debe ser mayor de 18 años para participar.");
	
	jQuery.validator.addMethod('DateGreaterThan', function(value,element,param) {
		var thisDate = value;
		var PlayDate = thisDate.split("-");
		var day = PlayDate[2];
		var month = PlayDate[1];
		var year = PlayDate[0];
		dateS = new Date();
		dateS.setFullYear(year, month-1, day);
		var mydate = $(param).val();
		var CompDate = mydate.split("-");
		var dayC = CompDate[2];
		var monthC = CompDate[1];
		var yearC = CompDate[0];
		dateE = new Date();
		dateE.setFullYear(yearC,monthC-1,dayC);
		return (dateE <= dateS ? true : false)
	}, "La fecha de fin no puede ser menor que la de inicio.");
	
	jQuery.validator.addMethod('CDateGreaterThan', function(value,element,param) {
		var thisDate = value;
		var PlayDate = thisDate.split("-");
		var day = PlayDate[2];
		var month = PlayDate[1];
		var year = PlayDate[0];
		dateS = new Date();
		dateS.setFullYear(year, month-1, day);
		var mydate = $(param).val();
		var CompDate = mydate.split("-");
		var dayC = CompDate[2];
		var monthC = CompDate[1];
		var yearC = CompDate[0];
		dateE = new Date();
		dateE.setFullYear(yearC,monthC-1,dayC);
		return (dateE <= dateS ? true : false)
	}, "La fecha de vencimiento no puede ser menor que la de emisión.");
	
	jQuery.validator.addMethod("epassword", function( value, element ) {
		var result = this.optional(element) || value.length >= 8 && /\d/.test(value) && /[a-z]/i.test(value);
		if (!result) {
			element.value = "";
			var validator = this;
			setTimeout(function() {
				validator.blockFocusCleanup = true;
				element.focus();
				validator.blockFocusCleanup = false;
			}, 1);
		}
		return result;
	}, "Su contraseña debe tener por lo menos 8 caracteres y debe contener por lo menos 1 letra y 1 número.");
	
	$.validator.addMethod('CheckBank', function(value, element) {
		var CReference = $("#CReference").val();
		var TContractID = $("#TContractID").val();
		var refParts = CReference.split("-");
		var rvalue = refParts.length-1;
		var  bond = refParts[rvalue];
		if (TContractID == '01') {
		bank = refParts[1];
		$('#CBond').val(bond);
		} else {
		bank = refParts[0];
		$('#CBond').val(refParts[rvalue-1]+'-'+bond);	
		}
		return ($('#BankID option[value='+bank+']').length != 0 ? true : false);
}, "Verifique el código del acreedor, el ingresado no existe.");
	
	$.validator.addMethod('CheckContract', function(value, element) {
		var CBank = $("#UsrBank").val();
		var CReference = $("#OrderCReference").val();
		var refParts = CReference.split("-");
		var bank = refParts[0];
		return (CBank === bank ? true : false);
}, "Verifique el número de contrato, no coincide con su banco.");
	
	// a custom method making the default value for companyurl ("http://") invalid, without displaying the "invalid url" message
	jQuery.validator.addMethod("defaultInvalid", function(value, element) {
		return value != element.defaultValue;
	}, "");
	
	jQuery.validator.addMethod("billingRequired", function(value, element) {
		if ($("#bill_to_co").is(":checked"))
			return $(element).parents(".subTable").length;
		return !this.optional(element);
	}, "");
	
	jQuery.validator.addMethod('ReqUpload', function(value,element,param) {
		if ($('#AutomaticLib').val() == 'Y' && $('#digitalrev').is(':empty')) {
			console.log("False");
			return false }
			else {
			console.log("True");	
				return true }
	}, "Cargue el slip de pago.");
	
	jQuery.validator.addMethod('Mandatoryload', function(value,element,param) {
		if ($('#digitalrev').is(':empty') ) {
			console.log("False");
			return false }
			else {
			console.log("True");	
				return true }
	}, "Cargue la solicitud de cancelación.");
	
	/* jQuery.validator.addMethod("TransRequired", function(value, element) {
		return !this.optional(element);
	  }, "Se requiere por los menos una transacción seleccionada"); */
	
	$.validator.addMethod('IP4Checker', function(value) {
	var ip = "^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$";
		return value.match(ip);}, 'Introduzca una IP pública válida');
		
	$.validator.addMethod("notEqualTo", function(value, element, param) {
    var notEqual = true;
    value = $.trim(value);
    for (i = 0; i < param.length; i++) {
        if (value == $.trim($(param[i]).val())) { notEqual = false; }
    }
    return this.optional(element) || notEqual;
},
"Favor seleccione un valor diferente."
);
	
	jQuery.validator.messages.required = "";
	var v = $("#mlgform").validate({
		invalidHandler: function(e, validator) {
			var errors = validator.numberOfInvalids();
			if (errors) {
				validator.errorList[0].element.focus();
				var message = errors == 1
					? 'Error en el campo resaltado'
					: 'Error en los ' + errors + ' campos resaltados';
				$("div.error span").html(message);
				$("div.error").show();
			} else {
				$("div.error").hide();
			}
		},
		//ignore: ':hidden:not("#BankID,#Score")',
		success: function(label) {
			// set   as text for IE
			label.html(" ").addClass('checked');
		},
		onkeyup: false,
		submitHandler: function(form) {
			$("div.error").hide();
			/* form.submit(); */
			$.blockUI({theme:     true, 
            title:    'Procesando', 
            message:  '<div id="floatingCirclesG"><div class="f_circleG" id="frotateG_01"></div><div class="f_circleG" id="frotateG_02"></div><div class="f_circleG" id="frotateG_03"></div><div class="f_circleG" id="frotateG_04"></div><div class="f_circleG" id="frotateG_05"></div><div class="f_circleG" id="frotateG_06"></div><div class="f_circleG" id="frotateG_07"></div><div class="f_circleG" id="frotateG_08"></div></div><strong>Favor espere...</strong>',
			themedCSS: { 
        width:          '10%', 
        textAlign:      'center',
		top:  ($(window).height() - ($(window).height()*.10) ) /2 + 'px', 
        left: ($(window).width() - ($(window).height()*.10) ) /2 + 'px',
		'-webkit-border-radius': '10px', 
        '-moz-border-radius':    '10px',
		'border-radius': '10px'
    }, 
	centerX: true,
    centerY: true,
	timeout: 5000});
			$("#mymain").empty();
			$('input[type=submit]', this).attr('disabled', 'disabled');
			$(form).ajaxSubmit({
				target:'#mymain',
				cache: false,
				complete: function() {
					$("a[rel^='prettyPhoto']").prettyPhoto({theme:'facebook',social_tools: false,allow_resize: true});
					$("#altgrid tr:odd,#facility tr:odd,#auto tr:odd,#equipo tr:odd,#inmueble tr:odd,#deposito tr:odd,#otros tr:odd").addClass("odd");
					$.unblockUI();
				}
			});	 
			return false;
		},rules: {
			captcha: {
				required: true,
				minlength: 5,
				equalTo: "#captcha2"
			},
			Username: {
				required: true,
				remote: { url: "./modules/check_username.php"}
			},
			Name: {
				required: true
			},
			UserID: {
				required: true
			},
			Email: {
				required: true,
				email: true,
				remote: { url: "./modules/check_new_email.php"}
			},
			EmailU: {
				required: true,
				email: true
			},
			BankName: {
				bankvalid: true,
				remote: { url: "./modules/check_bank_name.php"},
				required: true
			},
			BankNameE: { 
			    bankvalid: true,
				required: true
			},
			DistributorName: {
				remote: { url: "./modules/check_distributor_name.php"},
				required: true
			},
			ProvinceName: {
				remote: { url: "./modules/check_province_name.php"},
				required: true
			},
			ProvinceNameE: {
				required: true
			},
			ProvinceID: {
				required: true
			},
			DistrictName: {
				remote: {
        url: "./modules/check_district_name.php",
        type: "get",
        data: {
          ProvinceID: function() {
            return $( "#ProvinceID" ).val();
          }
        },
		required: true
      },
				required: true
			},
			DistrictID: {
				required: true
			},
			DistrictNameE: {
				required: true
			},
			CorrName: {
				remote: {
        url: "./modules/check_corr_name.php",
        type: "get",
        data: {
          DistrictID: function() {
            return $( "#DistrictID" ).val();
          }
        },
		required: true
      },
				required: true
			},
			CorrID: {
				required: true
			},
			CorrNameE: {
				required: true
			},
			TContractName: {
				remote: { url: "./modules/check_tcontract_name.php"},
				required: true
			},
			TContractNameE: { 
				required: true
			},
			TContractStatus: { 
				required: true
			},
			WarrantyName: {
				remote: {
        url: "./modules/check_warr_name.php",
        type: "get",
        data: {
          TContractID: function() {
            return $( "#TContractID" ).val();
          }
        },
		required: true
      }, required: true
			},
			TContractID: { 
				required: true
			},
			WarrantyID: {
				required: true
			},
			WarrantyCodeSB: {
				required: true,
				digits: true
			},
			WarrantyNameE: {
				required: true
			},
			WarrantyStatus: {
				required: true
			},
			DateEnd: {
				DateGreaterThan: '#DateStart'
				},	
			CDateEnd: {
				CDateGreaterThan: '#CDateStart'
				},	
			CReference: {
				required: true,
				contrato: true,
				CheckBank: true,
				remote: "./modules/check_contract.php"
			},
			BankID: {
				remote: {
        url: "./modules/check_contract.php",
        type: "get",
        data: {
          CReference: function() {
			  var str = $('#CDateStart').val();
            return $("#BankID").val()+"-03-"+str.substr(2,2)+"-"+$('#CBond').val();
          }
        }
			}
			},
			BankIDE: {
				remote: {
        url: "./modules/check_ex_contract.php",
        type: "get",
        data: {
          CReference: function() {
			  var str = $('#CDateStart').val();
            return $("#BankIDE").val()+"-03-"+str.substr(2,2)+"-"+$('#CBondE').val();
          },ContractID: function() {
            return $("#ContractID").val();
          }
        }
			}
			},
			CBond: {
				required: true
			},
			CBondE: {
				required: true
			},
			CInvoice: {
				number: true
			},
			CBondValue: {
				required: true,
				number: true
			},
			CMonthlyPayment: {
				required: true,
				number: true
			},
			CInterestRate: {
				required: true,
				number: true
			},
			CEffectiveRate: {
				number: true
			},
			CClosingRate: {
				number: true
			},
			CAssetValue: {
				number: true
			},
			CPostalFee: {
				number: true
			},
			CCommission: {
				required: true,
				number: true
			},
			CBeneficiaryTID: {
				required: function(element){
            return $("#CBeneficiary").val().length > 0;
        }
			},
			CBeneficiaryID: {
				required: function(element){
            return $("#CBeneficiary").val().length > 0;
        }
			},
			'CGuarantee[0]': {
				required: true
			},
			'CGuarantee[1]': {
				required: true
			},
			'CGuarantee[2]': {
				required: true
			},
			'CGuarantee[3]': {
				required: true
			},
			'CGuarantee[4]': {
				required: true
			},
			"CGuaranteedAmount[0]": {
				required: true,
				number: true
			},
			"CGuaranteedAmount[1]": {
				required: true,
				number: true
			},
			"CGuaranteedAmount[2]": {
				required: true,
				number: true
			},
			"CGuaranteedAmount[3]": {
				required: true,
				number: true
			},
			"CGuaranteedAmount[4]": {
				required: true,
				number: true
			},
			CLegalIDN: {
				remote: "./modules/check_new_customer.php"
			},
			CEmail: {
				email: true
			},
			CPhoneH: {
				telefono: true
			},
			CPhoneO: {
				telefono: true
			},
			CMobile: {
				celular: true
			},
			CPhoneHa: {
				telefono: true
			},
			CPhoneOa: {
				telefono: true
			},
			CMobilea: {
				celular: true
			},
			MaEValue: {
				number: true
			},
			MaValue: {
				number: true
			},
			PValue: {
				number: true
			},
			AccountAmount: {
				number: true
			},
			InvestQty: {
				number: true
			},
			InvestExpiryDate: {
				CDateGreaterThan: '#InvestEmitedDate'
			},
			PasswordN: {
				required: true
			},
			PasswordNR: {
				equalTo: "#PasswordN"
			},
			PasswordNew: {
				required: true
			},
			PasswordNewR: {
				equalTo: "#PasswordNew"
			},
			Score: {
				min: 50
			},
			OrderPaid: {
				required: true,
				number: true,
				equalTo: "#OrderTotal"
			},
			OrderReceipt: {
				required: true,
				number: true,
			},
			OrderPayType: {
				required: true
			},
			OrderBType: {
				remote: {
        url: "./modules/check_bank_order.php",
        type: "get",
        data: {
          OrderContract: function() {
            return $( "#OrderContract" ).val();
          }
        },
		required: true
      },
				required: true
			},
			OrderCReference: {
				required: true,
				CheckContract: true
			},
			AutomaticLib : {
				ReqUpload: true
			},
			"Docs[]": {
			Mandatoryload: true
			}
			},
		messages: {
			Password: {
				required: "Contraseña requerida."
			},
			Username: {
				required: "Usuario requerido.",
				remote: "Usuario en uso"
			},
			UserID: {
				required: "Seleccione un Usuario"
			},
			Email: {
				required: "Email requerido.",
				email: "Ingrese un correo válido. Por ejemplo: sunombre@dominio.com",
				remote: "Este email ya existe en nuestros registros, utilice otro."
			},
			EmailU: {
				required: "Email requerido.",
				email: "Ingrese un correo válido. Por ejemplo: sunombre@dominio.com"
			},
			UserLevel: {
				required: "Nivel de Acceso requerido."
			},
			UserBank: {
				required: "Banco requerido."
			},
			UserStatus: {
				required: "Status requerido."
			},
			Name: {
				required: "Nombre Completo requerido."
			},
			BankID: {
				required: "El Acreedor es requerido.",
				remote: "Ya existe un contrato de este banco con el Bono/Pagaré indicado."
			},
			BankIDE: {
				required: "El Acreedor es requerido.",
				remote: "Ya existe un contrato de este banco con el Bono/Pagaré indicado."
			},
			BankName: {
				remote: "Este Acreedor ya existe en nuestros registros, utilice otro.",
				required: "El Nombre del Acreedor es requerido."
			},
			BankNameE: { 
				required: "El Nombre de Acreedor es requerido"
			},
			DistributorName: {
				remote: "Este Distribuidor ya existe en nuestros registros, utilice otro",
				required: "El Nombre del Distribuidor es requerido"
			},
			DistributorNameE: {
				required: "El Nombre del Distribuidor es requerido"
			},
			ProvinceName: {
				remote: "Esta Provincia ya existe en nuestros registros, utilice otra",
				required: "El Nombre de la Provincia es requerido"
			},
			ProvinceNameE: {
				required: "El Nombre de la Provincia es requerido"
			},
			ProvinceStatus: {
				required: "El Status de la Provincia es requerido"
			},
			ProvinceID: {
				required: "Seleccione una Provincia"
			},
			DistrictName: {
				remote: "Este Distrito ya existe en nuestros registros, utilice otro",
				required: "El Nombre del Distrito es requerido"
			},
			DistrictID: {
				required: "Seleccione un Distrito",
				},
			DistrictNameE: {
				required: "El Nombre del Distrito es requerido"
			},
			CorrName: {
				remote: "Este Corregimiento ya existe en nuestros registros, utilice otro",
				required: "El Nombre del Corregimiento es requerido"
			},
			CorrID: {
				required: "Seleccione un Corregimiento"
				},
			CorrNameE: {
				required: "El Nombre del Corregimiento es requerido"
			},
			CorrStatus: {
				required: "El Status del Corregimiento es requerido"
			},
			TContractName: {
				remote: "Este Tipo de Contrato ya existe en nuestros registros, utilice otro",
				required: "El Tipo de Contrato es requerido"
			},
			TContractNameE: { 
				required: "El Tipo de Contrato es requerido"
			},
			TContractStatus: { 
				required: "El Status del Tipo de Contrato es requerido"
			},
			WarrantyName: {
				remote: "Este Tipo de Garantía ya existe en nuestros registros, utilice otro",
				required: "El Tipo de Garantía es requerido"
			},
			TContractID: {
				required: "El Tipo de Contrato es requerido"
			},
			WarrantyID: {
				required: "El Tipo de Garantía es requerido"
			},
			WarrantyCodeSB: {
				required: "El código de la Superintendencia es requerido.",
				digits: "Ingrese sólo números."
			},
			WarrantyNameE: {
				required: "El Tipo de Garantía es requerido"
			},
			WarrantyStatus: {
				required: "El Status del Tipo de Garantía es requerido"
			},		
			DateStart: {
      		required: "Ingrese la fecha de inicio.",
			dateISO: "Escriba una fecha correcta (AAAA-MM-DD)."
    		},
			DateEnd: {
      		required: "Ingrese la fecha de fin.",
			dateISO: "Escriba una fecha correcta (AAAA-MM-DD)."
    		},
			CDateStart: {
      		required: "Ingrese la fecha de emisión.",
			dateISO: "Escriba una fecha correcta (AAAA-MM-DD)."
    		},
			CDateEnd: {
      		required: "Ingrese la fecha de vencimiento.",
			dateISO: "Escriba una fecha correcta (AAAA-MM-DD)."
    		},
			CPayStart: {
      		required: "Ingrese la fecha del primer pago.",
			dateISO: "Escriba una fecha correcta (AAAA-MM-DD)."
    		},
			CDisbursementDate: {
			dateISO: "Escriba una fecha correcta (AAAA-MM-DD)."
    		},
			CPayDay: {
      		required: "Ingrese el día de pago mensual.",
    		},
			CReference: {
				required: "El Nº de contrado es requerido.",
				remote: "Este contrato ya existe en nuestros registros.  Verifique la numeración."
			},
			CBond: {
				required: "El Nº de Bono es requerido."
			},
			CBondE: {
				required: "El Nº de Bono es requerido."
			},
			CInvoice: {
				required: "El Nº de Factura es requerido.",
				number: "La Factura sólo puede contener números."
			},
			CBondValue: {
				required: "El Valor del Bono es requerido.",
				number: "El Valor sólo puede contener números, comas y punto decimal."
			},
			CMonthlyPayment: {
				required: "La Letra Mensual es requerida.",
				number: "El Valor sólo puede contener números, comas y punto decimal."
			},
			CContractType: {
				required: "El Tipo de Contrato es requerido."
			},
			CInterestRate: {
				required: "La Tasa de Interés es requerida.",
				number: "El Valor sólo puede contener números, comas y punto decimal."
			},
			CEffectiveRate: {
				number: "El Valor sólo puede contener números, comas y punto decimal."
			},
			CClosingRate: {
				required: "El valor de Comisión de Trámite es requerido.",
				number: "El Valor sólo puede contener números, comas y punto decimal."
			},
			CAssetValue: {
				required: "El Valor Actual del Bien es requerido.",
				number: "El Valor sólo puede contener números, comas y punto decimal."
			},
			CAAmount: {
				number: "El Valor sólo puede contener números, comas y punto decimal."
			},
			CPostalFee: {
				number: "El Valor sólo puede contener números, comas y punto decimal."
			},
			CCommission: {
				required: "La Comisión es requerida.",
				number: "El Valor sólo puede contener números, comas y punto decimal."
			},
			CBeneficiaryTID: {
				required: "El tipo de identificación es requerido."
			},
			CBeneficiaryID: {
				required: "La Identificación es requerida."
			},
			CInsurer: {
				required: "El Endoso de la Póliza de vida es requerido."
			},
			CAssesor: {
				required: "El Endoso de la Póliza de auto es requerido."
			},
			CReseller: {
				required: "Ingrese el nombre del Revendedor."
			},
			'CGuarantee[0]': {
				required: "Seleccione una facilidad."
			},
			'CGuarantee[1]': {
				required: "Seleccione una facilidad."
			},
			'CGuarantee[2]': {
				required: "Seleccione una facilidad."
			},
			'CGuarantee[3]': {
				required: "Seleccione una facilidad."
			},
			'CGuarantee[4]': {
				required: "Seleccione una facilidad."
			},
			"CGuaranteedAmount[0]": {
				required: "El monto es obligatorio.",
				number: "El Valor sólo puede contener números, comas y punto decimal."
			},
			"CGuaranteedAmount[1]": {
				required: "El monto es obligatorio.",
				number: "El Valor sólo puede contener números, comas y punto decimal."
			},
			"CGuaranteedAmount[2]": {
				required: "El monto es obligatorio.",
				number: "El Valor sólo puede contener números, comas y punto decimal."
			},
			"CGuaranteedAmount[3]": {
				required: "El monto es obligatorio.",
				number: "El Valor sólo puede contener números, comas y punto decimal."
			},
			"CGuaranteedAmount[4]": {
				required: "El monto es obligatorio.",
				number: "El Valor sólo puede contener números, comas y punto decimal."
			},
			"CCustomerType[]": {
				required: "Seleccione el tipo de cliente"
			},
			CLegalID: {
				required: "La Identificación es requerida."
			},
			CLegalIDN: {
				required: "La identificación es requerida",
				remote: "Ya existe un cliente con esta identificación en nuestros registros. Favor verifique y trate nuevamente."
			},
			CCustType: {
				required: "El Tipo de Cliente es requerido."
			},
			CLegalType: {
				required: "El Tipo de Documento es requerido."
			},
			CLegalName: {
				required: "El Nombre Legal Completo es requerido."
			},
			CCommercialName: {
				required: "El Nombre Comercial es requerido."
			},
			CLegalRep: {
				required: "El Representante Legal es requerido."
			},
			CLegalRT: {
				required: "El Tipo de Identificación es requerido."
			},
			CLegalRID: {
				required: "La Identificación es requerida."
			},
			CCitizenship: {
				required: "La Ciudadanía es requerida."
			},
			CLanguage: {
				required: "Favor confirme si el cliente entiende español y no necesita intérprete."
			},
			CSex: {
				required: "El Sexo es requerido."
			},
			CCustomerType: {
				required: "Seleccione un rol"
			},
			CProvince: {
				required: "La Provincia es requerida."
			},
			CDistrict: {
				required: "El Distrito es requerido."
			},
			CCorregiment: {
				required: "El Corregimiento es requerido."
			},
			CStreet: {
				required: "La Direccción es requerida.",
			},
			CEmail: {
				email: "Ingrese un correo válido. Por ejemplo: sunombre@dominio.com",
				required: "El correo electrónico es obligatorio."
			},
			CMobile: {
				required: "El número de celular es obligatorio."
			},
			"OrderDriver[0]": {
				required: "Ingrese el nombre del conductor autorizado."
			},
			"OrderDriver[1]": {
				required: "Ingrese el nombre del conductor autorizado."
			},
			"OrderDriver[2]": {
				required: "Ingrese el nombre del conductor autorizado."
			},
			"OrderDriverID[0]": {
				required: "Ingrese la identificación del conductor autorizado."
			},
			"OrderDriverID[1]": {
				required: "Ingrese la identificación del conductor autorizado."
			},
			"OrderDriverID[2]": {
				required: "Ingrese la identificación del conductor autorizado."
			},
			CPhoneH: {
				required: "Ingrese un teléfono residencial. Sin guiones."
			},
			AutomaticLib: {
				required: "Seleccione si el cliente pagó el trámite de liberación o no."
			},
			OrderBType: {
				remote: "Ya existe una solicitud de este tipo para este préstamo. Favor verifique",
				required: "El Tipo de servicio es obligatorio."
			},
			OrderReference: {
				required: "El número de préstamo interno es obligatorio."
			},
			CStatus: {
				required: "El Status es requerido."
			},
			CLSigner: {
				required: "El Firmante es requerido."
			},
			MaLicensePlate: {
				required: "La Placa es requerida."
			},
			MaLicenseMonth: {
				required: "El Mes de Revisado es requerida."
			},
			MaBrand: {
				required: "La Marca es requerida."
			},
			MaModel: {
				required: "El Modelo es requerido."
			},
			MaYear: {
				required: "El Año es requerido."
			},
			MaValue: {
				required: "El Valor es requerido.",
				number: "El Valor sólo puede contener números, comas y punto decimal."
			},
			MaVin: {
				required: "El Chasis es requerido."
			},
			MaEngineN: {
				required: "El Motor es requerido."
			},
			MaType: {
				required: "El Tipo de Vehículo es requerido."
			},
			MaColor: {
				required: "El Color es requerido."
			},
			MaMunicipality: {
				required: "El Municipio es requerido."
			},
			MaFuel: {
				required: "El Tipo de Combustible es requerido."
			},
			MaTransmission: {
				required: "La Transmisión es requerida."
			},
			MaShifts: {
				required: "Las Velocidades son requeridas."
			},
			MaCylinders: {
				required: "Los Cilindros son requeridos."
			},
			MaOwner: {
				required: "El Nombre del Propietario es requerido."
			},
			MaOwnerTID: {
				required: "El Tipo de Identificación es requerida."
			},
			MaOwnerID: {
				required: "El Número de Identificación es requerido."
			},
			MaInsurer: {
				required: "La Aseguradora es requerida."
			},
			MaInsurance: {
				required: "El Número de Póliza es requerido."
			},
			MaOwnership: {
				required: "El Gravamen Hipotecario es requerido."
			},
			MaOwnershipType: {
				required: "El Tipo de Propiedad es requerido."
			},
			MaRestrictions: {
				required: "Las Restricciones son requeridas."
			},
			MaEBrand: {
				required: "La Marca es requerida."
			},
			MaEModel: {
				required: "El Modelo es requerido."
			},
			MaEYear: {
				required: "El Año es requerido."
			},
			MaEValue: {
				required: "El Valor es requerido.",
				number: "El Valor sólo puede contener números, comas y punto decimal."
			},
			MaEVin: {
				required: "El Chasis o Serie es requerida."
			},
			MaEEngineN: {
				required: "El Motor es requerido."
			},
			Finca: {
				required: "La Finca es requerida."
			},
			Documento: {
				required: "El Documento es requerido."
			},
			PValue: {
				required: "El Valor es requerido.",
				number: "El Valor sólo puede contener números, comas y punto decimal."
			},
			captcha: {
				required: "Ingrese el código de seguridad.",
				minlength: "El código de seguridad tiene mínimo 5 caracteres.",
				equalTo: "El código de seguridad no coincide."
			},
			AccountType: {
				required: "El Tipo de Cuenta es requerido."
			},
			AccountNumber: {
				required: "El Número de Cuenta es requerido."
			},
			AccountBank: {
				required: "El Banco es requerido."
			},
			AccountAmount: {
				required: "El Monto es requerido.",
				number: "El Valor sólo puede contener números, comas y punto decimal."
			},
			InvestType: {
				required: "El Tipo de Inversión es requerido."
			},
			InvestNumber: {
				required: "El Número de Certificado es requerido."
			},
			InvestQty: {
				required: "La Cantidad de Certificados es requerida.",
				number: "Sólo se permite ingresar números."
			},
			InvestIssuer: {
				required: "El Emisor es requerido."
			},
			InvestAmount: {
				required: "El Valor es requerido."
			},
			AmountStart: {
				number: "Ingrese un número válido. Sólo incluya el punto decimal."
			},
			AmountEnd: {
				number: "Ingrese un número válido. Sólo incluya el punto decimal."
			},
			TransOrigin: {
				digits: "Ingrese sólo dígitos.  Sin guiones."
			},
			PasswordN: {
				required: "La nueva contraseña es requerida."
			},
			PasswordNR: {
				required: "Debe repetir la contraseña para su seguridad.",
				equalTo: "Las contraseñas no coinciden."
			},
			PasswordNew: {
				required: "La nueva contraseña es requerida."
			},
			PasswordNewR: {
				required: "Debe repetir la contraseña para su seguridad.",
				equalTo: "Las contraseñas no coinciden."
			},
			Score: {
				min: "Su contraseña es muy débil. No puede ser menor de 50%"
			},
			OrderType: {
				required: "El tipo de servicio es obligatorio."
			},
			CLicenseControl: {
				required: "El número de control de licencia es obligatorio."
			},
			PlateExpenses: {
				required: "Seleccione el tipo de placa."
			},
			OrderPaid: {
				required: "El monto cobrado es obligatorio.",
				number: "Ingrese un número válido. Sólo incluya el punto decimal.",
				equalTo: "El monto cobrado no coincide con el monto cotizado."
			},
			OrderReceipt: {
				required: "El Número de Recibo es obligatorio.",
				number: "Ingrese un número válido. Sólo incluya el punto decimal."
			},
			OrderPayType: {
				required: "El Modo de Pago es obligatorio."
			},
			ACHConf: {
				required: "La Confirmación de ACH es obligatoria."
			},
			OrderExpensesProgrammedMunicipal: {
				required: "El Monto de Gastos Municipales programados es obligatorio. Si no hay, colocar 0."
			},
			OrderExpensesProgrammedAttt: {
				required: "El Monto de Gastos Tránsito programados es obligatorio. Si no hay, colocar 0."
			},
			OrderAgent: {
				required: "Seleccione quien realizará el trámite."
			},
			OrderExpensesPaidMunicipal: {
				required: "El Monto de Gastos Municipales pagados es obligatorio. Si no hay, colocar 0."
			},
			OrderExpensesPaidAttt: {
				required: "El Monto de Gastos Tránsito pagados es obligatorio. Si no hay, colocar 0."
			},
			DelayReason: {
				required: "Escriba una razón para el retraso."
			},
			OrderInvoice: {
				required: "El Número de Factura es obligatorio.",
			},
			OrderIPayType: {
				required: "El Modo de Pago es obligatorio."
			},
			OrderStatus: {
				required: "El Status de la Orden es obligatorio."
			},
			OrderArea: {
				required: "El Area es obligatoria."
			},
			OrderOffice: {
				required: "La Sucursal es obligatoria."
			},
			OrderMotive: {
				required: "El Motivo de Cancelación es obligatorio."
			},
			OrderPayment: {
				required: "La Forma de Pago es obligatoria."
			},
			OrderCReference: {
				required: "El Número de Contrato es obligatorio."
			},
			OrderCountry: {
				required: "El País de Destino es obligatorio."
			},
			OrderDStart: {
				required: "La fecha de Salida es oligatoria."
			},
			OrderDEnd: {
				required: "La Fecha de Retorno es obligatoria."
			},
			"Docs[]": {
				required: "Cargue el doccumento requerido."
			},
		}
	});
	
	jQuery.validator.messages.required = "";
	$("#checkform").validate({
		invalidHandler: function(e, validator) {
			var errors = validator.numberOfInvalids();
			if (errors) {
				var message = errors == 1
					? 'Error en el campo resaltado'
					: 'Error en los ' + errors + ' campos resaltados';
				$("div.error span").html(message);
				$("div.error").show();
			} else {
				$("div.error").hide();
			}
		},
		success: function(label) {
			// set   as text for IE
			label.html(" ").addClass("checked");
		},
		onkeyup: false,
		submitHandler: function(form) {
			$('input[type=submit]', this).attr('disabled', 'disabled');
			$("div.error").hide();
			ChangeCharts();
			return false;
		},
		rules: {
			DateEnd: {
      		DateGreaterThan: '#DateStart'
    		}
		}
		,
		messages: {
			DateStart: {
      		required: "Ingrese la fecha de inicio.",
			dateISO: "Escriba una fecha correcta (AAAA-MM-DD)."
    		},
			DateEnd: {
      		required: "Ingrese la fecha de fin.",
			dateISO: "Escriba una fecha correcta (AAAA-MM-DD)."
    		}
		}
	});
	
	jQuery.validator.messages.required = "";
	$("#PollVote").validate({
		invalidHandler: function(e, validator) {
			var errors = validator.numberOfInvalids();
			if (errors) {
				var message = errors == 1
					? 'Seleccione una opci\u00f3n para votar'
					: 'Error en los ' + errors + ' campos resaltados';
				$("div.error_polls span").html(message);
				$("div.error_polls").show();
			} else {
				$("div.error_polls").hide();
			}
		},
		onkeyup: false,
		submitHandler: function(form) {
			$('input[type=submit]', this).attr('disabled', 'disabled');
			$("div.error_polls").hide();
			$(form).ajaxSubmit({target:'#pollResults',cache: false});
			return false;
		},rules: {
			Vote: {
				required: true
			}
			}
	});
	
	jQuery.validator.messages.required = "";
	$("#ExpFrm").validate({
		invalidHandler: function(e, validator) {
			var errors = validator.numberOfInvalids();
			if (errors) {
				var message = errors == 1
					? 'Error en el campo resaltado'
					: 'Error en los ' + errors + ' campos resaltados';
				$("div.error span").html(message);
				$("div.error").show();
			} else {
				$("div.error").hide();
			}
		},
		success: function(label) {
			// set   as text for IE
			label.html(" ").addClass("checked");
		},
		onkeyup: false,
		submitHandler: function(form) {
			$('input[type=submit]', this).attr('disabled', 'disabled');
			$("div.error").hide();
			form.submit();
		},rules: {
			Check: {
				required: true
				}				
			},
		messages: {
			Check: {
				required: "Se require un formato de reporte para continuar."
			},
			MaLicensePlateMonth: {
				required: "El Mes de Revisado es requerido."
			},
			BankID: {
				required: "El Acreedor es requerido."
			},
			CStatus: {
				required: "El Status es requerido."
			},
			MaYear: {
				required: "El Año es requerido."
			},
			CDateEmitted: {
      		required: "Ingrese la fecha de inicio.",
			dateISO: "Escriba una fecha correcta (AAAA-MM-DD)."
    		},
			CDateDue: {
      		required: "Ingrese la fecha de fin.",
			dateISO: "Escriba una fecha correcta (AAAA-MM-DD).",
    		}
			
		}
	});
	
	jQuery.validator.messages.required = "";
	$("#emailret").validate({
		invalidHandler: function(e, validator) {
			var errors = validator.numberOfInvalids();
			if (errors) {
				var message = errors == 1
					? 'Error en el campo resaltado'
					: 'Error en los ' + errors + ' campos resaltados';
				$("div.error span").html(message);
				$("div.error").show();
			} else {
				$("div.error").hide();
			}
		},
		success: function(label) {
			// set   as text for IE
			label.html(" ").addClass("checked");
		},
		onkeyup: false,
		submitHandler: function(form) {
			$('input[type=submit]', this).attr('disabled', 'disabled');
			$("div.error").hide();
			form.submit();
		},rules: {
			UserEmail: {
				required: true,
				email: true,
				remote: { url: "./modules/check_email.php"}
			}
			},
		messages: {
			UserEmail: {
				required: "Es necesario ingresar su email",
				email: "Ingrese un correo válido. Por ejemplo: sunombre@dominio.com",
				remote: "Este email no existe en nuestros registros o no ha iniciado sesión nunca, favor verifique o inicie su primera sesión."
			}			
		}
	});
	
	jQuery.validator.messages.required = "";
	$("#postack").validate({
		invalidHandler: function(e, validator) {
			var errors = validator.numberOfInvalids();
			if (errors) {
				var message = errors == 1
					? 'Error en el campo resaltado'
					: 'Error en los ' + errors + ' campos resaltados';
				$("div.error span").html(message);
				$("div.error").show();
			} else {
				$("div.error").hide();
			}
		},
		success: function(label) {
			// set   as text for IE
			label.html(" ").addClass("checked");
		},
		onkeyup: false,
		submitHandler: function(form) {
			$('input[type=submit]', this).attr('disabled', 'disabled');
			$("div.error").hide();
			form.submit();
		},rules: {
			ack: {
				required: true
			}
			},
		messages: {
			ack: {
				required: "Ingrese el código"
			}			
		}
	});
	
	
  $(".resize").vjustify();
  $("div.buttonSubmit").hoverClass("buttonSubmitHover");

  
  $("input.phone").mask("(999) 999-9999");
  $("input.zipcode").mask("99999");
  var creditcard = $("#creditcard").mask("9999 9999 9999 9999");

  $("#cc_type").change(
    function() {
      switch ($(this).val()){
        case 'amex':
          creditcard.unmask().mask("9999 999999 99999");
          break;
        default:
          creditcard.unmask().mask("9999 9999 9999 9999");
          break;
      }
    }
  );

  // toggle optional billing address
  var subTableDiv = $("div.subTableDiv");
  var toggleCheck = $("input.toggleCheck");
  toggleCheck.is(":checked")
  	? subTableDiv.hide()
	: subTableDiv.show();
  $("input.toggleCheck").click(function() {
      if (this.checked == true) {
        subTableDiv.slideUp("medium");
        $("form").valid();
      } else {
        subTableDiv.slideDown("medium");
      }
  });


});

$.fn.vjustify = function() {
    var maxHeight=0;
    $(".resize").css("height","auto");
    this.each(function(){
        if (this.offsetHeight > maxHeight) {
          maxHeight = this.offsetHeight;
        }
    });
    this.each(function(){
        $(this).height(maxHeight);
        if (this.offsetHeight > maxHeight) {
            $(this).height((maxHeight-(this.offsetHeight-maxHeight)));
        }
    });
};

$.fn.hoverClass = function(classname) {
	return this.hover(function() {
		$(this).addClass(classname);
	}, function() {
		$(this).removeClass(classname);
	});
};