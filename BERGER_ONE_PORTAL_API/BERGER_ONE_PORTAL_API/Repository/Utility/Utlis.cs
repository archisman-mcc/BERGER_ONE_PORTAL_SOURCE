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
    }
}
