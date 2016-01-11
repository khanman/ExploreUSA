using System;
using System.Data;
using System.Configuration;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;

using System.Collections;
using System.IO;
using System.Data.SqlClient;

namespace edu.neu.ccis.rasala
{
    /// <summary>
    /// Data access layer object for USStateList
    /// that uses data on the SQL Server database.
    /// </summary>
    public class USStateDAL
    {
        /// <summary>
        /// Connection string to rasala database
        /// </summary>
        protected static readonly string khanCS =
            ConfigurationManager.ConnectionStrings["khanCS"].ConnectionString;

        protected static readonly string selectStart =
            "SELECT Name, Abbr, Population FROM US.Data ORDER BY ";


        protected static string SelectStatement(string constraint)
        {
            if (String.IsNullOrEmpty(constraint))
                constraint = "Population DESC";

            return selectStart + constraint;
        }


        public static USStateList Load()
        {
            return Load("Population DESC");
        }


        public static USStateList Load(string constraint)
        {
            USStateList list = new USStateList();

            // Debug code
            // list.Add(new USStateData
            //    ("CONSTRAINT:" + constraint, "DEBUG", 50000000));

            using (SqlConnection connection = new SqlConnection(khanCS))
            {
                SqlCommand command =
                    new SqlCommand(SelectStatement(constraint), connection);

                connection.Open();

                using (SqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        string name = reader.GetString(0);
                        string abbr = reader.GetString(1);
                        int population = reader.GetInt32(2);

                        list.Add(new USStateData(name, abbr, population));
                    }
                }

                connection.Close();
            }

            return list;
        }

    }
}