using BERGER_ONE_PORTAL_API.Models;
using Newtonsoft.Json;
using System.Data;
using System.Data.SqlTypes;
using System.Net;
using System.Reflection;
using System.Security.Claims;

namespace BERGER_ONE_PORTAL_API.Common
{
    public static class CommonHelper
    {
        public static UserDetailsModel? GetUserDetailsFromClaims(ClaimsPrincipal user)
        {
            var userDetailsList = JsonConvert.DeserializeObject<UserDetailsModel>(user.Claims.FirstOrDefault()?.Value);
            return userDetailsList;
        }

        public static bool StringEquals(this string? obj, string? value, StringComparison comparison)
        {
            return (string.IsNullOrEmpty(obj) && string.IsNullOrEmpty(value))
                   || string.Equals(obj, value, comparison);
        }

        public static List<T> MapResult<T>(DataTable? dt)
        {
            var serializeObject = JsonConvert.SerializeObject(dt);
            return JsonConvert.DeserializeObject<List<T>>(serializeObject) ?? [];
        }

        public struct ViewType
        {
            public const string ListView = "ListView";
            public const string SplitView = "SplitView";
            public const string Kanban = "Kanban";
        }
    }
    public class NumericHttpStatusCodeConverter : JsonConverter<HttpStatusCode>
    {
        public override void WriteJson(JsonWriter writer, HttpStatusCode value, JsonSerializer serializer)
        {
            writer.WriteValue((int)value);
        }

        public override HttpStatusCode ReadJson(JsonReader reader, Type objectType, HttpStatusCode existingValue, bool hasExistingValue, JsonSerializer serializer)
        {
            if (reader.TokenType == JsonToken.Integer)
            {
                return (HttpStatusCode)(int)reader.Value;
            }
            throw new JsonSerializationException("Unexpected token type when parsing HttpStatusCode.");
        }
    }
    public class Utils
    {
        
        public static object IIFStringOrDBNull(string? value)
        {
            return (string.IsNullOrWhiteSpace(value) ? (object)DBNull.Value : value);
        }

        public static object IIFIntegerOrDBNull(int? value)
        {
            return (value == null || value == int.MinValue ? (object)DBNull.Value : value);
        }

        public static object IIFLongOrDBNull(long? value)
        {
            return (value == null || value == long.MinValue ? (object)DBNull.Value : value);
        }

        public static object IIFDecimalOrDBNull(decimal? value)
        {
            return (value == null || value == decimal.MinValue ? (object)DBNull.Value : value);
        }

        public static object IIFDateTimeOrDBNull(SqlDateTime? value)
        {
            return (value == null || value.Value == SqlDateTime.MinValue ? (object)DBNull.Value : value);
        }

        public static object IIFBooleanOrDBNull(bool? value)
        {
            return (value == null ? (object)DBNull.Value : value);
        }

        public static DataTable ToDataTable<T>(List<T> items)
        {
            DataTable dataTable = new DataTable(typeof(T).Name);
            //Get all the properties
            PropertyInfo[] Props = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance);
            foreach (PropertyInfo prop in Props)
            {
                //Setting column names as Property names
                dataTable.Columns.Add(prop.Name);
            }
            foreach (T item in items)
            {
                var values = new object[Props.Length];
                for (int i = 0; i < Props.Length; i++)
                {
                    //inserting property values to datatable rows
                    values[i] = Props[i].GetValue(item, null);
                }
                dataTable.Rows.Add(values);
            }
            //put a breakpoint here and check datatable
            return dataTable;
        }

        public static object IIFListOrDBNull(dynamic? value)
        {
            return (value != null ? JsonConvert.SerializeObject(value) : (object)DBNull.Value);
        }
    }

}
