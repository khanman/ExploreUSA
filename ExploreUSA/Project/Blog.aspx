<%@ Page Language="C#" %>
<!DOCTYPE HTML>
<html>
<head id="Head1" runat="server">
    <title>Explore USA-Blog</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <meta name="description" content="" />
    <meta name="keywords" content="" />
    <link rel="shortcut icon" href="flag.ico" type="image/x-icon">
    <link href="http://fonts.googleapis.com/css?family=Source+Sans+Pro:400,400italic,700|Open+Sans+Condensed:300,700" rel="stylesheet" />
    <script src="js/jquery.min.js"></script>
    <script src="js/skel.min.js"></script>
    <script src="js/skel-panels.min.js"></script>
    <script src="js/init.js"></script>

    <noscript>
        <link rel="stylesheet" href="../../css/bootstrap.css">
        <link rel="stylesheet" href="css/skel-noscript.css" />
        <link rel="stylesheet" href="css/style.css" />
        <link rel="stylesheet" href="css/style-desktop.css" />
        <link rel="stylesheet" href="css/style-wide.css" />
    </noscript>
    <style>
        .f {
            font-family: 'Comic Sans MS';
            font-size: 15px;
        }
    </style>
    <!--[if lte IE 9]><link rel="stylesheet" href="css/ie9.css" /><![endif]-->
    <!--[if lte IE 8]><script src="js/html5shiv.js"></script><link rel="stylesheet" href="css/ie8.css" /><![endif]-->
    <!--[if lte IE 7]><link rel="stylesheet" href="css/ie7.css" /><![endif]-->
</head>

<body class="left-sidebar">
    <form id="form1" runat="server">
        <!-- Wrapper -->
        <div id="wrapper">

            <!-- Content -->
            <div id="content" class="clearfix" style="height: 667px">
                <div id="content-inner">

                    <!-- Post -->
                    <article class="is-post is-post-excerpt">
                        <header>
                            <!--
											Note: Titles and bylines will wrap automatically when necessary, so don't worry
											if they get too long. You can also remove the "byline" span entirely if you don't
											need a byline.
										-->
                            <div id="logo-header">
                                <h1>Explore USA Blog
                                </h1>
                            </div>
                        </header>
                        <p id="results">
                            <img src="slider-img/travel/MA.jpg" id="t" runat="server" style="height: 50%; width: 100%;" />
                            <asp:GridView ID="GridView1" runat="server" AutoGenerateColumns="False" DataKeyNames="id" DataSourceID="SqlDataSource1" EmptyDataText="There are no data records to display." CssClass="table-hover table-responsive f" CellSpacing="100" >
                                <Columns>
                                    <asp:BoundField DataField="Name"><ItemStyle Height="50px" Width="170px"></ItemStyle></asp:BoundField>
                                    <asp:BoundField DataField="City"><ItemStyle Height="50px" Width="150px"></ItemStyle></asp:BoundField>
                                    <asp:BoundField DataField="Content" HeaderText="Real Stories from Travelers Discovering the USA" SortExpression="Content" HeaderStyle-CssClass="button button-small"> 
                                    </asp:BoundField>
                                </Columns>
                            </asp:GridView>
                            <asp:SqlDataSource ID="SqlDataSource1" runat="server" ConnectionString="<%$ ConnectionStrings:khan25ConnectionString1 %>" DeleteCommand="DELETE FROM [khan25].[gal] WHERE [id] = @id" InsertCommand="INSERT INTO [khan25].[gal] ([Name], [City], [State], [Content]) VALUES (@Name, @City, @State, @Content)" ProviderName="<%$ ConnectionStrings:khan25ConnectionString1.ProviderName %>" SelectCommand="SELECT [Name], [City], [State], [Content], [id] FROM [khan25].[gal]" UpdateCommand="UPDATE [khan25].[gal] SET [Name] = @Name, [City] = @City, [State] = @State, [Content] = @Content WHERE [id] = @id">
                                <DeleteParameters>
                                    <asp:Parameter Name="id" Type="Int32" />
                                </DeleteParameters>
                                <InsertParameters>
                                    <asp:Parameter Name="Name" Type="String" />
                                    <asp:Parameter Name="City" Type="String" />
                                    <asp:Parameter Name="State" Type="String" />
                                    <asp:Parameter Name="Content" Type="String" />
                                </InsertParameters>
                                <UpdateParameters>
                                    <asp:Parameter Name="Name" Type="String" />
                                    <asp:Parameter Name="City" Type="String" />
                                    <asp:Parameter Name="State" Type="String" />
                                    <asp:Parameter Name="Content" Type="String" />
                                    <asp:Parameter Name="id" Type="Int32" />
                                </UpdateParameters>
                            </asp:SqlDataSource>
                        </p>
                        <br />
                    </article>

                    <!-- Post -->

                </div>
            </div>

            <!-- Sidebar -->
            <div id="sidebar" style="height: 667px">

                <!-- Logo -->
                <div id="logo">
                    <h1><a href="Default.aspx" title="Home">ExploreUSA</a></h1>
                </div>

                <!-- Nav -->
                <nav id="nav">
                    <ul>
                    <li><a href="explore.aspx">Explore</a></li>
                    <li><a href="route.aspx">Road Trips</a></li>
                    <li><a href="restuarants.aspx">Restuarants</a></li>
                    <li><a href="search.aspx">Cities</a></li>
                    <li><a href="news.aspx">News</a></li>
                    <li><a href="signin.aspx">Blog Post</a></li>
                    
                </ul>
                </nav>


                <div id="copyright">
                    <p style="font-family: 'Comic Sans MS'">
                            <a href="map.aspx">Map</a>&nbsp;|&nbsp;<a href="Population.aspx">Population Density</a>&nbsp;|&nbsp;<a href="blog.aspx">Blog</a></p>
                    

                    <p>
                        Copyright &copy; Explore USA || Khan
                    </p>
                </div>

            </div>

        </div>

    </form>
    <script type="text/javascript">
        {
            function DisableBackButton() {
                window.history.forward()
            }
            DisableBackButton();
            window.onload = DisableBackButton;
            window.onpageshow = function (evt) { if (evt.persisted) DisableBackButton() }
            window.onunload = function () { void (0) }
        }

    </script>
</body>
</html>

