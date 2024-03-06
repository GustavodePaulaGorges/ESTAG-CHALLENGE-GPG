<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <form action="../back/routers/categories.php"  method="post">
        <label for="category[name]">Input Name</label>
        <input name="category[name]" type="text" />

        <label for="category[tax]">Input Tax</label>
        <input name="category[tax]" type="number" />

        <input type="submit" name="submit" value="TESTAR">
    </form>
</body>

</html>
