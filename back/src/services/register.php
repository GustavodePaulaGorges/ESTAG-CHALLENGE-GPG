<?php
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, DELETE");
header("Access-Control-Allow-Origin: *");
include("../index.php");

function postProfile($code, $email, $f_name, $l_name, $password){
    $addProfile = myPDO->prepare("INSERT INTO USERS(CODE, EMAIL, FIRST_NAME, LAST_NAME, PASSWORD) VALUES ('$code', '$email', '$f_name', '$l_name', '$password')");
    $addProfile->execute();
};

?>