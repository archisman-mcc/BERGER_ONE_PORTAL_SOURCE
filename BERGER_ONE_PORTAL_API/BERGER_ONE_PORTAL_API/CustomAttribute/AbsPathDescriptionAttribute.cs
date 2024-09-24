namespace BERGER_ONE_PORTAL_API.CustomAttribute
{
    public class AbsPathDescriptionAttribute(string appSettingKey) : Attribute
    {
        public string AppSettingKey => appSettingKey;
    }
}