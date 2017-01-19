<?php

$data = scandir(".");

foreach ($data as $key => $res) {
	if(is_file("./".$res) || $res == "." || $res == "..")
		unset($data[$key]);
}

sort($data);
$data = array_reverse($data);
echo json_encode($data);

exit;