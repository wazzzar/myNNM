
netManager.createSynapse = function( params ){
	
	var neu = this.getNeuronById( params.from );
	var den = this.getDendriteById( parseInt( params.toPort ), params.to );
	
	if( !den ){
		Logger.notify( "warn", "You must select dendrite before creating new synapse" );
		return;
	}
	
	var id = den.freeSynapseIds.length ? den.freeSynapseIds.shift() : ++den.synapseCount;
	var syn = new Synapse( id, { neuron: neu, onNeu: params.to, onDen: parseInt( params.toPort ) });
	
	if( syn ){
		
		Logger.notify( "succ", "Creating new "+ syn.name +" for "+ den.name +" in "+ neu.name );
		
		den.synapses.push( syn );
		neu.synapse = syn;
		
	}else Logger.notify( "err", "Creating new synapse failed" );
	
	return syn || null;
};

netManager.changeSynapse = function(  ){
	var neu = this.selNeu;
	//Logger.notify( "log", "Changing "+ neu.name +" synapse to "+  +" on "+  +" from "+ neu.synapse.neuron.name );
};

netManager.changeSynapseWeight = function( weight ){
	
	var neu = this.selNeu;
	var den = this.selDen;
	var syn = this.selSyn;
	
	Logger.notify( "log", "Changing weight for "+ syn.name +" on "+ den.name +" in "+ neu.name );
	
	syn.weight = weight;
};

netManager.deleteSynapse = function( syn ){
	
	var neu = this.selNeu;
	var den = this.selDen;
	
	Logger.notify( "log", "Deleted "+ syn.name +" from "+ den.name +" on "+ neu.name );
	
	den.freeSynapseIds.unshift( syn.id );
	den.synapses.splice( den.synapses.indexOf( syn ) , 1 );
};
