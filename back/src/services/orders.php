<?php
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, DELETE");
header("Access-Control-Allow-Origin: *");
include("../index.php");

function getOrders(){
    $orders = myPDO->query('SELECT * FROM orders');
    $orders = $orders->fetchALL();
    return json_encode($orders);
};

function postOrder($code, $total, $tax){
    $addOrder = myPDO->prepare("INSERT INTO orders(CODE, TOTAl, TAX) VALUES ('$code', '$total', '$tax')");
    $addOrder->execute();
};

function deleteCategory() {
    $deleteCategory = myPDO->prepare("DELETE FROM categories WHERE code=$catcode");
    $deleteCategory->execute();
};
?>