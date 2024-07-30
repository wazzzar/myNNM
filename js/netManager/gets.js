
netManager.getNetById = function( netId ){
	
	for( var i = 0; i < this.nets.length; i++ ){
		if( this.nets[i].id == netId ) return this.nets[i];
	}
	
	Logger.notify( "err", "Net-"+ netId +" does not exist" );
};

netManager.getNeuronById = function( neuId, netId ){
	
	var net = netId !== undefined ? this.getNetById( netId ) : this.selNet;
	
	for( var i = 0; i < net.neurons.length; i++ ){
		if( net.neurons[i].id == neuId ) return net.neurons[i];
	}
	
	Logger.notify( "err", "Neuron-"+ neuId +" does not exist" );
};

netManager.getDendriteById = function( denId, neuId, netId ){
	
	var neu = neuId !== undefined ? this.getNeuronById( neuId, netId ) : this.selNeu;
	
	for( var i = 0; i < neu.dendrites.length; i++ ){
		if( neu.dendrites[i].id == denId ) return neu.dendrites[i];
	}
	
	Logger.notify( "err", "Dendrite-"+ denId +" does not exist" );
};

netManager.getSynapseById = function( synId, denId, neuId, netId ){
	
	var den = denId !== undefined ? this.getDendriteById( denId, neuId, netId ) : this.selDen;
	
	for( var i = 0; i < den.synapses.length; i++ ){
		if( den.synapses[i].id == synId ) return den.synapses[i];
	}
	
	Logger.notify( "err", "Synapse-"+ synId +" does not exist" );
};
