<?php
include('../services/register.php');
function runRequestMethod(){
    $method = $_SERVER['REQUEST_METHOD'];
    switch($_GET["op"]){
        case "POST":
            $code = $_POST["code"];
            $email = $_POST["email"];
            $f_name = $_POST["f_name"];
            $l_name = $_POST["l_name"];
            $password = $_POST["password"];
            echo postProfile($code, $email, $f_name, $l_name, $password );
            break;
}
 
runRequestMethod();