<?php
include_once('../services/categories.php');
function runRequestMethod(){
    $method = $_SERVER['REQUEST_METHOD'];
    switch ($_GET["op"]) {
        case "GET":
            echo getCategories();
            break;
        case "POST":
            $name = filter_input(INPUT_POST, "name", FILTER_SANITIZE_SPECIAL_CHARS);
            $tax = filter_input(INPUT_POST, "tax", FILTER_SANITIZE_NUMBER_INT);
            echo postCategory($name, $tax);
            break;
        case "PUT":
            $name = filter_input(INPUT_POST, "name", FILTER_SANITIZE_SPECIAL_CHARS);
            $tax = filter_input(INPUT_POST, "tax", FILTER_SANITIZE_NUMBER_INT);
            $code = $_POST["code"];
            echo updateCategories($name, $code, $tax);
            break;
        case "DELETE":
            $code = $_POST["code"];
            echo deleteCategory($code);
            break;
    }
        
}
 
runRequestMethod();