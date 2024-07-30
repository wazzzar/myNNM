
netManager.choiseFile = function(){
	document.querySelector("#open_file").click();
};

netManager.loadFromFile = function(){
	
	var scope = this;
	
	var file_input = document.getElementById("open_file");
	Logger.notify( "log", "Trying load selected file: "+ file_input.files[0].name );
	
	var formData = new FormData();
	formData.set("upload", file_input.files[0], file_input.files[0].name);
	
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open( "POST", "/php/actions.php?action=load", true );
	
	xmlhttp.onreadystatechange = function(){
		
		if( xmlhttp.readyState == 4 ){
			
			if( xmlhttp.status == 200 ){
				
				var data = JSON.parse( xmlhttp.responseText );
				Logger.notify( "succ", "Success loading file. Start build network: "+ data.name );
				scope.buildFromData( data );
			}
		}
	};
	
	xmlhttp.send( formData );
};

netManager.buildFromData = function( data ){
	
	var net = this.getNetById( data.id );
	
	if( net && confirm("Network with ID: "+ data.id +" exists.\nOk - to rewrite exists\nCancel - to set new ID" ) ){
		
		net = new neuralNet( data.id, data );
		
	}else{
		
		var id = this.freeNetIds.length ? this.freeNetIds.shift() : ++this.netCount;
		var net = new neuralNet( id, data );
	}
	
	for( var i = 0; i < data.neurons.length; i++ ){
		
		var n = data.neurons[i];
		
		var neu = new Neuron( n.id , n );
		
		net.neurons.push( neu );
		
		var view = this.createNeuronView( neu );
		diagram.model.addNodeData( view );
		
		for( var j = 0; j < n.dendrites.length; j++ ){
			
			var d = n.dendrites[j];
			
			var den = new Dendrite( d.id , d );
			
			neu.dendrites.push( den );
			
			this.createDendriteView( neu, den );
			
			for( var k = 0; k < d.synapses.length; k++ ){
				//var s = d.synapses[k];
				//var syn = new Synapse( s.id , { neuron: scope.getNeuronById(), onNeu: params.to, onDen: parseInt( params.toPort ) } );
			}
		}
	}
	
	this.nets.push( net );
	
	this.netCount = this.nets.length;
	
	this.selNet = net;
	
	this.ctrl.$apply();
	
	diagram.model.linkDataArray = data.connections;
};
	
netManager.s2f = function(){
	
	if( !this.selNet ){
		Logger.notify( "warn", "You must select network before saving to file" );
		return;
	}
	
	//
	this.selNet.connections = diagram.model.linkDataArray;
	// чистим копию объекта сети
	var copy = $.extend( true, {}, scope.selNet );
	delete copy.$$hashKey;
	
	for( var i = 0; i < copy.connections.length; i++ ){
		delete copy.connections[i].__gohashid;
	}
	
	for( var i = 0; i < copy.neurons.length; i++ ){
		
		var neu = copy.neurons[i];
		delete neu.$$hashKey;
		
		for( var j = 0; j < neu.dendrites.length; j++ ){
			
			var den = neu.dendrites[j];
			delete den.$$hashKey;
			
			for( var k = 0; k < den.synapses.length; k++ ){
				
				var syn = den.synapses[k];
				delete syn.$$hashKey;
				
				syn.neuron.synapse = syn.id;
				syn.neuron = syn.neuron.id;
			}
		}
	}
	
	var json = JSON.stringify( copy, null, "\t" );
		
	var link = document.createElement("A");
	link.setAttribute("href", "data:application/octet-stream;base64," + window.btoa( json ));
	link.setAttribute("download", this.selNet.name +".json");
	link.click();
};
