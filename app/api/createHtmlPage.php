<?php
$_POST = json_decode(file_get_contents('php://input'), true);

if ($_POST["addName"]) {
  $newHtmlFile = $_POST["addName"];
  $newFullNameFile = "../../" . $newHtmlFile . ".html";
  if(file_exists($newFullNameFile)) {
    header("HTTP/1.0 400 Bad Request");
  } else {
    fopen($newFullNameFile, 'w');
    echo "New file " . $newHtmlFile . " created";
  }
} else {
  echo "not working";
}




