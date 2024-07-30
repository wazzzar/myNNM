
var netManager = function( id, params ){
	
	if ( !params ) params = {};
	
	this.id = id || 0;
	this.nets = [];
	this.netCount = 0;
	this.freeNetIds = [];
	
	var d = new Date();
	this.initDate = d.getFullYear()+"."+(d.getMonth()+1)+"."+d.getDate()+" "+d.getHours()+"-"+d.getMinutes()+"-"+d.getSeconds();
	
	this.selNet = null;
	this.selNeu = null;
	this.selDen = null;
	this.selSyn = null;
	
}

