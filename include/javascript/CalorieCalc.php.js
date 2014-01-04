var BMRCalc = {};
BMRCalc.errorMessage = "";
BMRCalc.errorField = "";
BMRCalc.dataCollection = [];

//local Storage Value
// age           - value: numeric
// feet          - value: numeric
// inches        - value: numeric
// cm            - value: numeric
// pound         - value: numeric 
// kg            - value: numeric
// gender        - value: "male", "female"
// heightType    - value: "Standard", "metric"
// weightType    - value: "Standard", "metric"
// activityLevel - value: "sedentary", "lightActivity", "moderateActivity", "veryActive"
// ResultBMR     - value: numeric
// LoseWeightBMR - value: numeric
$(document).ready(function(){

    //initialize JQuery UI component
    $(".radioButton").buttonset();
    $(".btnIncrement").button({icons:{ primary: "ui-icon ui-icon-triangle-1-n" },text: false});
    $(".btnDecrement").button({icons:{ primary: "ui-icon ui-icon-triangle-1-s" },text: false});
    $("#accordion").accordion(); //setup Activity level description in "accordion" style
    
    //binding event to radio button (weight and height)
    $("#divHeight, #divWeight").find("input[type=radio]").click( function(){
        var unitType = $(this).val();
        var $currDiv = $(this).parent().parent();

        if( unitType === "Standard" ){
            $currDiv.find(".standard").show();
            $currDiv.find(".metric").hide();
        }else{
            $currDiv.find(".standard").hide();
            $currDiv.find(".metric").show();
        }
    })
    
    $("#btnCalculate").click(function(){onclick_btnCalculate(); return false;});
    
    $(".btnIncrement").click(onclick_btnIncrement);
    
    $(".btnDecrement").click(onclick_btnDecrement);
    
    //keypress validation 
    $("input[type='text']").keypress( function(event){ return validkeyNumberOnly( event ); } );
	
	//initialize value - localStorage
	initValue();

});

function initValue(){
	
	if( localStorage["age"] != undefined ){
		$("#txtAge").val( localStorage["age"] );
	}
	
	if( localStorage["feet"] != undefined ){
		$("#txtFeet").val( localStorage["feet"] );
	}
	
	if( localStorage["inches"] != undefined ){
		$("#txtInches").val( localStorage["inches"] );
	}
	
	if( localStorage["cm"] != undefined ){
		$("#txtCm").val( localStorage["cm"] );
	}
	
	if( localStorage["pound"] != undefined ){
		$("#txtPound").val( localStorage["pound"] );
	}
	
	if( localStorage["kg"] != undefined ){
		$("#txtKg").val( localStorage["kg"] );
	}
	
	$("[name='gender'][value='female']").click();
	if( localStorage["gender"] == "male" ){
		$("[name='gender'][value='male']").click();
	}
	
    $("[name='heightType'][value='Standard']").click();
	if( localStorage["heightType"] == "Metric" ){
		$("[name='heightType'][value='Metric']").click();
	}
	
    $("[name='weightType'][value='Standard']").click();
	if( localStorage["weightType"] == "Metric" ){
		$("[name='weightType'][value='Metric']").click();
	}
	
	if( localStorage["activityLevel"] != undefined ){
		$("#" + localStorage["activityLevel"] ).click();
	}
	
	if( localStorage["ResultBMR"] != undefined ){
		$(".calcResult").show();
		$(".resultBMR").html( localStorage["ResultBMR"] );
	}else{
		$(".calcResult").hide();
	}
	
	if( localStorage["LoseWeightBMR"] != undefined ){
		$(".loseWeightBMR").html( localStorage["LoseWeightBMR"] );
	}
	
	if( localStorage["ResultBMI"] != undefined ){
		$(".ResultBMI").html( localStorage["ResultBMI"] );
	}
}

function onclick_btnIncrement(){

    var target = $(this).parent().find("input[type='text']");

    if( target.val().length === 0 ){
        target.val( 0 );
        return;
    }
    
    var currVal = target.val();
    target.val( parseInt( currVal ) + 1 ); 
}

function onclick_btnDecrement(){

    var target = $(this).parent().find("input[type='text']");
    
    if( target.val().length === 0 ){
        return;
    }
    
    if( parseInt( target.val() ) === 0 ){
        return;
    }
    
    var currVal = target.val();
    target.val( parseInt( currVal ) - 1 ); 
}

function onclick_btnCalculate(){

	if( ! BMRCalc.isValidInput() ){
		$("#divErrorMessage").html( BMRCalc.errorMessage );
        
        var $divWrapper = $("#divWrapper");

        var left = $divWrapper.offset().left + parseInt($divWrapper.css("width"))/4;
        var top  = $divWrapper.top + parseInt($divWrapper.css("height"))/2;
        console.log(left);
		
        $( "#divErrorMessage" ).dialog(
		   {close: function(event, ui) { BMRCalc.errorField.focus(); }},
		   {modal: true},
           {position: [left, top]}
		);
		
		return false;
	}
	
	//making ajax call
	calculateCalorieInfo();
}

function calculateCalorieInfo(){
    var parm = {};
    parm.RequestType = "BMRCalc";
    
    parm.gender        = $("[name='gender']:checked").val();
	parm.age           = $("#txtAge").val();
	parm.activityLevel = $("[aria-selected='true']").children("a").attr("id");
	
	var height = {};
    
    if( $("#txtFeet").is(":visible") ){
        height.unit = "Standard"; 
        height.feet = $("#txtFeet").val();
        height.inch = $("#txtInches").val();
    }else{
        height.unit = "Metric";
        height.cm   = $("#txtCm").val();
    }
    
    var weight = {};
    
    if( $("#txtPound").is(":visible") ){
        weight.unit = "Standard"; 
        weight.pound = $("#txtPound").val();
    }else{
        weight.unit = "Metric";
        weight.kg   = $("#txtKg").val();
    }
    
    parm.height = JSON.stringify( height );
    parm.weight = JSON.stringify( weight );
    

	
	$.blockUI.defaults.message = "";
	$("#divContainer").parent().block();
	
    ajaxCall( parm , displayData );
}

function updateLocalStorage( jsonReturn ){
	
	//input data 
	localStorage["gender"]        = $("[name='gender']:checked").val();
	localStorage["age"]           = $("#txtAge").val();
	localStorage["activityLevel"] = $("[aria-selected='true']").children("a").attr("id");
	localStorage["feet"]          = $("#txtFeet").val();
	localStorage["inches"]        = $("#txtInches").val();
	localStorage["cm"]            = $("#txtCm").val();
	localStorage["pound"]         = $("#txtPound").val();
	localStorage["kg"]            = $("#txtKg").val();	
	localStorage["heightType"]    = $("[name='heightType']:checked").val();
	localStorage["weightType"]    = $("[name='weightType']:checked").val();
	
	//jsonReturn data
	localStorage["ResultBMR"]     = jsonReturn.data["ResultBMR"];
	localStorage["LoseWeightBMR"] = jsonReturn.data["LoseWeightBMR"];
	localStorage["ResultBMI"]     = jsonReturn.data["ResultBMI"];
}

function displayData( jsonReturn ){
    $(".resultBMR").text( jsonReturn.data["ResultBMR"] );
    $(".loseWeightBMR").text( jsonReturn.data["LoseWeightBMR"] );
	$(".resultBMI").text( jsonReturn.data["ResultBMI"] );
	$(".calcResult").show();
	//storing data in local Storage
	updateLocalStorage( jsonReturn );
}

function ajaxCall(parm , callBack){
    
    $("body").css("cursor", "wait");
    $.ajax({
        url: "httpHandler.php",
        dataType: 'json',
        data: parm,
        type: 'GET',        
        error:
            function() {
                $("body").css("cursor", "");
				$("#divContainer").parent().unblock();
                    $("#divErrorMessage").html( "Oops.. something went south. Please try again" );
                    $( "#divErrorMessage" ).dialog(
                       {modal: true}
                    );
            },
        success:    
            function(jsonReturn) {
                // Error reported by server.
                if (jsonReturn.Error) {
                    $("#divErrorMessage").html( jsonReturn.Error );
                    $( "#divErrorMessage" ).dialog(
                       {modal: true}
                    );
                    
                    return false;
                }

                callBack(jsonReturn);
                
            },
        complete:
            function() {
                $("body").css("cursor", "");
				$("#divContainer").parent().unblock();
				window.location.hash="aResult";
            }


    });
}    

BMRCalc.isValidInput = function (){
    if( $("#txtAge").val().length === 0 ){
        BMRCalc.errorMessage = "Age field cannot be blank";
        BMRCalc.errorField   = $("#txtAge");
        return false;
    }
    
    if( parseInt( $("#txtAge").val() ) === 0 ){
        BMRCalc.errorMessage = "Age field cannot be Zero";
        BMRCalc.errorField   = $("#txtAge");
        return false;
    }
    
    var isElemVisible = $("#txtFeet").is(":visible");
    //--------------------------
    // Check Height(Feet) Field
    //--------------------------
    if( isElemVisible && $("#txtFeet").val().length === 0 ){
        BMRCalc.errorMessage = "Height (feet) field cannot be blank";
        BMRCalc.errorField   = $("#txtFeet");
        return false;
    }
    
    if( isElemVisible && parseInt( $("#txtFeet").val() ) === 0 ){
        BMRCalc.errorMessage = "Height (feet) field cannot be Zero";
        BMRCalc.errorField   = $("#txtFeet");
        return false;
    }
    
    isElemVisible = $("#txtCm").is(":visible");
    
    //------------------------
    // Check Height(cm) Field
    //------------------------
    if( isElemVisible && $("#txtCm").val().length === 0 ){
        BMRCalc.errorMessage = "Height (cm) field cannot be blank";
        BMRCalc.errorField   = $("#txtCm");
        return false;
    }
    
    if( isElemVisible && parseInt( $("#txtCm").val() ) === 0 ){
        BMRCalc.errorMessage = "Height (cm) field cannot be Zero";
        BMRCalc.errorField   = $("#txtCm");
        return false;
    }
    
    isElemVisible = $("#txtPound").is(":visible");
    
    //--------------------------
    // Check Weight(pound) Field
    //--------------------------
    if( isElemVisible && $("#txtPound").val().length === 0 ){
        BMRCalc.errorMessage = "Weight (pound) field cannot be blank";
        BMRCalc.errorField   = $("#txtPound");
        return false;
    }
    
    if( isElemVisible && parseInt( $("#txtPound").val() ) === 0 ){
        BMRCalc.errorMessage = "Weight (pound) field cannot be Zero";
        BMRCalc.errorField   = $("#txtPound");
        return false;
    }
    
    //--------------------------
    // Check Weight(pound) Field
    //--------------------------
    
    isElemVisible = $("#txtKg").is(":visible");
    
    if( isElemVisible && $("#txtKg").val().length === 0 ){
        BMRCalc.errorMessage = "Weight (kg) field cannot be blank";
        BMRCalc.errorField   = $("#txtKg");
        return false;
    }
    
    if( isElemVisible && parseInt( $("#txtKg").val() ) === 0 ){
        BMRCalc.errorMessage = "Weight (kg) field cannot be Zero";
        BMRCalc.errorField   = $("#txtKg");
        return false;
    }
    
    return true;
}

function validkeyNumberOnly(event) {
    
    //If its not 0 to 9
    if (event.keyCode >= 48 && event.keyCode <= 57){
        return true;
    }

    return false;
}

