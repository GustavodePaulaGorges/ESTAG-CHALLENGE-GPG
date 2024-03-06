<?php
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, DELETE");
header("Access-Control-Allow-Origin: *");
include("../index.php");

function getCategories(){
    $categories = constant("myPDO")->query('SELECT * FROM categories ORDER BY CODE');
    $categories = $categories->fetchALL();
    return json_encode($categories);
};

function postCategory($name, $tax){
    
    $addCategory = constant("myPDO")->prepare("INSERT INTO categories(NAME, TAX) VALUES ('$name', '$tax')");
    $addCategory->execute();
};

function deleteCategory($code ) {
    $deleteCategory = constant("myPDO")->prepare("DELETE FROM categories WHERE code=$code");
    $deleteCategory->execute();
};

function updateCategories($name, $code, $tax) {
    $deleteProduct = myPDO->prepare("UPDATE categories SET name='$name', tax=$tax WHERE code=$code");
    $deleteProduct->execute();
    
};
?>