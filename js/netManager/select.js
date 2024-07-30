	
netManager.selectNet = function( net ){
	
	if( this.selNet == net ){
		return;
	}
	
	if( this.selNet ){
		this.selNet.connections = diagram.model.linkDataArray;
	}
	
	this.selNet = net;
	this.selNeu = null;
	this.rebuildView();
};

netManager.selectNeu = function( neu ){
	
	if( this.selNeu == neu ){
		return;
	}
	
	this.selNeu = neu;
	
	scope.ctrl.$apply();
};

netManager.selectDen = function( den ){
	
	this.selDen = den;
};

netManager.selectSyn = function( syn ){
	
	this.selSyn = syn;
};
