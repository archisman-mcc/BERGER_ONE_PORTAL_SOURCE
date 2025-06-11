using BERGER_ONE_PORTAL_API.Models;
using Newtonsoft.Json;
using System.Data;
using System.Data.SqlTypes;
using System.Net;
using System.Reflection;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using Microsoft.Data.SqlClient;
using BERGER_ONE_PORTAL_API.CustomAttribute;

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

        public static List<SqlParameter> ObjectToSqlParams<T>(T parameters, bool isCommonOutputParamRequired = false)
        {
            var sqlParameters = new List<SqlParameter>();
            if (parameters == null) return sqlParameters;
            var p = parameters
                .GetType()
                .GetProperties()
                .Where(c => c.GetCustomAttributes(typeof(CustomSqlParameterIgnoreAttribute), false).Any() == false)
                .Select(c =>
                {
                    var sqlParameter = new SqlParameter
                    {
                        //ParameterName = $"@{c.Name}",
                        Value = c.GetValue(parameters) ?? DBNull.Value,
                        ParameterName = (c.GetCustomAttributes(typeof(CustomSqlParameterNameAttribute), false).FirstOrDefault() as
                                CustomSqlParameterNameAttribute)?.ParameterName ?? $"@{c.Name}"
                    };

                    var attr1 = c.GetCustomAttributes(typeof(CustomSqlParameterDirectionAttribute), false);
                    if (attr1.Length > 0)
                        sqlParameter.Direction = (attr1[0] as CustomSqlParameterDirectionAttribute)!.Direction;

                    var attr3 = c.GetCustomAttributes(typeof(CustomSqlParameterTypeAttribute), false);
                    if (attr3.Length > 0)
                        sqlParameter.DbType = (attr3[0] as CustomSqlParameterTypeAttribute)!.Type;
                    else
                    {
                        if (c.PropertyType == typeof(string))
                        {
                            sqlParameter.DbType = DbType.String;
                            if (sqlParameter.Value.ToString() == "")
                            {
                                sqlParameter.Value = DBNull.Value;
                            }
                        }
                        else if (c.PropertyType == typeof(int?) || c.PropertyType == typeof(int))
                            sqlParameter.DbType = DbType.Int32;
                        else if (c.PropertyType == typeof(short?) || c.PropertyType == typeof(short))
                            sqlParameter.DbType = DbType.Int16;
                        else if (c.PropertyType == typeof(long?) || c.PropertyType == typeof(long))
                            sqlParameter.DbType = DbType.Int64;
                        else if (c.PropertyType == typeof(decimal?) || c.PropertyType == typeof(decimal))
                            sqlParameter.DbType = DbType.Decimal;
                        else if (c.PropertyType == typeof(DateOnly?) || c.PropertyType == typeof(DateOnly))
                            sqlParameter.DbType = DbType.Date;
                        else if (c.PropertyType == typeof(TimeOnly) || c.PropertyType == typeof(TimeSpan))
                            sqlParameter.DbType = DbType.Time;
                    }

                    var attr2 = c.GetCustomAttributes(typeof(CustomSqlParameterSizeAttribute), false);
                    if (attr2.Length > 0)
                        sqlParameter.Size = (attr2[0] as CustomSqlParameterSizeAttribute)!.Size;
                    else
                    {
                        if (sqlParameter.DbType == DbType.String)
                        {
                            sqlParameter.Size = -1;
                        }
                    }

                    return sqlParameter;
                })
                .ToList();
            sqlParameters.AddRange(p);
            if (!isCommonOutputParamRequired) return sqlParameters;
            {
                if (sqlParameters.Any(c => c.ParameterName == "@outputCode") == false)
                    sqlParameters.Add(new SqlParameter
                    {
                        ParameterName = "@outputCode",
                        Direction = ParameterDirection.Output,
                        DbType = DbType.Int32
                    });
                if (sqlParameters.Any(c => c.ParameterName == "@outputMsg") == false)
                    sqlParameters.Add(new SqlParameter
                    {
                        ParameterName = "@outputMsg",
                        Direction = ParameterDirection.Output,
                        DbType = DbType.String,
                        Size = -1
                    });
            }

            return sqlParameters;
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

        public static string EncryptStr(string encryptString)
        {
            try
            {
                if (!string.IsNullOrEmpty(encryptString))
                {
                    string EncryptionKey = "";// "mccIT@BERGER@ADMIN$$%2#659KMDnde%!`*";

                    byte[] clearBytes = Encoding.Unicode.GetBytes(encryptString);
                    using (Aes encryptor = Aes.Create())
                    {
                        Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
                        encryptor.Key = pdb.GetBytes(32);
                        encryptor.IV = pdb.GetBytes(16);
                        using (MemoryStream ms = new MemoryStream())
                        {
                            using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateEncryptor(), CryptoStreamMode.Write))
                            {
                                cs.Write(clearBytes, 0, clearBytes.Length);
                                cs.Close();
                            }
                            encryptString = Convert.ToBase64String(ms.ToArray());
                        }
                    }
                    return HttpUtility.UrlEncode(encryptString);
                }
                else return string.Empty;
            }
            catch (Exception) { return string.Empty; }

        }

        public static string DecryptStr(string cipherText)
        {
            if (!string.IsNullOrEmpty(cipherText))
            {
                cipherText = HttpUtility.UrlDecode(cipherText);
                string EncryptionKey = "";// "mccIT@BERGER@ADMIN$$%2#659KMDnde%!`*";
                cipherText = cipherText.Replace(" ", "+");
                byte[] cipherBytes = Convert.FromBase64String(cipherText);
                using (Aes encryptor = Aes.Create())
                {
                    Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
                    encryptor.Key = pdb.GetBytes(32);
                    encryptor.IV = pdb.GetBytes(16);
                    using (MemoryStream ms = new MemoryStream())
                    {
                        using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateDecryptor(), CryptoStreamMode.Write))
                        {
                            cs.Write(cipherBytes, 0, cipherBytes.Length);
                            cs.Close();
                        }
                        cipherText = Encoding.Unicode.GetString(ms.ToArray());
                    }
                }
                return cipherText;
            }
            else return string.Empty;
        }
    }

}
