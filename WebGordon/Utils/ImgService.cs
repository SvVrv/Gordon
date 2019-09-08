using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace WebGordon.Utils
{
    public class FileService
    {
        private readonly IHostingEnvironment _env;
        public FileService(IHostingEnvironment env)
        {
            //_configuration = configuration;
            _env = env;
        }

        public string UploadImage(string base64)
        {
            string UserImagesPath = "\\UserImages";
            string webRootPath = _env.ContentRootPath;
            string fileDestDir = webRootPath + UserImagesPath;
            string name = Guid.NewGuid().ToString();
            if (!Directory.Exists(fileDestDir))
                Directory.CreateDirectory(fileDestDir);
            if (base64.Contains(","))
                base64 = base64.Split(',')[1];
            Bitmap image = ImageWorker.ImgProcessing(base64, 150, 150);
            name = Path.ChangeExtension(name, "jpg");
            string path = Path.Combine(fileDestDir, name);
            image.Save(path, ImageFormat.Jpeg);
            return name;
        }

        public string GetUserImage(string imageName)
        {
            string UserImagesPath = "\\UserImages";
            string webRootPath = _env.ContentRootPath;
            string fileDestDir = webRootPath + UserImagesPath;
            string path = Path.Combine(fileDestDir, imageName);
            using (Image image = Image.FromFile(path))
            {
                using (MemoryStream m = new MemoryStream())
                {
                    image.Save(m, image.RawFormat);
                    byte[] imageBytes = m.ToArray();
                    string base64String = "data:image / jpg; base64, "+Convert.ToBase64String(imageBytes);
                    return base64String;
                }
            }
        }
    }

    public static class ImageWorker
    {
        public static Image FromBase64StringToImage(this string base64String)
        {
            byte[] byteBuffer = Convert.FromBase64String(base64String);
            MemoryStream memoryStream = new MemoryStream(byteBuffer);
            memoryStream.Position = 0;
            Image imgReturn = Image.FromStream(memoryStream);
            memoryStream.Close();
            byteBuffer = null;
            memoryStream = null;
            return imgReturn;
        }

        public static Bitmap ImgProcessing(string base64, int maxWidth, int maxHeight)
        {
            try
            {
                Image originalPic = base64.FromBase64StringToImage();
                int width = originalPic.Width;
                int height = originalPic.Height;
                int widthDiff = width - maxWidth;
                int heightDiff = height - maxHeight;
                bool doWidthResize = (maxWidth > 0 && width > maxWidth && widthDiff > heightDiff);
                bool doHeightResize = (maxHeight > 0 && height > maxHeight && heightDiff > widthDiff);

                if (doWidthResize || doHeightResize || (width.Equals(height) && widthDiff.Equals(heightDiff)))
                {
                    int iStart;
                    Decimal divider;
                    if (doWidthResize)
                    {
                        iStart = width;
                        divider = Math.Abs((Decimal)iStart / maxWidth);
                        width = maxWidth;
                        height = (int)Math.Round((height / divider));
                    }
                    else
                    {
                        iStart = height;
                        divider = Math.Abs((Decimal)iStart / maxHeight);
                        height = maxHeight;
                        width = (int)Math.Round(width / divider);
                    }
                }

                using (Bitmap outBmp = new Bitmap(width, height, PixelFormat.Format24bppRgb))
                {
                    using (Graphics oGraphics = Graphics.FromImage(outBmp))
                    {
                        oGraphics.DrawImage(originalPic, 0, 0, width, height);
                        return new Bitmap(outBmp);
                    }
                }
            }
            catch
            {
                return null;
            }
        }
    }

}
