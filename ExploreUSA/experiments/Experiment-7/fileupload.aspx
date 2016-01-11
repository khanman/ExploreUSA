﻿<%@ Page Language="C#" %>
<!DOCTYPE html>
<script runat="server">
    protected void UploadButton_Click(object sender, EventArgs e)
    {
        if (FileUploadControl.HasFile)
        {
            try
            {
                string filename = System.IO.Path.GetFileName(FileUploadControl.FileName);
                FileUploadControl.SaveAs(Server.MapPath("~/") + filename);
                StatusLabel.Text = "Upload status: File uploaded!";
            }
            catch (Exception ex)
            {
                StatusLabel.Text = "Upload status: The file could not be uploaded. The following error occured: " + ex.Message;
            }
        }
    }
</script>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>File Upload</title>
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
            <h3 style="font-family: 'Comic Sans MS'"><b>Experiment: File Upload</b></h3>
            <hr />
            <div>
                <div>
                    <p>
                        File Upload:<br>
                        With ASP.NET, accepting file uploads from users has become extremely easy. With the FileUpload control,
                         it can be done with a small amount of code lines, as you will see in the following example. However, please notice 
                        that there are security concerns to to consider when accepting files from users! Here is the markup required:
                    </p>
                </div>
                <div class="well">
                    <asp:FileUpload ID="FileUploadControl" cssClass="btn btn-primary" runat="server" />
                      <br />
                    <asp:Button runat="server" ID="Button2" cssClass="btn btn-success" Text="Upload" OnClick="UploadButton_Click" />
                    <br />
                    <asp:Label runat="server" ID="StatusLabel" Text="Upload status: " />
                </div>
            </div>
            <hr>
            <div>
                <p>
                    <b>View Source: </b>
                    <a href="../../fileview/default.aspx?~/experiments/Experiment-7/fileupload.aspx" target="_blank">ASPX Source</a>|
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



