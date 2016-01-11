<%@ Page Language="C#" %>
<!DOCTYPE html>
<script runat="server">
    protected void button_Next(object sender, EventArgs e)
    {
        lbl.Text = "AJAX is the art of exchanging data with a server,"
        + "and updating parts of a web page - without reloading the whole page.";
    }

    protected void button_Back(object sender, EventArgs e)
    {
        lbl.Text = "Examples of applications using AJAX: Google Maps, Gmail, Youtube, and Facebook tabs.";
    }
</script>
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>Ajax Experiment</title>
    <meta charset="utf-8">
    <script src="../../javascript/jquery-1.9.js"></script>
    <script src="../../javascript/jquery-ui.js"></script>
    <link rel="stylesheet" href="../../css/bootstrap.css">
    <link rel="stylesheet" href="../../css/experiment_1_style.css">
    <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.2/themes/smoothness/jquery-ui.css" />
</head>
<body>
    <form id="form1" runat="server">
        <div class="pad">
            <h3 style="font-family: 'Comic Sans MS'"><b>Experiment: AJAX Basics</b></h3>
            <hr />
            <div>
                <div>
                    <p>
                        AJAX:<br>
                        This is an ajax experiment that demonstrates the use of update panel. 
                        When the button is clicked it changes the text in the label without a post back.
                        The asp:UpdatePanel control allows us to wrap markup which we would like to be updated
                        without causing a real postback. 
                        Exchanging data with a server, and updating parts of a web page - without reloading
                         the whole page.
                    </p>
                </div>
                <!-- The label that changes between good and morning are kept inside the update panel-->
                <asp:ScriptManager ID="scriptmanager" runat="server">
                </asp:ScriptManager>
                <asp:UpdatePanel ID="ajaxpnl" runat="server">
                    <ContentTemplate>
                        <div class="well">
                            <asp:Label runat="server" ID="lbl" Text="THIS TEXT WILL CHANGE ON CLICKING THE BUTTON BELOW"></asp:Label><br />
                            <br />
                        </div>
                        <asp:Button runat="server" ID="btn" class="btn btn-primary" Text="Next" OnClick="button_Next" />&nbsp
            <asp:Button runat="server" ID="btn1" class="btn btn-success" Text="Back" OnClick="button_Back" />
                    </ContentTemplate>
                </asp:UpdatePanel>
            </div>
            <hr>
            <div>
                <p>
                    <b>View Source: </b>
                    <a href="../../fileview/default.aspx?~/experiments/Experiment-6/ajax-1.aspx" target="_blank">ASPX Source</a>|
                    <a href="../../fileview/default.aspx?~/css/experiment_1_style.css" target="_blank">CSS Source</a>
                </p>
            </div>
            <div>
                <p>
                    <b>Reference:</b>
                    <a href="http://ajax.net-tutorials.com/basics/hello-world/" target="_blank">AJAX TUTORIALS</a>
                </p>
            </div>
        </div>
    </form>
</body>
</html>
