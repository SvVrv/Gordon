using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

using System.Web;


namespace WebGordon.Utils
{
    public class ImageService
    {
        private readonly IConfiguration _configuration;
        private readonly IHostingEnvironment _env;
        public ImageService(IHostingEnvironment env, IConfiguration configuration)
        {
            _configuration = configuration;
            _env = env;
        }
        internal static void SaveUserPhoto(string base64, string imageName)
        {

            //throw new NotImplementedException();
            //protected void ExportToImage(object sender, EventArgs e)
            //{
            //    string base64 = Request.Form[hfImageData.UniqueID].Split(',')[1];
                //byte[] bytes = Convert.FromBase64String(base64);
            //using (Image image = Image.FromStream(new MemoryStream(bytes)))
            //{
            //    image.Save("output.jpg", ImageFormat.Jpeg);  // Or Png
            //}
            //File.Copy(bytes.ToString()+".jpg", "\\\\192.168.2.9\\Web");
            //}
        }

        public string UploadImage(string base64)
        {
            string webRootPath = _env.ContentRootPath;
            string fileDestDir = webRootPath + _configuration.GetValue<string>("UserImagesPath");
            string name = Guid.NewGuid().ToString();
            if (!Directory.Exists(fileDestDir))
            {
                Directory.CreateDirectory(fileDestDir);
            }
            if (base64.Contains(","))
            {
                base64 = base64.Split(',')[1];
            }
            Image image = FromBase64StringToImage(base64);
            name = Path.ChangeExtension(name, "jpg");
            string path = Path.Combine(fileDestDir, name);
            image.Save(path, ImageFormat.Jpeg);
            return name;
        }

        public static Image FromBase64StringToImage(string base64String)
        {
            byte[] byteBuffer = Convert.FromBase64String(base64String);
            MemoryStream memoryStream = new MemoryStream(byteBuffer);
            memoryStream.Position = 0;
            Image imgReturn;
            imgReturn = Image.FromStream(memoryStream);
            memoryStream.Close();
            byteBuffer = null;
            memoryStream = null;
            return imgReturn;

        }
        //protected void btnUpload_Click(object sender, EventArgs e)
        //{
        //    //***Convert Image File to Base64 Encoded string***//

        //    //Read the uploaded file using BinaryReader and convert it to Byte Array.
        //    BinaryReader br = new BinaryReader(FileUpload1.PostedFile.InputStream);
        //    byte[] bytes = br.ReadBytes((int)FileUpload1.PostedFile.InputStream.Length);

        //    //Convert the Byte Array to Base64 Encoded string.
        //    string base64String = Convert.ToBase64String(bytes, 0, bytes.Length);

        //    //***Save Base64 Encoded string as Image File***//

        //    //Convert Base64 Encoded string to Byte Array.
        //    byte[] imageBytes = Convert.FromBase64String(base64String);

        //    //Save the Byte Array as Image File.
        //    string filePath = Server.MapPath("~/Files/" + Path.GetFileName(FileUpload1.PostedFile.FileName));
        //    File.WriteAllBytes(filePath, imageBytes);
    }

    //public  Bitmap CreateImage(Bitmap originalPic, int maxWidth, int maxHeight)
    //{
    //    try
    //    {
    //        int width = originalPic.Width;
    //        int height = originalPic.Height;
    //        int widthDiff = width - maxWidth;
    //        int heightDiff = height - maxHeight;
    //        bool doWidthResize = (maxWidth > 0 && width > maxWidth && widthDiff > heightDiff);
    //        bool doHeightResize = (maxHeight > 0 && height > maxHeight && heightDiff > widthDiff);

    //        if (doWidthResize || doHeightResize || (width.Equals(height) && widthDiff.Equals(heightDiff)))
    //        {
    //            int iStart;
    //            Decimal divider;
    //            if (doWidthResize)
    //            {
    //                iStart = width;
    //                divider = Math.Abs((Decimal)iStart / maxWidth);
    //                width = maxWidth;
    //                height = (int)Math.Round((height / divider));
    //            }
    //            else
    //            {
    //                iStart = height;
    //                divider = Math.Abs((Decimal)iStart / maxHeight);
    //                height = maxHeight;
    //                width = (int)Math.Round(width / divider);
    //            }
    //        }
    //        using (Bitmap outBmp = new Bitmap(width, height, PixelFormat.Format24bppRgb))
    //        {
    //            using (Graphics oGraphics = Graphics.FromImage(outBmp))
    //            {
    //                oGraphics.DrawImage(originalPic, 0, 0, width, height);
    //                //Водяний знак
    //                //Font font = new Font("Arial", 20);
    //                //Brush brash = new SolidBrush(Color.Blue);
    //                //oGraphics.DrawString("Hello Vova", font, brash, new Point(25, 25));
    //                return new Bitmap(outBmp);
    //            }
    //        }
    //    }
    //    catch
    //    {
    //        return null;
    //    }
    //}
}
