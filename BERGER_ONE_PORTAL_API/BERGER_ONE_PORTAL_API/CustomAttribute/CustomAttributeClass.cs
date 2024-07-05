using System.Data;

namespace BERGER_ONE_PORTAL_API.CustomAttribute
{
    public class CustomAttributeClass
    {

    }

    public class CustomSqlParameterDirectionAttribute(ParameterDirection direction) : Attribute
    {
        public virtual ParameterDirection Direction => DirectionValue;
        private ParameterDirection DirectionValue { get; } = direction;
    }

    public class CustomSqlParameterSizeAttribute(int size) : Attribute
    {
        public virtual int Size => SizeValue;
        private int SizeValue { get; } = size;
    }

    public class CustomSqlParameterTypeAttribute(DbType dbType) : Attribute
    {
        public virtual DbType Type => TypeValue;
        private DbType TypeValue { get; } = dbType;
    }

    public class CustomSqlParameterIgnoreAttribute : Attribute
    {
    }

    public sealed class CustomSqlParameterNameAttribute(string parameterName) : Attribute
    {
        public string ParameterName => ParameterNameValue;
        private string ParameterNameValue { get; } = parameterName;
    }
}
