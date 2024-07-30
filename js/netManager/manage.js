
netManager.rebuildView = function(){
	
	var scope - this;
	
	diagram.clear();
	var nodeData = [];
	
	for( var n = 0; n < this.selNet.neurons.length; n++ ){
		nodeData.push( scope.createNeuronView( scope.selNet.neurons[n] ) );
	}
	
	diagram.model.nodeDataArray = nodeData;
	diagram.model.linkDataArray = this.selNet.connections;
};

netManager.createNet = function( params ){
	
	var id = this.freeNetIds.length ? this.freeNetIds.shift() : ++this.netCount;
	
	var net = new neuralNet( id, params );
	
	if( net ){
		
		Logger.notify( "succ", "Created new neural network: "+ net.name );
		this.nets.push( net );
		
	}else Logger.notify( "err", "Creating new neural network failed" );
	
	return net || null;
};

netManager.deleteNet = function( net ){
	
	if( !net ){
		Logger.notify( "warn", "You must select network before deleting" );
		return;
	}
	
	if( this.selNet == net ){
		this.selNet = null;
		diagram.clear();
	}
	
	Logger.notify( "log", "Deleted neural network: "+ net.name );
	
	this.freeNetIds.push( net.id );
	this.freeNetIds.sort();
	this.nets.splice( this.nets.indexOf( net ) , 1 );
};

netManager.runNet = function(){
	
	var net = this.selNet;
	
	if( !net ){
		Logger.notify( "warn", "You must select network before run" );
		return;
	}
	
	if( !net.neurons.length ){
		Logger.notify( "err", net.name +" have not neurons" );
		return;
	}
	
	var res = !net.running ? net.run() : net.name +" already running";
	Logger.notify( "log", res );
};

netManager.stopNet = function(){
	
	var net = this.selNet;
	
	if( !net ){
		Logger.notify( "warn", "You must select network before stop" );
		return;
	}
	
	var res = net.running ? net.stop() : net.name +" not started";
	Logger.notify( "log", res );
};
