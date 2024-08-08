using BERGER_ONE_PORTAL_API.Models;
using Newtonsoft.Json;
using System.Data;
using System.Data.SqlTypes;
using System.Net;
using System.Reflection;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

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

    public static class Encrypt
    {
        // This size of the IV (in bytes) must = (keysize / 8).  Default keysize is 256, so the IV must be
        // 32 bytes long.  Using a 16 character string here gives us 32 bytes when converted to a byte array.
        private const string initVector = "cR7aEHed187E9GlW";
        private const string passPhrase = "5AMWpwsM8hWlWyO5";
        // This constant is used to determine the keysize of the encryption algorithm
        private const int keysize = 256;
        //Encrypt
        public static string EncryptString(string plainText)
        {
            byte[] initVectorBytes = Encoding.UTF8.GetBytes(initVector);
            byte[] plainTextBytes = Encoding.UTF8.GetBytes(plainText);
            PasswordDeriveBytes password = new PasswordDeriveBytes(passPhrase, null);
            byte[] keyBytes = password.GetBytes(keysize / 8);
            RijndaelManaged symmetricKey = new RijndaelManaged();
            symmetricKey.Mode = CipherMode.CBC;
            ICryptoTransform encryptor = symmetricKey.CreateEncryptor(keyBytes, initVectorBytes);
            MemoryStream memoryStream = new MemoryStream();
            CryptoStream cryptoStream = new CryptoStream(memoryStream, encryptor, CryptoStreamMode.Write);
            cryptoStream.Write(plainTextBytes, 0, plainTextBytes.Length);
            cryptoStream.FlushFinalBlock();
            byte[] cipherTextBytes = memoryStream.ToArray();
            memoryStream.Close();
            cryptoStream.Close();
            return Convert.ToBase64String(cipherTextBytes);
        }
        //Decrypt
        public static string DecryptString(string cipherText)
        {
            byte[] initVectorBytes = Encoding.UTF8.GetBytes(initVector);
            byte[] cipherTextBytes = Convert.FromBase64String(cipherText);
            PasswordDeriveBytes password = new PasswordDeriveBytes(passPhrase, null);
            byte[] keyBytes = password.GetBytes(keysize / 8);
            RijndaelManaged symmetricKey = new RijndaelManaged();
            symmetricKey.Mode = CipherMode.CBC;
            ICryptoTransform decryptor = symmetricKey.CreateDecryptor(keyBytes, initVectorBytes);
            MemoryStream memoryStream = new MemoryStream(cipherTextBytes);
            CryptoStream cryptoStream = new CryptoStream(memoryStream, decryptor, CryptoStreamMode.Read);
            byte[] plainTextBytes = new byte[cipherTextBytes.Length];
            int decryptedByteCount = cryptoStream.Read(plainTextBytes, 0, plainTextBytes.Length);
            memoryStream.Close();
            cryptoStream.Close();
            return Encoding.UTF8.GetString(plainTextBytes, 0, decryptedByteCount);
        }
    }

}
