<?php

if ($_POST["addName"]) {
  $newHtmlFile = $_POST["addName"];
  $newFullNameFile = "../../" . $newHtmlFile . ".html";
  if(file_exists($newFullNameFile)) {
    header("HTTP/1.0 400 Bad Request");
  } else {
    fopen($newFullNameFile, 'w');
    echo "New file " . $newHtmlFile . " created";
  }
}

if($_POST['delName']) {
  $delHtmlFile = $_POST["delName"];
  $newDelHtmlFile = "../../" . $delHtmlFile . ".html";
  if (file_exists($newDelHtmlFile)) {
    unlink($newDelHtmlFile);
  } else {
    header('HTTP/1.0 404 Not Found');
  }
}


