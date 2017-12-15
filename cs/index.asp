<!doctype html>
<%
If Request.QueryString("action") = "getTime" Then
	Response.Write(Time())
	Response.End
End If
%>
<html>
<head>
    <meta charset="utf-8">
    <title>CS Menu</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <meta name="description" content="ContractStandards Links">
    <meta name="author" content="Titiushko">
    <link href="sources/css/bootstrap.css" rel="stylesheet">
    <link href="sources/css/main.css" rel="stylesheet">
    <link rel="shortcut icon" href="sources/img/favicon.ico" type="image/ico">
    <!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
          <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
	<script type="text/javascript">
		window.onload = startInterval;
		function startInterval(){
			setInterval("startTime();", 1000);
		}
		function startTime(){
			AX = new ajaxObject("?action=getTime", showTime)
			AX.update(); // start ajax request
		}
		// callback
		function showTime(data){
			document.querySelector('digitalclock').innerHTML = data;
		}
	</script>
	<script type="text/javascript">
		// ajax object - constructor
		function ajaxObject(url, callbackFunction){
			var that=this;
			this.updating = false;
			this.abort = function(){
				if(that.updating){
					that.updating=false;
					that.AJAX.abort();
					that.AJAX=null;
				}
			};
			this.update = function(passData,postMethod){
				if(that.updating){
					return false;
				}
				that.AJAX = null;
				if(window.XMLHttpRequest){
					that.AJAX=new XMLHttpRequest();
				}
				else{
					that.AJAX=new ActiveXObject("Microsoft.XMLHTTP");
				}
				if(that.AJAX==null){
					return false;
				}
				else{
					that.AJAX.onreadystatechange = function(){
						if(that.AJAX.readyState==4){
							that.updating=false;
							that.callback(that.AJAX.responseText, that.AJAX.status, that.AJAX.responseXML, that.AJAX.getAllResponseHeaders());
							that.AJAX=null;
						}
					};
					that.updating = new Date();
					if(/post/i.test(postMethod)){
						var uri=urlCall+(/\?/i.test(urlCall)?'&':'?')+'timestamp='+that.updating.getTime();
						that.AJAX.open("POST", uri, true);
						that.AJAX.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
						that.AJAX.setRequestHeader("Content-Length", passData.length);
						that.AJAX.send(passData);
					}
					else{
						var uri=urlCall+(/\?/i.test(urlCall)?'&':'?')+passData+'&timestamp='+(that.updating.getTime());
						that.AJAX.open("GET", uri, true);
						that.AJAX.send(null);
					}
					return true;
				}
			};
			var urlCall = url;
			this.callback = callbackFunction || function (){};
		}
	</script>
</head>
<body>
    <div class="container">
        <div class="row">
            <a href="http://54.173.64.156/CSDev">
                <div class="col-sm-3 col-lg-3">
                    <div class="dash-unit text-center">
                        <dtitle>Develop Server</dtitle>
                        <hr><br><br>
                        <span class="logo"><span class="contract">C</span><span class="standards">S</span><sub>Dev</sub></span>
                    </div>
                </div>
            </a>
            <a href="http://54.173.64.156/CSTest">
                <div class="col-sm-3 col-lg-3">
                    <div class="dash-unit text-center">
                        <dtitle>Develop Server</dtitle>
                        <hr><br><br>
                        <span class="logo"><span class="contract">C</span><span class="standards">S</span><sub>Test</sub></span>
                    </div>
                </div>
            </a>
            <a href="http://54.173.64.156/CS-Staging">
                <div class="col-sm-3 col-lg-3">
                    <div class="dash-unit text-center">
                        <dtitle>Develop Server</dtitle>
                        <hr><br><br>
                        <span class="logo"><span class="contract">C</span><span class="standards">S</span><sub>Staging</sub></span>
                    </div>
                </div>
            </a>
            <div class="col-sm-3 col-lg-3">
                <div class="half-unit">
                    <dtitle>Local Time</dtitle>
                    <hr>
                    <div class="clockcenter">
                        <digiclock>12:45:25</digiclock>
                    </div>
                </div>
                <div class="half-unit">
                    <dtitle>Develop Server Time</dtitle>
                    <hr>
                    <div class="clockcenter">
                        <digitalclock>12:45:25</digitalclock>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <a href="http://54.173.64.156/CS">
                <div class="col-sm-3 col-lg-3">
                    <div class="dash-unit text-center">
                        <dtitle>Develop Server</dtitle>
                        <hr><br><br>
                        <span class="logo"><span class="contract">C</span><span class="standards">S</span><sub>Pre-Dev</sub></span>
                    </div>
                </div>
            </a>
            <a href="https://www.contractstandards.com">
                <div class="col-sm-3 col-lg-3">
                    <div class="dash-unit text-center">
                        <dtitle>Production Server</dtitle>
                        <hr><br><br>
                        <span class="logo"><span class="contract">C</span><span class="standards">S</span><sub>Prod</sub></span>
                    </div>
                </div>
            </a>
            <a href="https://github.com/kmstandards/contractstandards">
                <div class="col-sm-3 col-lg-3">
                    <div class="dash-unit">
                        <dtitle>Repositorie</dtitle>
                        <hr>
                        <div class="thumbnail">
                            <img src="sources/img/github.png" class="img">
                        </div>
                        <h1>GitHub</h1>
                        <h3>ContractStandards Project</h3>
                    </div>
                </div>
            </a>
            <a href="https://c-standards.slack.com/messages/C2L7DRFJ9">
                <div class="col-sm-3 col-lg-3">
                    <div class="dash-unit">
                        <dtitle>Comunication</dtitle>
                        <hr>
                        <div class="thumbnail">
                            <img src="sources/img/slack.png" class="img">
                        </div>
                        <h1>Slack</h1>
                        <h3>ContractStandards Chat</h3>
                    </div>
                </div>
            </a>
        </div>
        <div class="row">
            <a href="https://kmstandards.atlassian.net/secure/Dashboard.jspa?selectPageId=10105">
                <div class="col-sm-3 col-lg-3">
                    <div class="dash-unit">
                        <dtitle>Operational Management</dtitle>
                        <hr>
                        <div class="thumbnail">
                            <img src="sources/img/jira.png" class="img">
                        </div>
                        <h1>Jira</h1>
                        <h3>ContractStandards Dashboard</h3>
                    </div>
                </div>
            </a>
            <a href="http://54.173.64.156/KMAuthor">
                <div class="col-sm-3 col-lg-3">
                    <div class="dash-unit text-center">
                        <dtitle>Develop Server</dtitle>
                        <hr><br><br><br><br>
                        <span style="font-size: 40px;">KMAuthor<sub style="font-size:20px;">Dev</sub></span>
                    </div>
                </div>
            </a>
            <a href="https://www.kresolve.com/Account/LogOn">
                <div class="col-sm-3 col-lg-3">
                    <div class="dash-unit text-center">
                        <dtitle>Production Server</dtitle>
                        <hr><br><br><br><br>
                        <span style="font-size: 40px;">KMAuthor<sub style="font-size: 20px;">Prod</sub></span>
                    </div>
                </div>
            </a>
            <a href="http://54.173.64.156/KMAuthor/Resolve/Library">
                <div class="col-sm-3 col-lg-3">
                    <div class="dash-unit text-center">
                        <dtitle>Develop Server</dtitle>
                        <hr><br><br><br><br>
                        <span style="font-size: 40px;">kResolve<sub style="font-size: 20px;">Dev</sub></span>
                    </div>
                </div>
            </a>
        </div>
        <div class="row">
            <a href="https://www.kresolve.com/Resolve/Library">
                <div class="col-sm-3 col-lg-3">
                    <div class="dash-unit text-center">
                        <dtitle>Production Server</dtitle>
                        <hr><br><br><br><br>
                        <span style="font-size: 40px;">kResolve<sub style="font-size: 20px;">Prod</sub></span>
                    </div>
                </div>
            </a>
            <a href="https://test.kreveal.com/Account/LogOn">
                <div class="col-sm-3 col-lg-3">
                    <div class="dash-unit text-center">
                        <dtitle>Develop Server</dtitle>
                        <hr><br><br><br><br>
                        <span style="font-size: 40px;">kReveal<sub style="font-size: 20px;">Dev</sub></span>
                    </div>
                </div>
            </a>
            <a href="https://live.kreveal.com/Account/LogOn">
                <div class="col-sm-3 col-lg-3">
                    <div class="dash-unit text-center">
                        <dtitle>Production Server</dtitle>
                        <hr><br><br><br><br>
                        <span style="font-size: 40px;">kReveal<sub style="font-size: 20px;">Prod</sub></span>
                    </div>
                </div>
            </a>
        </div>
    </div>
    <script type="text/javascript">
			(function(){
				var clock = document.querySelector('digiclock');
				var pad = function(x) {
					return x < 10 ? '0'+x : x;
				};
				var ticktock = function() {
					var d = new Date();
					var h = pad(d.getHours());
					var m = pad(d.getMinutes());
					var s = pad(d.getSeconds());
					var current_time = [h,m,s].join(':');
					clock.innerHTML = current_time;
				};
				ticktock();
				setInterval(ticktock, 1000);
			}());
    </script>
</body>
</html>