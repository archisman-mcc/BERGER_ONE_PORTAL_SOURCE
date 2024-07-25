using Azure;
using BERGER_ONE_PORTAL_API.Common;
using BERGER_ONE_PORTAL_API.Dtos.RequestDto;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto;
using BERGER_ONE_PORTAL_API.Dtos.UserProfileResponse;
using BERGER_ONE_PORTAL_API.Models;
using Microsoft.VisualBasic;
using Newtonsoft.Json.Linq;
using System.Data;
using System.Net;
using static BERGER_ONE_PORTAL_API.Dtos.UserResponseDto;

namespace BERGER_ONE_PORTAL_API.Logic
{
    internal static class UserAdapter
    {
        #region For User Profile:
        public static JObject MapUserListResponse(MSSQLResponse? data, UserListDto dto)
        {
            if (data != null)
            {
                int outputCode = int.TryParse(Convert.ToString(data.OutputParameters?[0].Value), out outputCode) ? outputCode : -1;
                var outputMsg = Convert.ToString(data.OutputParameters?[1].Value);
                if (outputCode == 1)
                {
                    var result =
                        !dto.ViewType.StringEquals(CommonHelper.ViewType.Kanban, StringComparison.OrdinalIgnoreCase)
                            ? CommonHelper.MapResult<JObject>(data.Data as DataTable)
                            : CommonHelper.MapResult<JObject>(data.Data as DataTable).Select(c => new
                            {
                                key = new
                                {
                                    value = c.Value<object>("key"),
                                    text = c.Value<object>("key"),
                                    attribute1 = (string?)null,
                                    attribute2 = (string?)null,
                                    attribute3 = (string?)null,
                                    total_record = c.Value<long>("total_record")
                                },
                                value = JArray.Parse(c.Value<string>("value") ?? "[]"),
                            }).Select(JObject.FromObject);
                    var response = new
                    {
                        Data = result.Select(c =>
                        {
                            c.Remove("total_record");
                            return c;
                        }),
                        Meta = !dto.ViewType.StringEquals(CommonHelper.ViewType.Kanban, StringComparison.OrdinalIgnoreCase) ? new Meta()
                        {
                            TotalRowCount = result.FirstOrDefault()?.Value<long>("total_record")
                        } : null,
                    };
                    return JObject.FromObject(response);
                }
                else throw new DataException(outputMsg);
            }
            else throw new ArgumentNullException("Data Access Response is null or empty");
        }

        public static UserProfileResponse? MapUserDetailsResponse(MSSQLResponse? data)
        {
            UserProfileResponse? response = null;
            if (data != null)
            {
                int OutputCode = int.TryParse(Convert.ToString(data.OutputParameters?[0].Value), out _) ? Convert.ToInt32(data.OutputParameters?[0].Value) : -1;
                string? OutputMsg = Convert.ToString(data.OutputParameters?[1].Value);
                if (OutputCode == 1)
                {
                    if (data != null && data.Data != null)
                    {
                        var ds = (data?.Data as DataSet);
                        if (ds != null && ds.Tables.Count > 0)
                        {
                            ds.Tables[0].TableName = "UserDetails";
                            ds.Tables[1].TableName = "UserApplDepot";
                            var dtUserDetails = ds?.Tables[0];
                            var dtApplicabledepot = ds?.Tables[1];
                            response = new UserProfileResponse();
                            response.Data = ds;

                            if (response != null && response.Data.Tables[0].Rows.Count > 0)
                            {
                                response.success = true;
                                response.message = OutputMsg;
                                response.statusCode = HttpStatusCode.OK;
                            }
                            else
                            {
                                response.Data = null;
                                response.success = false;
                                response.message = OutputMsg;
                                response.statusCode = HttpStatusCode.NoContent;
                            }
                        }
                        else
                        {
                            response.Data = null;
                            response.success = false;
                            response.message = OutputMsg;
                            response.statusCode = HttpStatusCode.NoContent;
                        }
                    }
                }
                else
                {
                    response.Data = null;
                    response.success = false;
                    response.message = OutputMsg;
                    response.statusCode = HttpStatusCode.NoContent;
                }
            }
            else
            {
                response.Data = null;
                response.success = false;
                response.message = "Data Access Response is null or empty";
                response.statusCode = HttpStatusCode.NoContent;
            }
            return response;
        }

        public static UserAppsResponseDto? MapAppResponse(MSSQLResponse? data)
        {
            UserAppsResponseDto? response = null;
            if (data != null)
            {
                response = new UserAppsResponseDto()
                {
                    Data = (data.Data as DataSet)?.Tables.OfType<DataTable>().FirstOrDefault()?.AsEnumerable().Select(dr => new UserAppModel()
                    {
                        AppId = dr.Field<int?>("oam_app_id"),
                        AppName = dr.Field<string?>("oam_app_name"),
                    })
                    .ToList(),
                };
                if (response != null && response.Data.Count > 0)
                {
                    response.success = true;
                    response.message = "Success";
                    response.statusCode = HttpStatusCode.OK;
                }
                else
                {
                    response.Data = null;
                    response.success = false;
                    response.message = "No Content";
                    response.statusCode = HttpStatusCode.NoContent;
                }
            }
            else
            {
                response.Data = null;
                response.success = false;
                response.message = "No Content";
                response.statusCode = HttpStatusCode.NoContent;
            }
            return response;
        }

        public static DynamicResponse? MapReportingUserResponse(MSSQLResponse? data)
        {
            DynamicResponse? response = null;
            if (data != null)
            {
                int OutputCode = int.TryParse(Convert.ToString(data.OutputParameters?[0].Value), out _) ? Convert.ToInt32(data.OutputParameters?[0].Value) : -1;
                string? OutputMsg = Convert.ToString(data.OutputParameters?[1].Value);
                if (OutputCode == 1)
                {
                    if (data != null && data.Data != null)
                    {
                        var ds = (data?.Data as DataTable);
                        if (ds != null && ds.Rows.Count > 0)
                        {
                            response = new DynamicResponse();
                            response.Data = ds;
                            if (response != null && response.Data.Count > 0)
                            {
                                response.success = true;
                                response.message = OutputMsg;
                                response.statusCode = HttpStatusCode.OK;
                            }
                            else
                            {
                                response.Data = null;
                                response.success = false;
                                response.message = OutputMsg;
                                response.statusCode = HttpStatusCode.NoContent;
                            }
                        }
                        else
                        {
                            response.Data = null;
                            response.success = false;
                            response.message = OutputMsg;
                            response.statusCode = HttpStatusCode.NoContent;
                        }
                    }
                }
                else
                {
                    response.Data = null;
                    response.success = false;
                    response.message = OutputMsg;
                    response.statusCode = HttpStatusCode.NoContent;
                }
            }
            else throw new ArgumentNullException("Data Access Response is null or empty");
            return response;
        }
        #endregion

        #region For Form Menu Master:
        public static DynamicResponse? MapGetFormMenuMasterResponse(MSSQLResponse? data)
        {
            DynamicResponse? response = null;
            if (data != null)
            {
                int OutputCode = int.TryParse(Convert.ToString(data.OutputParameters?[0].Value), out _) ? Convert.ToInt32(data.OutputParameters?[0].Value) : -1;
                string? OutputMsg = Convert.ToString(data.OutputParameters?[1].Value);
                if (OutputCode == 1)
                {
                    if (data != null && data.Data != null)
                    {
                        var ds = (data?.Data as DataTable);
                        if (ds != null && ds.Rows.Count > 0)
                        {
                            response = new DynamicResponse();
                            response.Data = ds;
                            if (response != null && response.Data.Rows.Count > 0)
                            {
                                response.success = true;
                                response.message = OutputMsg;
                                response.statusCode = HttpStatusCode.OK;
                            }
                            else
                            {
                                response.Data = null;
                                response.success = false;
                                response.message = OutputMsg;
                                response.statusCode = HttpStatusCode.NoContent;
                            }
                        }
                        else
                        {
                            response.Data = null;
                            response.success = false;
                            response.message = OutputMsg;
                            response.statusCode = HttpStatusCode.NoContent;
                        }
                    }
                }
                else
                {
                    response.Data = null;
                    response.success = false;
                    response.message = OutputMsg;
                    response.statusCode = HttpStatusCode.NoContent;
                }
            }
            else throw new ArgumentNullException("Data Access Response is null or empty");
            return response;
        }

        public static FormMenuSaveResponse? MapFormMenuMasterSaveResponse(MSSQLResponse? data)
        {
            FormMenuSaveResponse? response = new FormMenuSaveResponse();
            if (data != null)
            {
                int OutputCode = int.TryParse(Convert.ToString(data.OutputParameters?[0].Value), out _) ? Convert.ToInt32(data.OutputParameters?[0].Value) : -1;
                string? OutputMsg = Convert.ToString(data.OutputParameters?[1].Value);

                if (OutputCode <= 0) throw new Exception(OutputMsg);
                else response.ResponseMessage = OutputMsg;
            }
            else throw new ArgumentNullException("Data Access Response is null or empty");
            return response;
        }
        #endregion
    }
}
