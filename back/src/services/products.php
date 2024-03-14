<?php
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Origin: *");
include("../index.php");

function getProducts()
{
    $products = constant("myPDO")->query('SELECT * FROM products ORDER BY CODE');
    $products = $products->fetchALL();
    return json_encode($products);
}
;

function postProduct($name, $price, $amnt, $catcode, $image)
{
    $sql = "SELECT tax FROM categories WHERE code = $catcode;";
    $stmt = myPDO->query($sql);
    $taxQuery = $stmt->fetch();
    $tax = $taxQuery["tax"];

    $taxPrice = floatval($price) * (floatval($tax) / 100);
    $taxedPrice = floatval($taxPrice) + floatval($price);

    $addProduct = myPDO->prepare("INSERT INTO products(NAME, PRICE, TAX_PRICE, TAXED_PRICE, AMOUNT, CATEGORY_CODE, IMAGE) VALUES ('$name', $price, $taxPrice, $taxedPrice, $amnt, $catcode, '$image')");
    $addProduct->execute();
}
;

function updateProduct($code, $name, $price, $catcode, $amnt)
{
    $sql = "SELECT tax FROM categories WHERE code = $catcode;";
    $stmt = constant("myPDO")->query($sql);
    $taxQuery = $stmt->fetch();
    $tax = $taxQuery["tax"];

    $taxPrice = floatval($price) * (floatval($tax) / 100);
    $taxedPrice = floatval($taxPrice) + floatval($price);

    $updateProduct = myPDO->prepare("UPDATE products SET name='$name',price=$price,tax_price=$taxPrice ,taxed_price=$taxedPrice,amount=$amnt, category_code=$catcode WHERE code=$code;");
    $updateProduct->execute();
}

function deleteProduct($code)
{
    $deleteCategory = constant("myPDO")->prepare("DELETE FROM products WHERE code=$code");
    $deleteCategory->execute();
}
;
?>