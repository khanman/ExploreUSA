using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;

public partial class Project_signin : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected static readonly string khanCS =
            ConfigurationManager.ConnectionStrings["khanCS"].ConnectionString;
    protected void btnSubmit_Click(object sender, EventArgs e)
    {
        SqlConnection connection = new SqlConnection(khanCS);
        //        SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["khanCS"].ConnectionString);
        connection.Open();
        SqlCommand cmd = new SqlCommand("select * from khan25.users where username =@username and password=@password", connection);
        cmd.Parameters.AddWithValue("@username", textUserName.Text);
        cmd.Parameters.AddWithValue("@password", textPWD.Text);
        SqlDataAdapter da = new SqlDataAdapter(cmd);



        DataTable dt = new DataTable();
        da.Fill(dt);
        if (dt.Rows.Count > 0)
        {
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                string role = dr["userrole"].ToString();
                if (role == "1")
                    Response.Redirect("Review.aspx");
                else
                    Response.Redirect("memberdemo.aspx");

            }
        }
        else
        {
            ClientScript.RegisterStartupScript(Page.GetType(), "validation", "<script language='javascript'>alert('Invalid Username and Password')</script>");
        }
    }
}