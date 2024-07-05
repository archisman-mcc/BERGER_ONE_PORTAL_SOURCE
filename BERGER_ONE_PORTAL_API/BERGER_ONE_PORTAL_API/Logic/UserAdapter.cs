using BERGER_ONE_PORTAL_API.Common;
using BERGER_ONE_PORTAL_API.Dtos.RequestDto;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto;
using BERGER_ONE_PORTAL_API.Dtos.UserProfileResponse;
using BERGER_ONE_PORTAL_API.Models;
using Microsoft.VisualBasic;
using Newtonsoft.Json.Linq;
using System.Data;
using static BERGER_ONE_PORTAL_API.Dtos.UserResponseDto;

namespace BERGER_ONE_PORTAL_API.Logic
{
    internal static class UserAdapter
    {

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
                else
                {
                    throw new DataException(outputMsg);
                }
            }
            else
            {
                throw new ArgumentNullException("Data Access Response is null or empty");
            }

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
                            var dtUserDetails = ds?.Tables[0];
                            var dtApplicabledepot = ds?.Tables[1];
                            response = new UserProfileResponse()
                            {
                                Data = dtUserDetails?.AsEnumerable().Select(dr => new UserProfileModel()
                                {
                                    UspUserId = Convert.ToString(dr["usp_user_id"]),
                                    UspFirstName = Convert.ToString(dr["usp_first_name"]),
                                    UspLastName = Convert.ToString(dr["usp_last_name"]),
                                    UspGroupCode = Convert.ToString(dr["usp_group_code"]),
                                    UspDept = Convert.ToString(dr["usp_dept"]),
                                    UspMailid = Convert.ToString(dr["usp_mailid"]),
                                    UspMobile = Convert.ToString(dr["usp_mobile"]),
                                    UspDesig = Convert.ToString(dr["usp_desig"]),
                                    UspDoj = Convert.ToString(dr["usp_doj"]),
                                    UspDepot = Convert.ToString(dr["usp_depot"]),
                                    UspEmployeeId = Convert.ToString(dr["usp_employee_id"]),
                                    created_user = Convert.ToString(dr["created_user"]),
                                    Active = Convert.ToString(dr["active"]),
                                    Depot = dtApplicabledepot?.AsEnumerable().Select(r => new DepotModels()
                                    {
                                        DepotCode = Convert.ToString(r["uad_depot_code"])
                                    })?.ToList(),
                                })?.ToList(),
                            };
                        }
                    }
                }
                else
                {
                    throw new DataException(OutputMsg);
                }
            }
            else
            {
                throw new ArgumentNullException("Data Access Response is null or empty");
            }

            return response;
        }
    }
}
