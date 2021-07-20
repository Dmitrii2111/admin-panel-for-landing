<?php
$_POST = json_decode(file_get_contents('php://input'), true);

if($_POST['delName']) {
  $delHtmlFile = $_POST["delName"];
  $newDelHtmlFile = "../../" . $delHtmlFile;
  if (file_exists($newDelHtmlFile)) {
    var_dump($newDelHtmlFile);
    unlink($newDelHtmlFile);
  } else {
    header('HTTP/1.0 404 Not Found');
  }
}