namespace WebshopProject.Backend.ClassHelpers;

public class UploadHandeling
{
    public string UploadPhoto(IFormFile file)
    {
        List<string> validExtensions = new List<string>() { ".jpg", ".png", ".gif" };
        
       var extension =  Path.GetExtension(file.FileName);

       if (!validExtensions.Contains(extension))
       {
           return $"Extention is not valid ({string.Join(",", validExtensions)})";
           
       }

       long size = file.Length;

       if (size > (5 * 1024 * 1024))
       {
           return "MaximumSize can be 5mb only";
       }

       string fileName = Guid.NewGuid().ToString() + extension;

       var path = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");

      using FileStream stream = new FileStream(Path.Combine(path,fileName), FileMode.Create);
       file.CopyTo(stream);

       return fileName;



    }
}