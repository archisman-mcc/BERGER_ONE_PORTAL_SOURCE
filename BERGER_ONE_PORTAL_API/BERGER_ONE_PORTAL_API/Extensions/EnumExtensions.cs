using System.ComponentModel;
using BERGER_ONE_PORTAL_API.CustomAttribute;

namespace BERGER_ONE_PORTAL_API.Extensions;

public static class EnumExtensions
{
    public static string ToDescriptionString(this Enum val)
    {
        var attributes = (DescriptionAttribute[])val.GetType().GetField(val.ToString())
            .GetCustomAttributes(typeof(DescriptionAttribute), false);

        return attributes.Length > 0 ? attributes[0].Description : string.Empty;
    }

    public static T GetEnumValueFromDescription<T>(this string description) where T : Enum
    {
        foreach (var field in typeof(T).GetFields())
            if (Attribute.GetCustomAttribute(field, typeof(DescriptionAttribute)) is DescriptionAttribute attribute
                && attribute.Description == description)
                return (T)field.GetValue(null);
            else if (field.Name == description)
                return (T)field.GetValue(null);

        return default;
    }

    public static T GetEnum<T>(this string enumValue) where T : Enum
    {
        return (T)Enum.Parse(typeof(T), enumValue, true);
    }

    public static string? ToRelPathDescriptionString(this Enum val, IConfiguration? configuration)
    {
        var appSettingKey = val.GetType().GetField(val.ToString())
            ?.GetCustomAttributes(typeof(RelPathDescriptionAttribute), false)
            .OfType<RelPathDescriptionAttribute>().FirstOrDefault()?.AppSettingKey ?? string.Empty;
        return (appSettingKey ?? "") == "" ? null : configuration.GetValue<string>(appSettingKey);
    }

    public static string? ToAbsPathDescriptionString(this Enum val, IConfiguration? configuration)
    {
        var appSettingKey = val.GetType().GetField(val.ToString())
            ?.GetCustomAttributes(typeof(AbsPathDescriptionAttribute), false)
            .OfType<AbsPathDescriptionAttribute>().FirstOrDefault()?.AppSettingKey ?? string.Empty;
        return (appSettingKey ?? "") == "" ? null : configuration.GetValue<string>(appSettingKey);
    }
}