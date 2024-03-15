<?php
include('../services/login.php');
function runRequestMethod(){
    $method = $_SERVER['REQUEST_METHOD'];
    switch($_GET["op"]){
        case "POST":
            $order_code = $_POST["order_code"];
            $prod_code = $_POST["prod_code"];
            echo postOrder_Item($order_code, $prod_code, $amount);
            break;
     
}
 
runRequestMethod();