<%@ Page Language="C#" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Rss Feed</title>
    <meta charset="utf-8">
    <script src="../../javascript/jquery-1.9.js"></script>
    <script src="../../javascript/jquery-ui.js"></script>
    <link rel="stylesheet" href="../../css/bootstrap.css">
    <link rel="stylesheet" href="../../css/experiment_1_style.css">
    <link rel="stylesheet" href="../../Flat-master/css/flat-ui.css">
    <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.2/themes/smoothness/jquery-ui.css" />
</head>
<body>
    <form id="form1" runat="server">
        <div class="pad">
            <h3 style="font-family: 'Comic Sans MS'"><b>Experiment: RSS Feed</b></h3>
            <hr />
            <div>
                <div class="well">
                    <p>
                        Parse RSS Feeds:<br>
                        RSS stands for Really Simple Syndication.
                        It's an XML-based content format for distributing news, headlines, content, etc
                        Using asp.net its easy to pasrse the xml to display using the XmlDataSource and DataFile attribute.
                    </p>
                </div>
                <div class="btn btn-block btn-lg btn-primary">
                    Cricket Magazine 
                    </div>
                <br>
                <asp:XmlDataSource ID="XmlDataSource1" runat="server" DataFile="http://feeds.feedburner.com/travelweekly/EBYh"
                    XPath="rss/channel/item[position()]"></asp:XmlDataSource>
                <div class="todo">
                    <asp:ListView ID="ListView1" runat="server" DataSourceID="XmlDataSource1">
                        <ItemTemplate>
                            <b>
                                <%# XPath("title") %>
                            </b>
                            <br />
                            <%# XPath("description") %>
                            <br />
                            <asp:HyperLink ID="HyperLink1" NavigateUrl='<%# XPath("link") %>' runat="server"
                                Text="Read more..." Target="_blank"></asp:HyperLink>
                            <br />
                            <br />
                        </ItemTemplate>
                    </asp:ListView>
                </div>
            </div>
            <div>
                <p>
                    <b>View Source: </b>
                    <a href="../../fileview/default.aspx?~/experiments/Experiment-8/rssfeed.aspx" target="_blank">ASPX Source</a>|
                    <a href="../../fileview/default.aspx?~/css/experiment_1_style.css" target="_blank">CSS Source</a>
                </p>
            </div>
            <div>
                <p>
                    <b>Reference:</b>
                    <a href="http://www.w3schools.com/rss/rss_channel.asp" target="_blank">w3schools</a>|
                    <a href="http://net4.ccs.neu.edu/home/ketkig/" target="_blank">Ketki</a>
                </p>
            </div>
        </div>
    </form>
</body>
</html>
