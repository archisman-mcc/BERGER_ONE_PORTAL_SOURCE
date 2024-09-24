namespace BERGER_ONE_PORTAL_API.CustomAttribute
{
    public class RelPathDescriptionAttribute(string appSettingKey) : Attribute
    {
        public string AppSettingKey => appSettingKey;
    }
}