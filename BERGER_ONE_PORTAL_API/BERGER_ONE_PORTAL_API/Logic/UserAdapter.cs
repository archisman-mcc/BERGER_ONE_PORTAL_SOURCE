using Azure;
using BERGER_ONE_PORTAL_API.Common;
using BERGER_ONE_PORTAL_API.Dtos.RequestDto;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto.Protecton;
using BERGER_ONE_PORTAL_API.Dtos.UserProfileResponse;
using BERGER_ONE_PORTAL_API.Models;
using BERGER_ONE_PORTAL_API.Models.Protecton;
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
                            ds.Tables[1].TableName = "UserApps";
                            ds.Tables[2].TableName = "UserGroup";
                            ds.Tables[3].TableName = "UserDepot";
                            ds.Tables[4].TableName = "AllTerr";
                            ds.Tables[5].TableName = "UserTerr";


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

        public static UserDeptResponseDto? MapUserDeptResponse(MSSQLResponse? data)
        {
            UserDeptResponseDto? response = null;
            if (data != null)
            {
                response = new UserDeptResponseDto()
                {
                    Data = (data.Data as DataSet)?.Tables.OfType<DataTable>().FirstOrDefault()?.AsEnumerable().Select(dr => new UserDeptModel()
                    {
                        LovName = dr.Field<string?>("lov_value"),
                        LovCode = dr.Field<string?>("lov_code"),
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

        public static UserDepotResponseDto? MapUserDepotResponse(MSSQLResponse? data)
        {
            UserDepotResponseDto? response = null;
            if (data != null)
            {
                response = new UserDepotResponseDto()
                {
                    Data = (data.Data as DataSet)?.Tables.OfType<DataTable>().FirstOrDefault()?.AsEnumerable().Select(dr => new UserDepotModel()
                    {
                        DepotCode = dr.Field<string?>("depot_code"),
                        DepotName = dr.Field<string?>("depot_name"),
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


        public static UserApplTerrResponseDto? MapUserApplTerrResponse(MSSQLResponse? data)
        {
            UserApplTerrResponseDto? response = null;
            if (data != null)
            {
                response = new UserApplTerrResponseDto()
                {
                    Data = (data.Data as DataSet)?.Tables.OfType<DataTable>().FirstOrDefault()?.AsEnumerable().Select(dr => new UserApplTerrModel()
                    {
                        terr_code = dr.Field<string?>("terr_code"),
                        terr_name = dr.Field<string?>("terr_name"),
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

        public static UserApplAppResponseDto? MapUserApplAppResponse(MSSQLResponse? data)
        {
            UserApplAppResponseDto? response = null;
            if (data != null)
            {
                response = new UserApplAppResponseDto()
                {
                    Data = (data.Data as DataSet)?.Tables.OfType<DataTable>().FirstOrDefault()?.AsEnumerable().Select(dr => new UserApplAppModel()
                    {
                        UserAppId = dr.Field<Int32?>("user_app_id"),
                        UserAppName = dr.Field<string?>("user_app_name"),
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

        public static AllUserGroupResponseDto? MapUserProfileGroupAllResponse(MSSQLResponse? data)
        {
            AllUserGroupResponseDto? response = null;
            if (data != null)
            {
                response = new AllUserGroupResponseDto()
                {
                    Data = (data.Data as DataSet)?.Tables.OfType<DataTable>().FirstOrDefault()?.AsEnumerable().Select(dr => new AllUserGroupModel()
                    {
                        UserGroupCode = dr.Field<string?>("usp_group_code"),
                        UserGroupDesc = dr.Field<string?>("usp_group_desc"),
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

        public static UserTerrResponseDto? MapUserTerrResponse(MSSQLResponse? data)
        {
            UserTerrResponseDto? response = null;
            if (data != null)
            {
                response = new UserTerrResponseDto()
                {
                    Data = (data.Data as DataSet)?.Tables.OfType<DataTable>().FirstOrDefault()?.AsEnumerable().Select(dr => new UserTerrDepotWiseModel()
                    {
                        TerrCode = dr.Field<string?>("terr_code"),
                        TerrtName = dr.Field<string?>("terr"),
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

        public static DynamicResponse? MapDynamicResponse(MSSQLResponse? data)
        {
            DynamicResponse? response = null;
            if (data != null)
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
                }


            }
            else throw new ArgumentNullException("Data Access Response is null or empty");
            return response;
        }

        public static UserInsertResponseDto? MapUserProfileInsertResponse(MSSQLResponse? data)
        {
            UserInsertResponseDto? response = new UserInsertResponseDto();
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

        public static EpcaStatusResponseDto? MapLegalStatusResponse(MSSQLResponse? data)
        {
            EpcaStatusResponseDto? response = null;
            if (data != null)
            {
                response = new EpcaStatusResponseDto()
                {
                    Data = (data.Data as DataSet)?.Tables.OfType<DataTable>().FirstOrDefault()?.AsEnumerable().Select(dr => new EpcaStatusModel()
                    {
                        LovValue = dr.Field<string?>("lov_value"),
                        LovCode = dr.Field<string?>("lov_code"),
                        LovField1Value = dr.Field<string?>("lov_field1_value"),
                        LovField2Value = dr.Field<string?>("lov_field2_value"),
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
        #endregion

        #region For Form Menu Master:
        public static FormMenuResponse? MapGetFormMenuMasterResponse(MSSQLResponse? data)
        {
            //DynamicResponse? response = null;
            //if (data != null) 
            //{
            //    int OutputCode = int.TryParse(Convert.ToString(data.OutputParameters?[0].Value), out _) ? Convert.ToInt32(data.OutputParameters?[0].Value) : -1;
            //    string? OutputMsg = Convert.ToString(data.OutputParameters?[1].Value);
            //    if (OutputCode == 1)
            //    {
            //        if (data != null && data.Data != null)
            //        {
            //            var ds = (data?.Data as DataTable);
            //            if (ds != null && ds.Rows.Count > 0)
            //            {
            //                response = new DynamicResponse();
            //                response.Data = ds;
            //                if (response != null && response.Data.Rows.Count > 0)
            //                {
            //                    response.success = true;
            //                    response.message = OutputMsg;
            //                    response.statusCode = HttpStatusCode.OK;
            //                }
            //                else
            //                {
            //                    response.Data = null;
            //                    response.success = false;
            //                    response.message = OutputMsg;
            //                    response.statusCode = HttpStatusCode.NoContent;
            //                }
            //            }
            //            else
            //            {
            //                response.Data = null;
            //                response.success = false;
            //                response.message = OutputMsg;
            //                response.statusCode = HttpStatusCode.NoContent;
            //            }
            //        }
            //    }
            //    else
            //    {
            //        response.Data = null;
            //        response.success = false;
            //        response.message = OutputMsg;
            //        response.statusCode = HttpStatusCode.NoContent;
            //    }
            //}
            //else throw new ArgumentNullException("Data Access Response is null or empty");

            FormMenuResponse? response = null;
            if (data != null)
            {
                int OutputCode = int.TryParse(Convert.ToString(data.OutputParameters?[0].Value), out _) ? Convert.ToInt32(data.OutputParameters?[0].Value) : -1;
                string? OutputMsg = Convert.ToString(data.OutputParameters?[1].Value);

                if (OutputCode == 1)
                {
                    response = new FormMenuResponse()
                    {
                        Data = (data.Data as DataTable)?.AsEnumerable().Select(dr => new FormMenuModel()
                        {
                            FmmId = Convert.ToInt32(dr["fmm_id"]),
                            FmmName = Convert.ToString(dr["fmm_name"]),
                            FmmLink = Convert.ToString(dr["fmm_link"]),
                            FmmParentId = Convert.ToInt32(dr["fmm_parent_id"]),
                            FmmParentName = Convert.ToString(dr["fmm_parent_name"]),
                            FmmSequence = Convert.ToString(dr["fmm_sequence"]),
                            fafa_icon = Convert.ToString(dr["fafa_icon"]),
                            ActiveDesc = Convert.ToString(dr["activedesc"]),
                            CreatedUser = Convert.ToString(dr["created_user"]),
                            CreatedDate = !string.IsNullOrWhiteSpace(Convert.ToString(dr["created_date"])) ? Convert.ToDateTime(dr["created_date"]) : null,
                            Active = Convert.ToString(dr["active"])

                        })?.ToList(),
                        Meta = new Meta()
                        {
                            TotalRowCount = (data.Data as DataTable)?.AsEnumerable().Select(dr => Convert.ToInt64(dr["total_record"])).FirstOrDefault()
                        }
                    };
                }
                else throw new DataException(OutputMsg);
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

        #region For User Form Access:
        public static UserAccessFormsResponse? MapUserApplicableResponse(MSSQLResponse? data)
        {
            UserAccessFormsResponse? response = null;
            if (data != null)
            {
                int OutputCode = int.TryParse(Convert.ToString(data.OutputParameters?[0].Value), out _) ? Convert.ToInt32(data.OutputParameters?[0].Value) : -1;
                string? OutputMsg = Convert.ToString(data.OutputParameters?[1].Value);
                if (OutputCode == 1)
                {
                    response = new UserAccessFormsResponse()
                    {
                        Data = (data.Data as DataTable)?.AsEnumerable().Select(dr => new UserAccessFormsModel()
                        {
                            FormCode = Convert.ToString(dr["form_code"]),
                            FormDesc = Convert.ToString(dr["form_desc"])

                        })?.ToList(),
                    };
                }
                else throw new DataException(OutputMsg);
            }
            else throw new ArgumentNullException("Data Access Response is null or empty");
            return response;
        }
        public static UserAccessFormsResponse? MapUserAvailableResponse(MSSQLResponse? data)
        {
            UserAccessFormsResponse? response = null;
            if (data != null)
            {
                int OutputCode = int.TryParse(Convert.ToString(data.OutputParameters?[0].Value), out _) ? Convert.ToInt32(data.OutputParameters?[0].Value) : -1;
                string? OutputMsg = Convert.ToString(data.OutputParameters?[1].Value);

                if (OutputCode == 1)
                {
                    response = new UserAccessFormsResponse()
                    {
                        Data = (data.Data as DataTable)?.AsEnumerable().Select(dr => new UserAccessFormsModel()
                        {
                            FormCode = Convert.ToString(dr["form_code"]),
                            FormDesc = Convert.ToString(dr["form_desc"])

                        })?.ToList(),
                    };
                }
                else throw new DataException(OutputMsg);
            }
            else throw new ArgumentNullException("Data Access Response is null or empty");
            return response;
        }
        public static UserAccessFormsSaveResponse? MapUserAccessSaveResponse(MSSQLResponse? data)
        {
            UserAccessFormsSaveResponse? response = new UserAccessFormsSaveResponse();
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

        #region For Common Actions Only:
        public static ParentMenuResponse? MapParentMenuResponse(MSSQLResponse? data)
        {
            ParentMenuResponse? response = null;
            if (data != null && data.Data.Rows.Count > 0)
            {
                int OutputCode = int.TryParse(Convert.ToString(data.OutputParameters?[0].Value), out _) ? Convert.ToInt32(data.OutputParameters?[0].Value) : -1;
                string? OutputMsg = Convert.ToString(data.OutputParameters?[1].Value);
                if (OutputCode == 1)
                {
                    response = new ParentMenuResponse()
                    {
                        Data = (data.Data as DataTable)?.AsEnumerable().Select(dr => new ParentMenuModel()
                        {
                            FmmParentId = Convert.ToString(dr["fmm_parent_id"]),
                            FmmParentName = Convert.ToString(dr["fmm_parent_name"])

                        })?.ToList(),
                    };
                }
                else throw new DataException(OutputMsg);
            }
            else throw new ArgumentNullException("Data Access Response is null or empty");
            return response;
        }

        public static UserGroupAllResponse? MapUserGroupAllResponse(MSSQLResponse? data)
        {
            UserGroupAllResponse? response = null;

            if (data != null)
            {
                int OutputCode = int.TryParse(Convert.ToString(data.OutputParameters?[0].Value), out _) ? Convert.ToInt32(data.OutputParameters?[0].Value) : -1;
                string? OutputMsg = Convert.ToString(data.OutputParameters?[1].Value);

                if (OutputCode == 1)
                {
                    response = new UserGroupAllResponse()
                    {
                        Data = (data.Data as DataTable)?.AsEnumerable().Select(dr => new UserGroupAllModel()
                        {
                            usp_group_code = Convert.ToString(dr["usp_group_code"]),
                            usp_group_desc = Convert.ToString(dr["usp_group_desc"])

                        })?.ToList(),
                    };
                }
                else throw new DataException(OutputMsg);
            }
            else throw new ArgumentNullException("Data Access Response is null or empty");
            return response;
        }
        public static UserByGroupResponse? MapUserListByGroupResponse(MSSQLResponse? data)
        {
            UserByGroupResponse? response = null;
            if (data != null)
            {
                int OutputCode = int.TryParse(Convert.ToString(data.OutputParameters?[0].Value), out _) ? Convert.ToInt32(data.OutputParameters?[0].Value) : -1;
                string? OutputMsg = Convert.ToString(data.OutputParameters?[1].Value);

                if (OutputCode == 1)
                {
                    response = new UserByGroupResponse()
                    {
                        Data = (data.Data as DataTable)?.AsEnumerable().Select(dr => new UserByGroupListModel()
                        {
                            UserId = Convert.ToString(dr["userid"]),
                            UserName = Convert.ToString(dr["username"])

                        })?.ToList(),
                    };
                }
                else throw new DataException(OutputMsg);
            }
            else throw new ArgumentNullException("Data Access Response is null or empty");
            return response;
        }
        #endregion
    }
}
