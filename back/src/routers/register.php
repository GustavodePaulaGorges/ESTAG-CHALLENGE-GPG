<?php
include('../services/register.php');
function runRequestMethod(){
    $method = $_SERVER['REQUEST_METHOD'];
    switch($_GET["op"]){
        case "POST":
            $code = filter_input(INPUT_POST, "code", FILTER_SANITIZE_SPECIAL_CHARS);
            $email = filter_input(INPUT_POST, "email", FILTER_SANITIZE_SPECIAL_CHARS);
            $f_name = filter_input(INPUT_POST, "f_name", FILTER_SANITIZE_SPECIAL_CHARS);
            $l_name = filter_input(INPUT_POST, "l_name", FILTER_SANITIZE_SPECIAL_CHARS);
            $password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_SPECIAL_CHARS);
            echo postProfile($code, $email, $f_name, $l_name, $password );
            break;
        }
}
 
runRequestMethod();