<?php
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, DELETE");
header("Access-Control-Allow-Origin: *");
include("../index.php");

function getOrder_Items(){
    $orders = myPDO->query('SELECT * FROM order_item');
    $orders = $orders->fetchALL();
    return json_encode($orders);
};


function postOrder_Item($order_code, $prod_code, $amount){
    $sql = "SELECT * FROM products WHERE code = $prod_code;";
    $stmt = myPDO->query($sql);
    $prodQuery = $stmt->fetch();

    $unit_tax = $prodQuery["tax_price"];
    $unit_price = $prodQuery["taxed_price"];

    $oldAmnt = $prodQuery["amount"];
    
    $tax = floatval($unit_tax) * floatval($amount);
    $price = floatval($unit_price) * floatval($amount);
    $newAmnt = intval($oldAmnt) - intval($amount);

    $updtAmount = myPDO->prepare("UPDATE products SET amount=$newAmnt WHERE code=$prod_code;");
    $updtAmount->execute();

    $addOrder = myPDO->prepare("INSERT INTO order_item(ORDER_CODE, PRODUCT_CODE, AMOUNT, PRICE, TAX) VALUES ('$order_code', $prod_code, $amount, $price, $tax)");
    $addOrder->execute();
};

function deleteCategory() {
    $deleteCategory = myPDO->prepare("DELETE FROM categories WHERE code=$catcode");
    $deleteCategory->execute();
};
?>
