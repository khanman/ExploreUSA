<%@ Page Language="C#"%>
<script runat="server">
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            txtCustomerId.Text = Request.QueryString["Id"];
            t.Src = "~/Project/slider-img/travel/" + txtCustomerId.Text.Trim() + ".jpg";
        }

    }

    protected void btnRedirect_Click(object sender, EventArgs e)
    {
        Response.Redirect("~/Project/stat.aspx?Id=" + txtCustomerId.Text.Trim());
    }
</script>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>Explore USA - States</title>
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
        <link rel="stylesheet" href="css/skel-noscript.css" />
        <link rel="stylesheet" href="css/style.css" />
        <link rel="stylesheet" href="css/style-desktop.css" />
        <link rel="stylesheet" href="css/style-wide.css" />
    </noscript>
    <!--[if lte IE 9]><link rel="stylesheet" href="css/ie9.css" /><![endif]-->
    <!--[if lte IE 8]><script src="js/html5shiv.js"></script><link rel="stylesheet" href="css/ie8.css" /><![endif]-->
    <!--[if lte IE 7]><link rel="stylesheet" href="css/ie7.css" /><![endif]-->
    <style>
        .f {
            font-family: 'Comic Sans MS';
            font-size: 20px;
        }
    </style>
</head>
<body class="left-sidebar">
    <form id="form2" runat="server">
        <!-- Wrapper -->
        <div id="wrapper">

            <!-- Content -->
            <div id="content" class="clearfix" style="height:667px">
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
                                <h1>Discover this land, like never before</h1>
                            </div>
                        </header>
                        <p id="results">
                            <img src="#" id="t" runat="server" style="height: 50%; width: 100%;" />
                            <asp:TextBox ID="txtCustomerId" runat="server" Visible="false"></asp:TextBox>

                            <asp:GridView ID="GridView1" runat="server" AutoGenerateColumns="False" DataKeyNames="abbr" DataSourceID="SqlDataSource1" EmptyDataText="There are no data records to display." CssClass="f">
                                <Columns>
                                    <asp:BoundField DataField="Description" HeaderText="Description" SortExpression="Description" HeaderStyle-CssClass="button button-small" />
                                </Columns>
                            </asp:GridView>
                        </p>
                        <asp:SqlDataSource ID="SqlDataSource1" runat="server" ConnectionString="<%$ ConnectionStrings:khan25ConnectionString1 %>"
                            ProviderName="<%$ ConnectionStrings:khan25ConnectionString1.ProviderName %>"
                            SelectCommand="SELECT [abbr], [Name], [Description] FROM [khan25].[states] where [abbr] = @abbr">
                            <SelectParameters>
                                <asp:QueryStringParameter Name="abbr" DbType="String" Direction="Input" QueryStringField="Id" DefaultValue="" ConvertEmptyStringToNull="True" />
                            </SelectParameters>
                        </asp:SqlDataSource>
                    </article>
                    <!-- Post -->
                </div>
            </div>

            <!-- Sidebar -->
            <div id="sidebar" style="height:667px">

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
                    <p style="font-family:'Comic Sans MS'">
                          <a href="map.aspx">Map</a>&nbsp;|&nbsp;<a href="Population.aspx">Population Density</a>&nbsp;|&nbsp;<a href="blog.aspx">Blog</a></p> 
                    <p>
                        Copyright &copy; Explore USA || Khan
                    </p>
                </div>

            </div>

        </div>

    </form>
</body>
</html>
