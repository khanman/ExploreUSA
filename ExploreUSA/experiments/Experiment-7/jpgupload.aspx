<%@ Page Language="C#" %>
<!DOCTYPE html>
<script runat="server">
    protected void UploadButton_Click(object sender, EventArgs e)
    {
        if (FileUploadControl.HasFile)
        {
            try
            {
                if (FileUploadControl.PostedFile.ContentType == "image/jpeg")
                {
                    if (FileUploadControl.PostedFile.ContentLength < 1024000)
                    {
                        string filename = System.IO.Path.GetFileName(FileUploadControl.FileName);
                        FileUploadControl.SaveAs(Server.MapPath("~/") + filename);
                        StatusLabel.Text = "Upload status: File uploaded!";
                    }
                    else
                        StatusLabel.Text = "Upload status: The file has to be less than 100 kb!";
                }
                else
                    StatusLabel.Text = "Upload status: Only JPEG files are accepted!";
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
    <form id="form2" runat="server">
        <div class="pad">
            <h3 style="font-family: 'Comic Sans MS'"><b>Experiment: File Upload</b></h3>
            <hr />
            <div>
                <div>
                    <p>
                        File Upload(only JPEG):<br>
                         With ASP.NET, accepting file uploads from users has become extremely easy. With the FileUpload control,
                         it can be done with a small amount of code lines, as you will see in the following example.       
                        <p>
                            Here we use the two properties, ContentLength and ContentType, to do some basic checking of the file which the user is trying to upload. 
                            The status messages should clearly indicate what they are all about, and you can change them to fit your needs.
                            In this example we can upload only JPEG image of size less then 1024MB.
                        </p>
                    </p>
                </div>
                <div class="well">
                    <asp:FileUpload cssClass="btn btn-danger"  ID="FileUploadControl" runat="server" />
                    <br />
                    <asp:Button runat="server" cssClass="btn btn-success" ID ="UploadButton" Text="Upload" OnClick="UploadButton_Click" />
                    <br />
                    <asp:Label runat="server" ID="StatusLabel" Text="Upload status: " />
                </div>
            </div>
            <hr>
            <div>
                <p>
                    <b>View Source: </b>
                    <a href="../../fileview/default.aspx?~/experiments/Experiment-7/jpgupload.aspx" target="_blank">ASPX Source</a>|
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




