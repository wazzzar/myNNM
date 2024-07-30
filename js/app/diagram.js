
var goMake = go.GraphObject.make;

var diagram = goMake( go.Diagram, "daigramDiv", {
		"initialContentAlignment": go.Spot.Center,
		"undoManager.isEnabled": !true,
		"layout": goMake(go.LayeredDigraphLayout, { columnSpacing: 10 })
	}
);
var overview = goMake(go.Overview, "overviewContent", { observed: diagram });

diagram.grid = goMake(go.Panel, "Grid",
	{ gridCellSize: new go.Size(10, 10) },
	goMake(go.Shape, "LineH", { stroke: "lightblue" }),
	goMake(go.Shape, "LineV", { stroke: "lightgreen" }),
	goMake(go.Shape, "LineH", { stroke: "blue", interval: 10 }),
	goMake(go.Shape, "LineV", { stroke: "green", interval: 10 })
);

diagram.contextMenu = goMake( go.Adornment, "Vertical",
	goMake("ContextMenuButton",
		goMake(go.TextBlock, "New Neuron"),
		{
			click: function(e, obj){
				
				if( !NM.selNet ){
					
					NM.notification( "warn", "You must select network before creating new neuron." );
					return;
				}
				
				NM.createNeuron();
			}
		}
	)
);

diagram.linkTemplate = goMake(go.Link,
	{
		routing: go.Link.Normal,
		curve: go.Link.JumpOver,
		corner: 10,
		relinkableFrom: true,
		relinkableTo: true,
		contextMenu: goMake( go.Adornment, "Vertical",
			goMake( "ContextMenuButton",
				goMake( go.TextBlock, "Remove"),
				{
					click: function(e, obj) {
						// NM.deleteSynapse(  );
						// NM.ctrl.$apply();
					}
				}
			)
		)
	},
	goMake(go.Shape),
	goMake(go.Shape, { toArrow: "Standard" })
);
	
var portW = 8, portH = 8;
var getInPort = function(name){
	return { width: portW, height: portH, portId: name, toSpot: go.Spot.Left, toLinkable: true, toMaxLinks: Infinity, margin: new go.Margin(0, 3, 0, 0) };
}

var getOutPort = function(name){
	return { width: portW, height: portH, portId: name, fromSpot: go.Spot.Right, fromLinkable: true, fromMaxLinks: Infinity, margin: new go.Margin(0, 0, 0, 3) };
}

function mouseEnter(e, obj) {
    var shape = obj.findObject("SHAPE");
    shape.stroke = "";
};

function mouseLeave(e, obj) {
    var shape = obj.findObject("SHAPE");
    shape.stroke = "#19231a";
};

diagram.nodeTemplate = goMake(go.Node, "Auto",
    {
        selectionAdorned: false,
        doubleClick: function(e, obj, prev){
			var neu = NM.getNeuronById( obj.data.key );
			NM.selectNeu( neu );
		},
		contextMenu: goMake( go.Adornment, "Vertical",
			goMake( "ContextMenuButton",
				goMake( go.TextBlock, "Remove"),
				{
					click: function(e, obj) {
						NM.deleteNeuron( obj.part.adornedPart.data.key );
						NM.ctrl.$apply();
					}
				}
			)
		)
    },
	new go.Binding("location", "pos"),
	goMake(go.Shape, "RoundedRectangle", { fill: "lightgray" },
		new go.Binding("fill", "isSelected", function(sel) {
        	if (sel) return "lightgreen"; else return "lightgray";
        }).ofObject("")
	),
	goMake(go.Panel, "Vertical", { margin: 5, defaultAlignment: go.Spot.Left },
		goMake(go.Panel, "Horizontal",
			goMake(go.TextBlock,
				{ textAlign: "center", margin: 3, editable: true,
					textValidation: function(textblock, oldstr, newstr){
						if( newstr != oldstr ){
							NM.getNeuronById( textblock.part.data.key ).name = newstr;
							NM.ctrl.$apply();
						}
						return true;
					}
				}, new go.Binding("text","name")
			)
		),
		goMake(go.Panel, "Table", { name: "inputs" },
			goMake(go.RowColumnDefinition, { column: 0, alignment: go.Spot.Left}),
			goMake(go.RowColumnDefinition, { column: 1, alignment: go.Spot.Center}),
			goMake(go.RowColumnDefinition, { column: 2, alignment: go.Spot.Right }),
			
			goMake(go.TextBlock, "In's", { column: 0, row: 0, font: "bold 10pt sans-serif" }),
			
			goMake(go.Panel, "Horizontal", { column: 1, row: 0, rowSpan: 3, margin: 10 },
				goMake(go.TextBlock, "∑")
			),
			
			goMake(go.TextBlock, "Out" , { column: 2, row: 0, font: "bold 10pt sans-serif" }),
			goMake(go.Panel, "Vertical", { column: 2, row: 1 },
				goMake(go.Shape, getOutPort("Out") )
			)
		)
	)
);

diagram.model = goMake(go.GraphLinksModel, {
	linkFromPortIdProperty: "fromPort",
	linkToPortIdProperty: "toPort",
	nodeDataArray: [
		/*{ key: 0, name: "neuron_0", pos: { x: -100, y: -100 } },
		{ key: 1, name: "neuron_1" }*/
	],
	linkDataArray: []
});

diagram.toolManager.draggingTool.isGridSnapEnabled = true;
diagram.toolManager.linkingTool.temporaryLink.routing = go.Link.Normal;

diagram.addDiagramListener("linkDrawn", function( lnk ){
	NM.createSynapse( lnk.subject.data );
	NM.ctrl.$apply();
});
diagram.addDiagramListener("linkRelinked", function( lnk ){
	lnk.subject.data;
	
});
diagram.addDiagramListener("SelectionMoved", function( obj ){
	//console.log( obj );
	for( node in obj.subject.hd ){
		var id = obj.subject.hd[node].key.data.key;
		//console.log( id );
	}
});

