
var netManagers = [];
var NM = new netManager();
netManagers.push( NM );

var MyNNM = new angular.module("MyNNM",[]);

MyNNM.controller( "netManager", function( $scope ){
	
	$scope.app = {
		name: "MyNNM",
		fullName: "My Neural Network Manager",
		author: {
			name: "Isakov Dmitriy",
			email: "isakov.dmitriy@list.ru"
		},
		version: "1.0"
	};
	
	$scope.NM = NM;
	$scope.NM.ctrl = $scope;
	
	$scope.netsListOpenFlag = !false;
	$scope.neuronPropsOpenFlag = !false;
	
	$scope.enableInput = function(event){
		var obj = event.target;
		if( obj.getAttribute("readonly") ) obj.removeAttribute("readonly");
	};
	$scope.disableInput = function(event){
		event.target.setAttribute("readonly", "readonly");
	};
	
	$scope.holdNotify = function(){
		if( $scope.NM.notifyTimeout ) window.clearTimeout( $scope.NM.notifyTimeout );
	}
	
	$scope.unholdNotify = function(){
		$scope.NM.notifyTimeout = window.setTimeout( function(){
			$("#notification").animate( { "opacity": 0 }, 500, function(){} );
		}, $scope.NM.notifyDuration);
	}
	
	$scope.openCodeEditor = function(){
		$("#codeEditDiv code").text( $scope.NM.selNeu.activationF );
		hljs.highlightBlock( $("#codeEditDiv code").get(0) )
		$("#codeEditDiv").dialog("option", "title", "Edit code of neuron "+ $scope.NM.selNeu.name);
		$("#codeEditDiv").dialog("open");
	}
	
});

$("#overviewDiv").draggable({
	
	containment: "#netsArea",
	handle: "#overviewHeader"
	
}).resizable({
	
	minWidth: 128,
	maxWidth: 512,
	minHeight: 128,
	maxHeight: 512
	
});

$("#codeEditDiv").dialog({
	resizable: true, modal: true, autoOpen: false, width: window.innerWidth/2, height: "auto",
	show: { effect: "explode", duration: 500 }, hide: { effect: "explode", duration: 500 },
	buttons: {
		"Ok": function(){
			$("#codeEditDiv code").find("div").each(function(){
				var txt = $(this).text();
				$(this).before("\n"+txt);
				$(this).remove();
			});
			NM.selNeu.activationF = $("#codeEditDiv code").text();
			NM.ctrl.$apply();
			$(this).dialog("close");
		}
	}
});

$("#codeEditDiv code").on("input", function(){
	$("#codeEditDiv").dialog("option","height","auto");
});

$(window).on("beforeunload", function(event){
	for( var i = 0; i < netManagers.length; i++){
		var nm = netManagers[i];
		if( nm.saveLog ){
			var params = $.params({
				"action": "log",
				"date"  : nm.initDate, // encodeURIComponent(  ),
				"text"  : nm.notifyLog.join("\r\n"), // encodeURIComponent(  )
			});
				
			$.post( "php/actions.php", params, function(data){});
		}
	}
});

