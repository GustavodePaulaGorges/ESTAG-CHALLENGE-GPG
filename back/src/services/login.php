<?php
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, DELETE");
header("Access-Control-Allow-Origin: *");
include("../index.php");

// function postProfile($code, $email, $f_name, $l_name, $password){
//     $addProfile = myPDO->prepare("INSERT INTO USERS(CODE, EMAIL, FIRST_NAME, LAST_NAME, PASSWORD) VALUES ('$code', '$email', '$f_name', '$l_name', '$password')");
//     $addProfile->execute();
// };

function loginRequest($email, $password) {
    $emailSql = "SELECT * FROM USERS WHERE email = '$email';";
    $emailStmt = myPDO->query($emailSql);
    $profileExists = $emailStmt->fetch();
    $profile = json_encode($profileExists);


    $passwordSql = "SELECT password FROM USERS WHERE password = '$password';";
    $passwordStmt = myPDO->query($passwordSql);
    $passwordCorrect = $passwordStmt->fetch();
    
    if (!$profileExists) {
        echo 'Esse email não está no nosso sistema, gostaria de se cadastrar?';
    } else {
        if(!$passwordCorrect) {
            echo 'Senha Incorreta.';
        } else {
           $token = array("token" => array("email" => $email, "password" => $password), "profile" => $profile);
           return json_encode($token);
        };
    };
};

?>