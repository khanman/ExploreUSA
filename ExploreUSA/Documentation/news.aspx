<%@ Page Language="C#" %>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Document-News</title>
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
                    <h1>News</h1>
                </div>
            </header>
            <p class="result">
                This page can allow user to enter any keyword related to news topics(Ex: Sports) and click news.<br>
                I tried to retrieve the information by setting searching parameters. The data type of is jsonp.
                Here by entering any keyword the recent news can be searched.
                <br>
                <strong>Snapshot of the Explore page is as follows:</strong>
                <p>
                    <img src="Images/news.jpg" style="width:100%; height:300px;">
                    </p>
            </p>
            <br>
        </div>
    </form>
</body>
</html>
