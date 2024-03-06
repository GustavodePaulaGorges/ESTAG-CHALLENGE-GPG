<?php
include('../services/order_items.php');
function runRequestMethod(){
    $method = $_SERVER['REQUEST_METHOD'];
    switch($_GET["op"]){
        case "POST":
            $order_code = $_POST["order_code"];
            $prod_code = $_POST["prod_code"];
            $amount = $_POST["amount"];
            echo postOrder_Item($order_code, $prod_code, $amount);
            break;
        case "GET":
            echo getOrder_Items();
            break;
        }
        
}
 
runRequestMethod();