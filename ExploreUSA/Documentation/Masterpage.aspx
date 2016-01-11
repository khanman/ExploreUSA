<%@ Page Language="C#" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Document-Master Page</title>
    <script src="../../javascript/jquery-1.9.js"></script>
    <script src="../../javascript/jquery-ui.js"></script>
    <link rel="shortcut icon" href="images.ico" type="image/x-icon">
    <link href="http://fonts.googleapis.com/css?family=Source+Sans+Pro:400,400italic,700|Open+Sans+Condensed:300,700" rel="stylesheet" />
    <link type="text/css" rel="stylesheet" href="../css/bootstrap.css" />
     <link type="text/css" rel="stylesheet" href="../css/doc.css" />
    
</head>
<body class="h">
    <form id="form1" runat="server">
        <div class="container">
            <header>
                <div class="head">
                    <h1>Master Page</h1>
                </div>
            </header>
            <p class="result">
                The Project makes use of 2 master pages which are as mentioned below. 
                The main idea that goes behind creating these master pages is that it considerably reduces the amount of effort and time that is required in creating the other pages. When we create a new webpage which is a part of the project we have an option to select the Master Page and if we select that option then all the properties that has been present in the Master page are inherited by the webpage and we only have to place contents that are not present in the new page. This is possible by placing contentholder templates within the master pages and these content templates are then made visible to the subpages which we can fill as per the requirement.
<br>
                <br>
<strong>Project Master</strong><br>
<strong>Project Documentation Master</strong>
                <br>
                <br>
<strong>Project Master Page -</strong>  
                Master pages helps to give a structure to the page and then use it across all the other pages. 
                Hence the main advantage of using Master Pages is that if we need to change the structure and appearance of the page 
                we can just do so in the master page and all other pages will derive the new structure. 
<br>
The Project Master page has been divided into the following sections:<br>
                <br>
<strong>Header Section -</strong> This section contains the name of the Project and a Tag line<br>

<strong>Main Body Section -</strong> This is a blank section which is filled by the pages who are inheriting<br>

<strong>SideBar Section -</strong> This section contains all the links and This section also contains the creator name and copyright information<br>
<br>
<strong>Project Documentation Master Page -</strong>
                We have added a header section into this page. The same page is used for all the document.
            </p>

            <br>
        </div>
    </form>
</body>
</html>
