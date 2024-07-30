
var neuralNet = function( id, params ){
	
	var scope = this;
	
	if ( !params ) params = {};
	
	this.id = id;
	this.name = params.name || "Network_"+ this.id;
	
	this.running = false;
	this.timeout = null;
	this.relaxTime = 1000;
	
	// neurons
	this.neurons = [];
	this.neuronGroups = [];
	this.neuronCount = params.neuronCount || 0;
	this.freeNeuronIds = params.freeNeuronIds || [];
	this.connections = params.connections || [];
	
	this.createNeuron = function(){
		
		this.neurons.push( new Neuron() );
		
	};
	
	this.run = function(){
		this.running = true;
		
		for( var i = 0; i < scope.neurons.length; i++ ){
			scope.neurons[i].work();
		}
		
		scope.timeout = window.setTimeout( scope.run, scope.relaxTime );
		
		return this.name +" has been started";
	};
	
	this.stop = function(){
		this.running = false;
		
		window.clearTimeout( scope.timeout );
		
		return this.name +" has been stopped";
	};
}


var Neuron = function( id, params ){
	
	var scope = this;
	
	if ( !params ) params = {};
	
	this.id = id;
	this.name = params.name || "Neuron_"+ this.id;
	this.type = params.type || 0;
	
	this.activation = params.activation || 10.0;
	this.activationF = params.activationF || "// set signal on synapse\n// var scope is the neuron\nscope.synapse.hasSig = true;";
	this.level = 0.0;
	
	this.enabled = params.enabled || false;
	
	this.enable = function(){
		
		if( this.enable ) return this.name +" already enabled";
		
		this.decelI = window.setInterval( scope.decelF, scope.decelR );
		this.enabled = true;
		this.work();
		
		return this.name +" enabled";
	};
	
	this.disable = function(){
		
		if( !this.enable ) return this.name +" already disabled";
		
		window.clearInterval( scope.decelI );
		this.enabled = false;
		
		return this.name +" disabled";
	};
	
	this.decelI = null; // дескриптор интервала
	this.decelL = params.decelL || 0.01; // уровень снижения сигнала
	this.decelR = params.decelR || 50; // частота снижения сигнала
	// обнуление или снижение уровня суммы сигналов
	this.decelF = function(){
		
		if( this.level < 0 ) this.level  = 0.0;
						else this.level -= this.decelL;
		
	};
	
	this.relaxTime = params.relaxTime || 100; // время релаксации
	// функция работы нейрона
	this.work = function(){
		
		console.log( scope.name +" is working now" );
		
		//if( !scope.synapse ) return scope.name +" output is not connected, the work is useless";
		
		// суммируем сигналы на связях дендритов
		for( var i = 0; i < scope.dendrites.length; i++ ){
			
			var den = scope.dendrites[i];
			
			for( var j = 0; j < den.synapses.length; j++ ){
				
				var syn = den.synapses[j];
				
				if( syn.sig ){
					
					scope.level += syn.sig * syn.weight;
				}
			}
		}
		
		if( scope.level >= scope.activation ) eval( scope.activationF );
		
		if( scope.enabled ) window.setTimeout( scope.work , scope.relaxTime );
	};
	
	// dendrits
	this.dendrites = [];
	this.dendriteGroups = [];
	this.dendriteCount = params.dendriteCount || 0;
	this.freeDendriteIds = params.freeDendriteIds || [];
	
	this.createDendrite = function(){
		
		this.dendrites.push( new Dendrite() );
		
	};
	
	// synapse
	this.synapse = null;

	// for diagram
	this.pos = params.pos || { x: 0, y: 0 };
	//this.open = false;
	
}


var Dendrite = function( id, params ){
	
	if ( !params ) params = {};
	
	this.id = id;
	this.name = params.name || "Dendrite_"+ this.id;
	
	// synapses
	this.synapses = [];
	this.synapseGroups = [];
	this.synapseCount = params.synapseCount || 0;
	this.freeSynapseIds = params.freeSynapseIds || [];
	
}


var Synapse = function( id, params ){
	
	this.id     = id;
	this.name   = params.name || "Synapse_"+ id;
	this.hasSig = false;
	this.neuron = params.neuron;
	
	var range = 1 / Math.sqrt( params.neuron.synapses );
	this.weight = params.weight || Math.random() > 0.5 ? -range : range;
	this.onNeu  = params.onNeu;
	this.onDen  = params.onDen;
	
}
