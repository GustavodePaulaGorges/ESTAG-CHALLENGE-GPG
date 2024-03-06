<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <form action="home.php" method="post">
        <label for="category[name]">Input Name</label>
        <input name="category[name]" type="text" />

        <label for="category[tax]">Input Tax</label>
        <input name="category[tax]" type="number" />

        <input type="submit" name="submit" value="TESTAR">
    </form>
</body>

</html>
<?php 

$category = $_POST["category"];
$send = $_POST["submit"];
$catname = $category["name"];
$cattax = $category["tax"];

$statement = $myPDO->prepare("INSERT INTO categories(NAME, TAX) VALUES ('$catname', '$cattax')");


if (!empty($send)) {
    $category = $_POST["category"];

    if (empty($category)) {
        echo ("Empty");
    } else {
        $statement->execute();
        

    }

};


$statement2 = $myPDO->query("SELECT * FROM categories");
$data2 = $statement2->fetchALL();

foreach( $data2 as $row ) {
    echo("{$row["code"]} ) {$row["name"]} {$row["tax"]} <br>");
}

?>

