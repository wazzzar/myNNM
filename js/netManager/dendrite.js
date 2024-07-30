
netManager.createDendrite = function( params ){
	
	var net = this.selNet;
	var neu = this.selNeu;
	
	if( !neu ){
		Logger.notify( "warn", "You must select neuron before creating new dendrite" );
		return;
	}
	
	var id = neu.freeDendriteIds.length ? neu.freeDendriteIds.shift() : ++neu.dendriteCount;
	var den = new Dendrite( id, params );
	
	if( den ){
		
		Logger.notify( "succ", "Creating new "+ den.name +" for "+ neu.name +" in "+ net.name );
		neu.dendrites.push( den );

		if( diagram ) this.createDendriteView( neu, den );
		
	}else Logger.notify( "err", "Creating new dendrite failed" );
	
	return den || null;
};

netManager.deleteDendrite = function( den ){
	
	if( !den ){
		Logger.notify( "warn", "You must select dendrite before deleting" );
		return;
	}
	
	if( this.selDen == den ) this.selDen = null;
	
	var net = this.selNet;
	var neu = this.selNeu;
	
	Logger.notify( "log", "Deleted "+ den.name +" from "+ neu.name +" in "+ net.name );
	
	neu.freeDendriteIds.push( den.id );
	neu.freeDendriteIds.sort();
	neu.dendrites.splice( neu.dendrites.indexOf( den ) , 1 );
	
	if( diagram ){
		var node = diagram.findPartForKey( neu.id );
		var ins  = node.findObject("inputs");
		ins.remove( ins.findObject( "Dendrite_"+ den.id ) );
	}
};

netManager.createDendriteView = function( neu, den ){
	
	var node = diagram.findPartForKey( neu.id );
	var ins  = node.findObject("inputs");
	var scope = this;
	
	var part = goMake( go.Panel, "Horizontal", { column: 0, row: den.id + 1, name: den.name },
		goMake( go.Shape, getInPort( den.id.toString() ) ),
		goMake( go.TextBlock, den.name, {
			editable: true,
			textValidation: function( textblock, oldstr, newstr ){
				if( newstr != oldstr ){
					den.name = newstr;
					scope.ctrl.$apply();
				}
				return true;
			}
		})
	);
	
	ins.add( part );
	
	return part;
};
