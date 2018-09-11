 $(document).ready(function(){
							
	jQuery.validator.addMethod("username", function( value, element ) {
		var result = this.optional(element) || ( value.length >= 6 && value.length <= 8 ); // && /\d/.test(value) && /[a-z]/i.test(value);
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
	}, "Su usuario debe tener minimo 6 y m\u00e1ximo 8 caracteres .");

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
	}, "Su contrase\u00f1a debe tener por lo menos 8 caracteres.");
	
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
	}, "Su contrase\u00f1a debe tener por lo menos 8 caracteres.");
	
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
	}, "Su contrase\u00f1a debe tener por lo menos 8 caracteres.");
	
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
}, "Usted debe ser mayor de 18 a\u00f1os para participar.");
	
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
	}, "Su contrase\u00f1a debe tener por lo menos 8 caracteres y debe contener por lo menos 1 letra y 1 n\u00famero.");
	
	// a custom method making the default value for companyurl ("http://") invalid, without displaying the "invalid url" message
	jQuery.validator.addMethod("defaultInvalid", function(value, element) {
		return value != element.defaultValue;
	}, "");
	
	jQuery.validator.addMethod("billingRequired", function(value, element) {
		if ($("#bill_to_co").is(":checked"))
			return $(element).parents(".subTable").length;
		return !this.optional(element);
	}, "");
	
	jQuery.validator.messages.required = "";
	$("#mlgform").validate({
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
			// set &nbsp; as text for IE
			label.html("&nbsp;").addClass("checked");
		},
		onkeyup: false,
		submitHandler: function(form) {
			$("div.error").hide();
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
			form.submit();
		},rules: {
			captcha: {
				required: true,
				minlength: 5,
				equalTo: "#captcha2"
			},
			PlayerDOB: {
				CheckDOB: true
			},
			PlayerPwd2: {
				required: true,
				equalTo: "#PlayerPwd"
			},
			PlayerPwd2E: {
				equalTo: "#PlayerPwdE"
			}
			},
		messages: {
			Password: {
				required: "Contrase\u00f1a requerida."
			},
			Username: {
				required: "Usuario requerido.",
			},
			UserLevel: {
				required: "Nivel de Acceso requerido."
			},
			UserStatus: {
				required: "Status requerido."
			},
			Name: {
				required: "Nombre Completo requerido."
			},
			captcha: {
				required: "Ingrese el c\u00f3digo de seguridad",
				minlength: "El código de seguridad tiene mínimo 5 caracteres.",
				equalTo: "El c\u00f3digo de seguridad no coincide"
			},
			PlayerName: {
				required: "Ingrese su nombre completo"
			},
			PlayerDOI: {
				required: "Ingrese su c\u00e9dula o pasaporte"
			},
			PlayerDOB: {
      		required: "Ingrese la fecha nacimiento.",
			dateISO: "Escriba una fecha correcta (AAAA-MM-DD)."
    		},
			PlayerPwd: {
      		required: "Ingrese una contrase\u00f1a."
    		},
			PlayerSex: {
      		required: "Seleccione su sexo."
    		},
			PlayerNick: {
      		required: "Ingrese su nick o apodo.",
			remote: "Este nick ya est\u00e1 en uso."
    		},
			PlayerIcon: {
      		required: "Seleccione su \u00edcono o avatar."
    		},
			PlayerPwd2: {
				required: "Repita la contrase\u00f1a",
				equalTo: "Las contrase\u00f1as no coinciden."
			},
			PlayerPwd2E: {
				equalTo: "Las contrase\u00f1as no coinciden."
			},
			Terms: {
				required: "Debe aceptar los T\u00e9rminos y Condiciones."
			},
			Email: {
				required: "El Email es requerido",
				email: "Favor ingrese un email v\u00e1lido, ejemplo: nombre@dominio.com",
				remote: jQuery.validator.format("{0} ya est\u00e1 en uso, favor seleccione use otra direcci\u00f3n.")	
			},
			PlayerEmail: {
				required: "El Email es requerido",
				email: "Favor ingrese un email v\u00e1lido, ejemplo: nombre@dominio.com"	
			}
		},
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