

	$save_dir = "../saves/";
	$file = isset( $_GET["file"] ) ? $_GET["file"] : ( isset( $_POST["file"] ) ? $_POST["file"] : null );
	if( empty($file) ) {
		exit("error filename");
	}

	/*function file_force_download($file){
		if ( file_exists($file) ) {
			// сбрасываем буфер вывода PHP, чтобы избежать переполнения памяти выделенной под скрипт
			// если этого не сделать файл будет читаться в память полностью!
			if ( ob_get_level() ) {
				ob_end_clean();
			}
			// заставляем браузер показать окно сохранения файла
			header("Content-Description: File Transfer");
			header("Content-Type: application/octet-stream");
			header("Content-Disposition: attachment; filename=" . basename($file));
			header("Content-Transfer-Encoding: binary");
			header("Expires: 0");
			header("Cache-Control: must-revalidate");
			header("Pragma: public");
			header("Content-Length: " . filesize($file));
			// читаем файл и отправляем его пользователю
			readfile($file);
		}
	}
	
	if( $action == "get" ){
		file_force_download( $file );
		exit;
	}

	if( $action == "save" ){
		echo( file_put_contents( $file , $_POST["json"] ) ? '{"error":0}' : '{"error":1}' );
	}*/