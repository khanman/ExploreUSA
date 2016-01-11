<%@ Page Language="C#"  %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Document-Restuarants</title>
    <script src="../../javascript/jquery-1.9.js"></script>
    <script src="../../javascript/jquery-ui.js"></script>
    <link rel="shortcut icon" href="images.ico" type="image/x-icon">
    <link href="http://fonts.googleapis.com/css?family=Source+Sans+Pro:400,400italic,700|Open+Sans+Condensed:300,700" rel="stylesheet" />
    <link type="text/css" rel="stylesheet" href="../css/bootstrap.css" />
    <link type="text/css" rel="stylesheet" href="../css/doc.css" />
    <style>
       
    </style>
</head>
<body class="h">
    <form id="form1" runat="server">
        <div class="container">
            <header>
                <div class="head">
                    <h1>restaurants</h1>
                </div>
            </header>
            <p class="result">
                This page can allow the users to enter city name and view details about the restaurants.<br>
                Details - I tried to retrieve the information about different restaurants in any place from <strong>Yelp API</strong>.
                The data type of Yelp API is <strong>jsonp</strong>. 
                To display multiple results, I simply went on appending the new restaurant to the list of restaurants found out so far.
                The authorization of my keys is done using oAuth, which is an open standard for authorizatoin. <br>
                <br>
                <strong>Snapshot of the Explore page is as follows:</strong><br>
                <p>
                    <img src="Images/rest.jpg" style="width:80%; height:300px;">
                    </p>
            </p>
            <br>
        </div>
    </form>
</body>
</html>
