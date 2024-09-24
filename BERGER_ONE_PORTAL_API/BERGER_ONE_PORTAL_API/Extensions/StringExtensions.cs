using BERGER_ONE_PORTAL_API.Enums;

namespace BERGER_ONE_PORTAL_API.Extensions;

public static class StringExtensions
{
    public static string? SaveBase64JpegImage(this string? base64Image, DocPathEnum docPathEnum, string directoryPath, IConfiguration configuration)
    {
        if ((base64Image ?? "") == "") return null;
        if (docPathEnum.ToRelPathDescriptionString(configuration) is { } realPath &&
            (base64Image ?? "").Contains(realPath))
            return (base64Image ?? "").Replace(realPath, "").TrimStart('/');

        var fileName = $"{Guid.NewGuid()}.jpeg";
        if (docPathEnum.ToAbsPathDescriptionString(configuration) is not { } absPath)
            throw new Exception("abs path is empty");
        if (!directoryPath.Contains(@":\"))
            directoryPath = $"{absPath}/{directoryPath}";
        if (string.IsNullOrEmpty(base64Image)) return null;
        if (!Directory.Exists(directoryPath)) Directory.CreateDirectory(directoryPath);
        if (base64Image.IndexOf("data:image/jpeg;base64,", StringComparison.Ordinal) < 0) return base64Image;
        base64Image = base64Image
            .Replace("data:image/jpeg;base64,", "")
            .Replace(" ", "+");
        var imageContent = Convert.FromBase64String(base64Image);
        using (var file = new FileStream($"{directoryPath}/{fileName}", FileMode.Create))
        {
            file.WriteAsync(imageContent, 0, imageContent.Length).Wait();
            file.Flush();
        }

        if (!string.IsNullOrEmpty(absPath))
            directoryPath = directoryPath.Replace(absPath, "");

        return $"{directoryPath}/{fileName}"
            .Replace(@"\","/")
            .Replace("//","/")
            .TrimStart('/');
    }
}