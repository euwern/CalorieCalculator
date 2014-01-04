<!DOCTYPE html>
<html>
    <head>
        <!-- CSS -->
        <link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.21/themes/cupertino/jquery-ui.css" rel="stylesheet" type="text/css"/>
        <link href="include/style/CalorieCalc.less" rel="stylesheet/less" type="text/css" />

        <!-- JavaScript Library -->
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js"></script>
        <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js"></script>
        <script src="include/javascript/less-1.6.0.min.js"></script>
        <script src="include/javascript/jquery.blockUI.min.js"></script>

        <!-- Page JavaScript -->
        <script src="include/javascript/CalorieCalc.php.js"></script>
    </head>
    <body>
        <div id="divWrapper">
        
            <div id="divHeader" class="ui-widget-header ui-corner-top ui-state-active ui-default">
                Calorie Calculator
            </div>
            
            <div id="divBody" class="ui-widget ui-corner-bottom ">
                <div id="divContainer">
                    <div id="divGender">
                        <div class="radioButton">
                            <span class="label">Gender:</span>
                            <input type="radio" id="radio1" name="gender" value="female" checked="checked"/><label for="radio1">Female</label>
                            <input type="radio" id="radio2" name="gender" value="male" /><label for="radio2">Male</label>
                        </div>
                    </div>
                    <br />
                    <div id="divAge">
                        <span class="label">Age:</span>
                        <input type="text" id="txtAge" class="ui-widget ui-state-default " maxlength="3"/> 
						<button class="btnIncrement" ></button>
						<button class="btnDecrement" ></button>
                    </div>
                    <br />
                    <div id="divHeight" >
                        <span class="label">Height:</span>
                        <div>
                            <div class="radioButton">
                                <input type="radio" id="radio3" name="heightType" checked="checked" value="Standard"/><label for="radio3">Standard</label>
                                <input type="radio" id="radio4" name="heightType" value="Metric"/><label for="radio4">Metric</label>  
                            </div>
                            <br/>
                            <div class="standard">
                                <input type="text" id="txtFeet" class="ui-widget ui-state-default " maxlength="1"/>&nbsp;<span class="unit">ft</span>
                                &nbsp;
                                <input type="text" id="txtInches" class="ui-widget ui-state-default " maxlength="2"/>&nbsp;<span class="unit">in</span>
                            </div>    
                            <div class="metric">
                                <input type="text" id="txtCm" class="ui-widget ui-state-default " maxlength="3"/>&nbsp;<span class="unit">cm</span>
                            </div>                 
                        </div>
                    </div>
                    
                    <br style="clear:both"/>
                    <br />

                    <div id="divWeight" >
                        <span class="label">Weight:</span>
                        <div>
                            <div class="radioButton">
                                <input type="radio" id="radio5" name="weightType" checked="checked" value="Standard"/><label for="radio5">Standard</label>
                                <input type="radio" id="radio6" name="weightType" value="Metric"/><label for="radio6">Metric</label>  
                            </div>
                            <br/>
                            <div class="standard">
                                <input type="text" id="txtPound" class="ui-widget ui-state-default " maxlength="3"/>&nbsp;<span class="unit">pound</span>
  
								<button class="btnIncrement"></button>
								<button class="btnDecrement"></button>

							</div>    
                            <div class="metric">
                                <input type="text" id="txtKg" class="ui-widget ui-state-default " maxlength="3"/>&nbsp;<span class="unit">kg</span>
								
								<button class="btnIncrement"></button>
								<button class="btnDecrement"></button>
                            </div>  							
                        </div>
                    </div>
                    
                    <br style="clear:both"/>
                    <br />
                    
                    <div id="divActivityLevel" >
                        <span class="label">Activity Level:</span>
                        <div id="accordion">
                            <h3><a href="#" id="sedentary">Sedentary</a></h3>
                            <div>
                                <ul>
                                    <li><strong>At work</strong> - you work in an office</li>
                                    <li><strong>At home</strong> - you're usually sitting, reading, typing or working at a computer</li>
                                    <li><strong>Exercise</strong> - Little to no exercise</li>
                                 </ul>
                            </div>
                            <h3><a href="#" id="lightActivity">Light Activity</a></h3>
                            <div>
                                <ul>
                                    <li><strong>At work</strong> - you walk a lot</li>
                                    <li><strong>At home</strong> - you keep yourself busy and move a lot</li>
                                    <li><strong>Exercise</strong> - 1 to 3 days per week</li>
                                </ul>
                            </div>
                            <h3><a href="#" id="moderateActivity">Moderate Activity</a></h3>
                            <div>
                                <ul>
                                    <li><strong>At work</strong> - you are very active much of the day</li>
                                    <li><strong>At home</strong> - you rarely sit and do heavy housework or gardening</li>
                                    <li><strong>Exercise</strong> - 3 to 5 days per week</li>
                                </ul>
                            </div>
                            <h3><a href="#" id="veryActive">Very Active</a></h3>
                            <div>
                                <ul>
                                    <li><strong>At work</strong> - you hold a labor-intensive job such as construction worker or bicycle messenger</li>
                                    <li><strong>At home</strong> - you are very active with heavy lifting and other rigorous activities</li>
                                    <li><strong>Exercise</strong> - 6 to 7 days per week</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
				<div>
                    <div id="divCalculate">
    					<input type="image" src="include/image/btnCalculate.png" id="btnCalculate"/>
                    </div>
                    <br />
                    <a name="aResult"></a>
                    <div class="calcResult" class="ui-corner-all" >
                        <span class="title">Your Daily Calorie Needs:</span>
                        <p>
                        <span class="result resultBMR">1552</span><span class="unit">&nbsp;cal/day</span>
                        </p>
                        <p>You should consume <strong><span class="resultBMR">1552</span>&nbsp;calories per day</strong> to maintain your current weight.</p>
                        <p>To lose 1 pound per week, you should consume <strong><span class="loseWeightBMR">1052</span>&nbsp;calories per day.</strong></p>
                    </div>
    				
                    <div class="calcResult" class="ui-corner-all" >
                        <span class="title">Extra Info:</span><br /><br />
    					<span>Based on your <strong>height</strong> and <strong>weight</strong>, your <strong>BMI</strong> is</span>
                        <p>
                        <span class="result">&nbsp;&nbsp;&nbsp;<span class="resultBMI">22.8</span></span>
                        </p>
    					<ul>
    						<li>Underweight = < <strong>18.5</strong></li>
    						<li>Normal weight = <strong>18.5 to 24.9</strong></li>
    						<li>Overweight = <strong>25 to 29.9</strong></li>
    						<li>Obesity = <strong>BMI of 30 or greater</strong></li>
    					</ul>
                    </div>
				</div>
            </div>
        </div>
        <div id="divErrorMessage">     
        </div>
        
        <noscript>
            <b>Too Bad, your browser does not support Javascript =( </b>
        </noscript>
    </body>
</html>