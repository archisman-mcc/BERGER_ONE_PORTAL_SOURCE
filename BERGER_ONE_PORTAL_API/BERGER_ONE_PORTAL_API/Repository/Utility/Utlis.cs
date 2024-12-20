using Newtonsoft.Json;
using System.Data;

namespace BERGER_ONE_PORTAL_API.Repository.Utility
{
    public static class Utlis
    {
        public static List<T> MapResult<T>(DataTable? dt)
        {
            var serializeObject = JsonConvert.SerializeObject(dt);
            return JsonConvert.DeserializeObject<List<T>>(serializeObject) ?? [];
        }

        public static bool HasData(this DataSet? ds, int tableCount)
        {
            bool result = false;

            if (ds != null && ds.Tables.Count > 0)
            {
                for (int i = 0; i < tableCount; i++)
                {
                    if (ds.Tables[i] != null && ds.Tables[i].Rows.Count > 0)
                    {
                        result = true;
                    }
                    else
                    {
                        result = false;
                        break;
                    }
                }
            }

            return result;

        }
    }
}
