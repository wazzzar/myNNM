<?php
	
	$action = isset( $_GET["action"] ) ? $_GET["action"] : ( isset( $_POST["action"] ) ? $_POST["action"] : null );
	
	if( $action == "load" ){
		header("Content-Type: application/json");
		echo file_get_contents( $_FILES["upload"]["tmp_name"] );
	}

	if( $action == "log" ){
		file_put_contents( "../logs/". $_POST["date"] .".txt", $_POST["text"] ); // date("Y.m.d_H-i-s")
	}
?>