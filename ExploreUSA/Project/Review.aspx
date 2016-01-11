<%@ Page Language="C#" %>
<script runat="server">
    protected void Button1_Click(object sender, EventArgs e)
    {

        if (t2.Text != "")
        {
            SqlDataSource1.Insert();
            t2.Text = "";
            t3.Text = "";
            t4.Text = "";
            t5.Text = "";
        }
        Response.Redirect("Blog.aspx");
    }
</script>
<!DOCTYPE HTML>
<html>
<head id="Head1" runat="server">
    <title>Explore USA - Blog</title>
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
                                <h1>Discover this land, like never before</h1>
                            </div>
                        </header>

                        <table class="table-bordered table-hover table-responsive">
                            <tr>
                                <td>Name
                                </td>
                                <td>
                                    <asp:TextBox ID="t2" runat="server"></asp:TextBox>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>State
                                </td>
                                <td>
                                    <asp:TextBox ID="t3" runat="server"></asp:TextBox>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>City
                                </td>
                                <td>
                                    <asp:TextBox ID="t4" runat="server"></asp:TextBox>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td style="align-content: center">Review
                                </td>
                                <td>
                                    <asp:TextBox ID="t5" runat="server" Rows="5" TextMode="MultiLine"></asp:TextBox>
                                </td>
                                <td></td>
                            </tr>
                        </table>
                        <asp:Button ID="Button1" runat="server" Text="Submit" OnClick="Button1_Click" />

                        <asp:SqlDataSource ID="SqlDataSource1" runat="server" ConnectionString="<%$ ConnectionStrings:khan25ConnectionString1 %>" DeleteCommand="DELETE FROM [khan25].[gal] WHERE [id] = @id" InsertCommand="INSERT INTO [khan25].[gal] ([Name], [City], [State], [Content]) VALUES (@Name, @City, @State, @Content)" ProviderName="<%$ ConnectionStrings:khan25ConnectionString1.ProviderName %>" SelectCommand="SELECT [Name], [City], [State], [Content], [id] FROM [khan25].[gal]" UpdateCommand="UPDATE [khan25].[gal] SET [Name] = @Name, [City] = @City, [State] = @State, [Content] = @Content WHERE [id] = @id">
                            <DeleteParameters>
                                <asp:Parameter Name="id" Type="Int32" />
                            </DeleteParameters>
                            <InsertParameters>
                                <asp:FormParameter Name="Name" Type="String" FormField="t2" />
                                <asp:FormParameter Name="City" Type="String" FormField="t4" />
                                <asp:FormParameter Name="State" Type="String" FormField="t3" />
                                <asp:FormParameter Name="Content" Type="String" FormField="t5" />
                            </InsertParameters>
                            <UpdateParameters>
                                <asp:Parameter Name="Name" Type="String" />
                                <asp:Parameter Name="City" Type="String" />
                                <asp:Parameter Name="State" Type="String" />
                                <asp:Parameter Name="Content" Type="String" />
                                <asp:Parameter Name="id" Type="Int32" />
                            </UpdateParameters>
                        </asp:SqlDataSource>
                    </article>

                    <!-- Post -->
                </div>
            </div>

            <!-- Sidebar -->
            <div id="sidebar" style="height: 667px">

                <!-- Logo -->
                <div id="logo">
                    <h1>Explore USA</h1>
                </div>

                <!-- Nav -->
                <nav id="nav">
                    <ul>
                        <li><a href="signin.aspx">Logout</a></li>
                    </ul>
                </nav>

                <div id="copyright">
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

