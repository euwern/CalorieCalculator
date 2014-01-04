<?php

$fb = new FeedBack();

if( !empty( $_GET["RequestType"] )){
    $requestType = $_GET["RequestType"];
    if( $requestType == "BMRCalc" ){
        calculate( $fb );
    }else{
        $fb->Error = "Parm 'RequestType' is invalid.";
    }

}else{
    $fb->Error = "Parm 'RequestType' is not passed";
}

echo json_encode( $fb  );

function calculate( $fb ){

	$gender        = $_GET["gender"];
	$age           = intval( $_GET["age"] );
	$height        = json_decode( $_GET["height"] );
	$weight        = json_decode( $_GET["weight"] );
	$activityLevel = $_GET["activityLevel"];
	
	if( $height->unit == "Standard" ){
		$heightInCM = ( $height->feet * 12 + $height->inch ) * 2.54;
	}else{
		$heightInCM = $height->cm;
	}
	
	if( $weight->unit == "Standard" ){
		$weightInKG = $weight->pound * 0.4536;
	}else{
		$weightInKG = $weight->kg;
	}
	//BMR formula - Mifflin et al. 1990
	$resultBMR = ( $weightInKG * 10 ) + ( $heightInCM * 6.25 ) - ( $age * 5 );
	
	if( $gender == "male" ){
		//male's BMR formula
		$resultBMR += 5;
	}else{
		//female's BMR formula
		$resultBMR -= 161;
	}
	
	//activity level
	switch ( $activityLevel ){
		case "sedentary":
			$resultBMR *= 1.2;
			break;
		case "lightActivity":
			$resultBMR *= 1.375;
			break;
		case "moderateActivity":
			$resultBMR *= 1.55;
			break;
		case "veryActive":
		    $resultBMR *= 1.725;
			break;
	}
	
	//round-up BMR value
	$resultBMR = round($resultBMR);
	
	//calculate BMI
	$resultBMI = $weightInKG / pow( ($heightInCM / 100) , 2 );
	$resultBMI = round( $resultBMI , 1 );
	
	//output
    $fb->data["ResultBMR"] = $resultBMR;
    $fb->data["LoseWeightBMR"] = $resultBMR - 500;
	$fb->data["ResultBMI"] = $resultBMI;
}

class FeedBack{
    public $data = array();   
    public $Error = "";
}


?>