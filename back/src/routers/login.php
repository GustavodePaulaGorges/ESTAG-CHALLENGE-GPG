<?php
include('../services/login.php');
function runRequestMethod(){
    $method = $_SERVER['REQUEST_METHOD'];
    switch($_GET["op"]){
        case "POST":
            $email = filter_input(INPUT_POST, "email", FILTER_SANITIZE_SPECIAL_CHARS);
            $password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_SPECIAL_CHARS);;
            echo loginRequest($email, $password);
            break;
        }
}

 
runRequestMethod();