
netManager.createNeuron = function( params ){
	
	var net = this.selNet;
	
	if( !net ){
		Logger.notify( "warn", "You must select network before creating new neuron" );
		return;
	}
	
	var id = net.freeNeuronIds.length ? net.freeNeuronIds.shift() : ++net.neuronCount;
	var neu = new Neuron( id, params );
	
	if( neu ){
		
		Logger.notify( "succ", "Created new "+ neu.name +" for "+ net.name );
		net.neurons.push( neu );
		
		if( diagram ){
			
			var view = this.createNeuronView( neu );
			diagram.model.addNodeData( view );
			
			var part = diagram.findPartForData( view );
			part.location = diagram.toolManager.contextMenuTool.mouseDownPoint;
		}
		
	}else Logger.notify( "err", "Creating new neuron failed" );
	
	return neu || null;
};

netManager.deleteNeuron = function( neu ){
	
	if( typeof neu == "number" ) neu = this.getNeuronById( neu );
	
	if( !neu ){
		Logger.notify( "warn", "You must select neuron before deleting" );
		return;
	}
	
	var net = this.selNet;
	
	if( this.selNeu == neu ) this.selNeu = null;
	
	Logger.notify( "log", "Deleted "+ neu.name +" from "+ net.name );
	
	net.freeNeuronIds.push( neu.id );
	net.freeNeuronIds.sort();
	net.neurons.splice( net.neurons.indexOf( neu ) , 1 );
	
	if( diagram ){
		var node = diagram.findPartForKey( neu.id );
		diagram.remove( node );
	}
};

netManager.createNeuronView = function( neu ){
	
	var x = neu.pos.x, y = neu.pos.y;
	
	return {
		key: neu.id,
		name: neu.name,
		pos: { "x": x, "y": y }
	};
};
