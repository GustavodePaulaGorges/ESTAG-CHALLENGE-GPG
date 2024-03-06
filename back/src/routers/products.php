<?php
include_once('../services/products.php');
function runRequestMethod(){
    switch ($_GET["op"]) {

        case "GET":
            echo getProducts();
            break;
        case "POST":
            // POR ALGUM MOTIVO O AMNT E O CATCODE ESTÃO INVERTIDOS, MESMO TUDO PARECENDO CERTO.
            $name = filter_input(INPUT_POST, "name", FILTER_SANITIZE_SPECIAL_CHARS);
            $price = $_POST["price"];
            $amnt = filter_input(INPUT_POST, "catcode", FILTER_SANITIZE_NUMBER_INT);
            $catcode = filter_input(INPUT_POST, "amnt", FILTER_SANITIZE_NUMBER_INT);
            echo postProduct($name, $price, $catcode, $amnt);
            break;
        case "PUT":
            $code = $_POST["code"];
            $name = filter_input(INPUT_POST, "name", FILTER_SANITIZE_SPECIAL_CHARS);
            $price = $_POST["price"];
            $amnt = filter_input(INPUT_POST, "amnt", FILTER_SANITIZE_NUMBER_INT);
            $catcode = filter_input(INPUT_POST, "catcode", FILTER_SANITIZE_NUMBER_INT);
            echo updateProduct($code, $name, $price, $catcode, $amnt);
            break;
        case "DELETE":
            $code = $_POST["code"];
            echo deleteProduct($code);
            break;
    }
        
}
runRequestMethod();