
var Logger = (function(){
	var rootEl = document.createElement("DIV");
	rootEl.id = "LoggerRootEl";
	document.body.appendChild(rootEl);
	return {
		"rootEl": rootEl,
		"story": true,
		"list": [],
		"Tdescriptor": null,
		"notifyDuration": 3000
	};
})();

Logger.conf = function(params){
		
	if ( !params ) params = {};
	
	//this.rootEl.style. = params.;
	
};

Logger.notify = function( level, text ){
	
	if( this.story ) this.list.push( text );
	
	if( this.Tdescriptor ){
		
		window.clearTimeout( scope.Tdescriptor );
		this.rootEl.style.opacity = 0;
		this.rootEl.style.display = "none";
	}
	
	this.rootEl.className = level;
	this.rootEl.innerHTML = text;
	this.rootEl.style.display = "block";
	this.rootEl.style.opacity = 1;
	
	this.Tdescriptor = window.setTimeout( function(){
		
		this.rootEl.style.opacity = 0;
		this.rootEl.style.display = "none";
		
	}, this.notifyDuration);
	
};

Logger.showHistory = function(){
	
	
	
};

Logger.s2f = function(){
	
	
	
};
