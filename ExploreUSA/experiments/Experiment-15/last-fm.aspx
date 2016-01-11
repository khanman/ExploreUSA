<%@ Page Language="C#"%>
<%@ Import Namespace="System.Data.SqlClient" %>
<%@ Import Namespace="System.Data" %>
<%@ Import Namespace="System.Data.Common" %>
<%@ Import Namespace="System" %>
<%@ Import Namespace="System.Collections.Generic" %>
<%@ Import Namespace="System.Linq" %>
<%@ Import Namespace="System.Web" %>
<%@ Import Namespace="System.Web.UI" %>
<%@ Import Namespace="System.Web.UI.WebControls" %>
<%@ Import Namespace="System.Net" %>
<%@ Import Namespace="System.Text" %>
<%@ Import Namespace="System.Xml" %>
<%@ Import Namespace="System.IO" %>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <script src="../../javascript/jquery-1.9.js"></script>
    <script src="../../javascript/jquery-ui.js"></script>
    <link rel="stylesheet" href="../../css/bootstrap.css">
    <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.2/themes/smoothness/jquery-ui.css" />
    <link rel="stylesheet" href="../../css/experiment_1_style.css">
    <script runat="server">
        protected void album_search(object sender, EventArgs e)
        {
            string searchterm = TextBox1.Text;

            string url1 = "http://ws.audioscrobbler.com/2.0/?method=album.search&limit=15&album=" + searchterm + "&api_key=194020afb8bad5b345f0a0c545164b27";
            WebRequest request1 = (WebRequest)WebRequest.Create(url1);
            WebResponse response1 = request1.GetResponse();
            Stream stream1 = response1.GetResponseStream();
            XmlTextReader readxml1 = new XmlTextReader(stream1);
            StringBuilder str = new StringBuilder();
            int NodeDepth = 0;
            string albumname = string.Empty;
            string link = string.Empty;
            string imageurl = "";
            string artist = string.Empty;
            while (readxml1.Read())
            {
                if (readxml1.Name == "album")
                {
                    NodeDepth = readxml1.Depth;
                    readxml1.Read();
                    while (readxml1.Depth != NodeDepth)
                    {

                        if (readxml1.Name == "image")
                        {
                            if (readxml1.GetAttribute("size") == "medium")
                            {
                                imageurl = readxml1.ReadString();
                            }
                        }

                        else if (readxml1.Name == "name")
                        {
                            albumname = readxml1.ReadString();

                        }
                        else if (readxml1.Name == "artist")
                        {
                            artist = readxml1.ReadString();
                        }
                        else if (readxml1.Name == "url")
                        {
                            imageurl = readxml1.ReadString();

                        }
                        readxml1.Read();
                    }
                    str.Append("\n<table style=");
                    str.Append("border:solid;width:550px;border-width:2px>\n");
                    str.Append("<col width=50>");
                    str.Append("<col width=400>");
                    str.Append("<col width=100>");
                    str.Append("<tr>\n");
                    str.Append("<td>");
                    str.Append("<img ");
                    str.Append("src=");
                    if (imageurl == "")
                    {
                        str.Append("images/imagenotfound.png");
                    }
                    else
                        str.Append(imageurl);
                    str.Append(" />");
                    str.Append("</td>\n");
                    str.Append("<td >\n");

                    str.Append(albumname);

                    str.Append("</td>");
                    str.Append("<td>\n");
                    str.Append(artist);
                    str.Append("</td>\n");

                    str.Append("</tr>\n");
                    str.Append("</table>\n");
                }


            }
            Label1.Text = str.ToString();

        }


        protected void Button1_Click(object sender, EventArgs e)
        {
            string s = Request.Form["demo"];
            Response.Write(s);
        }           
    </script>
    <title>Last.FM API</title>
</head>
<body>
    <form id="form1" runat="server">
    <div class="pad">
        <h3 style="font-family: 'Comic Sans MS'"><b>Experiment: Web Services</b></h3>
        <hr />
        <div>
            <p>
                Web Servcies:Last.FM-Api:<br>
                <br>
                In this experiment, I have made use of Last.FM API which makes GET requests to the server. 
                By making parametric changes changes in the URL,the request is sent.As per choice, the response 
                is given in XML format or JSON format. I have used a C# code that uses class 
                <b>XmlTextReader</b> to read the XML contents and use the node names. These parameters are appended in a HTML code. 
                As the user enters an artist names or album name, the API returns with the best matching results
            </p>
        </div>
        <br>
        <div>   
            <asp:TextBox ID="TextBox1" runat="server" placeholder="Hardwell"></asp:TextBox>
            <asp:Button ID="Button1" runat="server" OnClick="album_search" Text="Search Albums" /> 
            <asp:Label ID="Label1" runat="server" Text="Enter Album Name"></asp:Label>
        </div>
        <div>
            <p>
                <b>View Source: </b>
                    <a href="../../fileview/default.aspx?~/experiments/Experiment-15/last-fm.aspx" target="_blank">ASPX Source</a>|
                    <a href="../../fileview/default.aspx?~/css/experiment_1_style.css" target="_blank">CSS Source</a>
            </p>
        </div>
    </div>
        </form>
</body>
</html>
