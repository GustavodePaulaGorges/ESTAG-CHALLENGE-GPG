<?php
include('../services/orders.php');
function runRequestMethod(){
    $method = $_SERVER['REQUEST_METHOD'];
    switch ($_GET["op"]) {
        case "GET":
            echo getOrders();
            break;
        case "POST":
            $code = $_POST["code"];
            $total = $_POST["total"];
            $tax = $_POST["tax"];
            echo postOrder($code, $total, $tax);
            break;
    }
        
}
 
runRequestMethod();