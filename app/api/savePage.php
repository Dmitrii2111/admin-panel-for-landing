<?php
$_POST = json_decode(file_get_contents('php://input'), true);

$file = $_POST['pageName'];
$newHtml = $_POST['html'];

if(!file_exists('../backups/backups.json')) {
  $backups = [];
} else {
  $backups = json_decode(file_get_contents('../backups/backups.json'));
}

if($newHtml && $file) {
  $backupFN = uniqid() . "html";
  copy("../../" . $file, '../backups/'. $backupFN);
  array_push($backups, ["page" => $file, "file" => $backupFN, 'dateChanges' => date("H:i:s d.m.y")]);
  file_put_contents('../backups/backups.json', json_encode($backups));
  file_put_contents("../../" . $file, $newHtml);
} else {
  header("HTTP/1.0 400 Bad Request");
}