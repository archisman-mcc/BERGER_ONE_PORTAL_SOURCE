using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MSSQL_HELPER.Model;
internal struct Constants
{
    internal const string RequestIsNull = "Request is null.";
    internal const string ConnectionStringIsNull = "Connection String is empty or null.";
    internal const string DataBaseNameIsNull = "Database name is empty or null.";
    internal const string ConnectionPropertiesIsNull = "Connection properties is empty or null.";
    internal const string CommandTextIsNull = "Command text is empty or null.";
    internal const string DBServerNameIsNull = "Database Server name is empty or null.";
    internal const string DBNameIsNull = "Database name is empty or null.";
    internal const string DBUserIdIsNull = "Database user id is empty or null.";
    internal const string DBPasswordIsNull = "Database password is empty or null.";
    internal const string CommandType = "Command type is empty or null.";
    internal const int SQLCommandTimeOut = 30;
    internal const int SQLRetryDelay = 3000;
    internal const int SQLRetryCount = 3;
}
