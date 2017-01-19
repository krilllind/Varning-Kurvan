<?php

if(!isset($_GET['uri']))
	exit;

$url = $_GET['uri'];
$data = scandir($url);

for ($i = 0; $i < 2; $i++)
	unset($data[$i]);

sort($data);
echo json_encode($data);

exit;