
	/*goMake( "ContextMenuButton",
		goMake( go.TextBlock, "Undo"),
		{ click: function(e, obj) { e.diagram.commandHandler.undo(); } },
		new go.Binding( "visible", "", function(o) {
			return o.diagram.commandHandler.canUndo();
		}).ofObject()
	),
	goMake( "ContextMenuButton",
		goMake( go.TextBlock, "Redo"),
		{ click: function(e, obj) { e.diagram.commandHandler.redo(); } },
		new go.Binding("visible", "", function(o) {
			return o.diagram.commandHandler.canRedo();
		}).ofObject()
	),*/

/*diagram.toolManager.linkingTool.linkDrawn = function(fromnode, fromport, tonode, toport){
	console.log( fromnode, fromport, tonode, toport );
}
diagram.toolManager.relinkingTool.linkRelinked = function(){
	console.log( arguments );
}*/
/*diagram.toolManager.linkingTool.linkValidation = function(fromnode, fromport, tonode, toport){
	var fromID = fromnode.data.key, toID = tonode.data.key;
	//console.log( , fromport, , toport );
	return true;
}*/

<!-- input title="Select" size="10" ng-model=" den.name " readonly="readonly" class="editable"
		 ng-dblclick=" enableInput($event) "
		ng-blur=" disableInput($event) " -->



		//var file = "file="+ this.selNet.name +".json";
		//var json = "json="+ encodeURIComponent( json );
		/*var jqxhr = $.post( "/php/save_to_file.php", "action=save&"+ file +"&"+ json, function(data){
			
			if( data.error ){
				scope.notification( "err", "File was not saved" );
			}else{
				window.open( "/php/save_to_file.php?action=get&"+ file );
			}
		});*/