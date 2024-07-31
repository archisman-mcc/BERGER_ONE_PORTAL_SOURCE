using BERGER_ONE_PORTAL_API.Core;
using BERGER_ONE_PORTAL_API.Dtos;
using MSSQL_HELPER.Model;
using MSSQL_HELPER.MSSQLHelper;
using Microsoft.Data.SqlClient;
using System.Data;
using BERGER_ONE_PORTAL_API.Common.Utilty;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto;
using BERGER_ONE_PORTAL_API.Dtos;
using LoginRequestDto = BERGER_ONE_PORTAL_API.Dtos.LoginRequestDto;
using BERGER_ONE_PORTAL_API.Common;
using BERGER_ONE_PORTAL_API.Dtos.RequestDto;
using Microsoft.VisualBasic;

namespace BERGER_ONE_PORTAL_API.Repository.Common
{
    public class CommonRepo : ICommonRepo
    {
        private readonly ISqlHelper _sqlHelper;
        private readonly IServiceContext _serviceContext;
        public CommonRepo(ISqlHelper sqlHelper, IServiceContext serviceContext)
        {
            _sqlHelper = sqlHelper;
            _serviceContext = serviceContext;
        }

        #region For User Profile:
        public async Task<MSSQLResponse?> GetUserList(UserListDto dto)
        {
            MSSQLResponse? response = null;
            SqlParameter[] sqlParams = new SqlParameter[10];
            try
            {
                sqlParams[0] = new SqlParameter
                {
                    ParameterName = "@keyword",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(dto.GlobalFilter)
                };

                sqlParams[1] = new SqlParameter
                {
                    ParameterName = "@start",
                    DbType = DbType.Int32,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFIntegerOrDBNull(dto.Start)
                };

                sqlParams[2] = new SqlParameter
                {
                    ParameterName = "@length",
                    DbType = DbType.Int32,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFIntegerOrDBNull(dto.Size)
                };

                sqlParams[3] = new SqlParameter
                {
                    ParameterName = "@filterJSON",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFListOrDBNull(dto.Filters)
                };

                sqlParams[4] = new SqlParameter
                {
                    ParameterName = "@orderJSON",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFListOrDBNull(dto.Sorting)
                };

                sqlParams[5] = new SqlParameter
                {
                    ParameterName = "@viewType",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(dto.ViewType)
                };

                sqlParams[6] = new SqlParameter
                {
                    ParameterName = "@groupBy",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(dto.GroupBy)
                };

                sqlParams[7] = new SqlParameter
                {
                    ParameterName = "@ViewBy",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(dto.ViewBy)
                };

                sqlParams[8] = new SqlParameter
                {
                    ParameterName = "@outputCode",
                    DbType = DbType.Int32,
                    Size = -1,
                    Direction = ParameterDirection.Output,
                };

                sqlParams[9] = new SqlParameter
                {
                    ParameterName = "@outputMsg",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Output,
                    Size = -1,
                };

                response = new MSSQLResponse()
                {
                    Data = await _sqlHelper.FetchData(new ExecuteDataSetRequest()
                    {
                        CommandText = "[dbo].[Get_Users_List]",
                        CommandTimeout = Constant.Common.SQLCommandTimeOut,
                        CommandType = CommandType.StoredProcedure,
                        ConnectionProperties = _serviceContext.MSSQLConnectionModel,
                        IsMultipleTables = false,
                        Parameters = sqlParams
                    }),
                    RowsAffected = null,
                    OutputParameters = sqlParams.AsEnumerable().Where(r => r.Direction == ParameterDirection.Output)?.ToArray()

                };
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }

            return response;
        }

        public async Task<MSSQLResponse?> GetUserDetails(UserProfileDetailsRequest dto)
        {
            MSSQLResponse? response = null;
            SqlParameter[] sqlParams = new SqlParameter[3];
            try
            {
                sqlParams[0] = new SqlParameter
                {
                    ParameterName = "@usp_user_id",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(dto.UserId)
                };

                sqlParams[1] = new SqlParameter
                {
                    ParameterName = "@outputCode",
                    DbType = DbType.Int32,
                    Size = -1,
                    Direction = ParameterDirection.Output,
                };

                sqlParams[2] = new SqlParameter
                {
                    ParameterName = "@outputMsg",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Output,
                    Size = -1,
                };

                response = new MSSQLResponse()
                {
                    Data = await _sqlHelper.FetchData(new ExecuteDataSetRequest()
                    {
                        CommandText = "[dbo].[User_Profile_Details]",
                        CommandTimeout = Constant.Common.SQLCommandTimeOut,
                        CommandType = CommandType.StoredProcedure,
                        ConnectionProperties = _serviceContext.MSSQLConnectionModel,
                        IsMultipleTables = true,
                        Parameters = sqlParams
                    }),
                    RowsAffected = null,
                    OutputParameters = sqlParams.AsEnumerable().Where(r => r.Direction == ParameterDirection.Output)?.ToArray()

                };
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }

            return response;
        }

        public async Task<MSSQLResponse?> GetAppListData()
        {
            MSSQLResponse? response = null;
            SqlParameter[] sqlParams = new SqlParameter[3];
            try
            {

                response = new MSSQLResponse()
                {
                    Data = await _sqlHelper.FetchData(new ExecuteDataSetRequest()
                    {
                        CommandText = "[dbo].[App_List_For_One_Protal_Get]",
                        CommandTimeout = Constant.Common.SQLCommandTimeOut,
                        CommandType = CommandType.StoredProcedure,
                        ConnectionProperties = _serviceContext.MSSQLConnectionModel,
                        IsMultipleTables = true,
                        //Parameters = sqlParams
                    }),
                    //OutputParameters = sqlParams.AsEnumerable().Where(r => r.Direction == ParameterDirection.Output)?.ToArray()

                };
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }

            return response;
        }

        public async Task<MSSQLResponse?> GetReportingUser(ReportingUserRequest dto)
        {
            MSSQLResponse? response = null;
            SqlParameter[] sqlParams = new SqlParameter[4];
            try
            {
                sqlParams[0] = new SqlParameter
                {
                    ParameterName = "@userId",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(dto.UserId)
                };
                sqlParams[1] = new SqlParameter
                {
                    ParameterName = "@keyword",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(dto.GlobalFilter)
                };
                sqlParams[2] = new SqlParameter
                {
                    ParameterName = "@outputCode",
                    DbType = DbType.Int32,
                    Size = -1,
                    Direction = ParameterDirection.Output,
                };

                sqlParams[3] = new SqlParameter
                {
                    ParameterName = "@outputMsg",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Output,
                    Size = -1,
                };


                response = new MSSQLResponse()
                {
                    Data = await _sqlHelper.FetchData(new ExecuteDataSetRequest()
                    {
                        CommandText = "[dbo].[User_Profile_getReporteeUser]",
                        CommandTimeout = Constant.Common.SQLCommandTimeOut,
                        CommandType = CommandType.StoredProcedure,
                        ConnectionProperties = _serviceContext.MSSQLConnectionModel,
                        IsMultipleTables = false,
                        Parameters = sqlParams
                    }),
                    RowsAffected = null,
                    OutputParameters = sqlParams.AsEnumerable().Where(r => r.Direction == ParameterDirection.Output)?.ToArray()

                };
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }

            return response;
        }

        public async Task<MSSQLResponse?> GetDeptList(UserDeptRequestDto dto)
        {
            MSSQLResponse? response = null;
            SqlParameter[] sqlParams = new SqlParameter[2];
            try
            {
                sqlParams[0] = new SqlParameter
                {
                    ParameterName = "@lov_type",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(dto.lov_type)
                };
                sqlParams[1] = new SqlParameter
                {
                    ParameterName = "@active",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(dto.active)
                };
                
                response = new MSSQLResponse()
                {
                    Data = await _sqlHelper.FetchData(new ExecuteDataSetRequest()
                    {
                        CommandText = "[app].[common_get_lov_list]",
                        CommandTimeout = Constant.Common.SQLCommandTimeOut,
                        CommandType = CommandType.StoredProcedure,
                        ConnectionProperties = _serviceContext.MSSQLConnectionModel,
                        IsMultipleTables = true,
                        Parameters = sqlParams
                    }),
                    RowsAffected = null,
                    OutputParameters = sqlParams.AsEnumerable().Where(r => r.Direction == ParameterDirection.Output)?.ToArray()

                };
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }

            return response;
        }

        public async Task<MSSQLResponse?> GetApplicableDepotList(UserDepotRequestDto dto)
        {
            MSSQLResponse? response = null;
            SqlParameter[] sqlParams = new SqlParameter[3];
            try
            {
                sqlParams[0] = new SqlParameter
                {
                    ParameterName = "@user_id",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(dto.user_id)
                };
                sqlParams[1] = new SqlParameter
                {
                    ParameterName = "@region",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(dto.Region)
                };
                sqlParams[2] = new SqlParameter
                {
                    ParameterName = "@app_id",
                    DbType = DbType.Int64,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFLongOrDBNull(dto.app_id)
                };

                response = new MSSQLResponse()
                {
                    Data = await _sqlHelper.FetchData(new ExecuteDataSetRequest()
                    {
                        CommandText = "[app].[get_applicable_depot]",
                        CommandTimeout = Constant.Common.SQLCommandTimeOut,
                        CommandType = CommandType.StoredProcedure,
                        ConnectionProperties = _serviceContext.MSSQLConnectionModel,
                        IsMultipleTables = true,
                        Parameters = sqlParams
                    }),
                    RowsAffected = null,
                    OutputParameters = sqlParams.AsEnumerable().Where(r => r.Direction == ParameterDirection.Output)?.ToArray()

                };
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }

            return response;
        }
        #endregion

        #region For Form Menu Master:
        public async Task<MSSQLResponse?> FormMenuMasterList(FormMenuFetchRequest dto)
        {
            MSSQLResponse? response = null;
            SqlParameter[] sqlParams = new SqlParameter[7];
            try
            {
                sqlParams[0] = new SqlParameter
                {
                    ParameterName = "@keyword",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(dto.GlobalFilter)
                };

                sqlParams[1] = new SqlParameter
                {
                    ParameterName = "@start",
                    DbType = DbType.Int32,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFIntegerOrDBNull(dto.Start)
                };

                sqlParams[2] = new SqlParameter
                {
                    ParameterName = "@length",
                    DbType = DbType.Int32,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFIntegerOrDBNull(dto.Size)
                };

                sqlParams[3] = new SqlParameter
                {
                    ParameterName = "@filterJSON",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFListOrDBNull(dto.Filters)
                };

                sqlParams[4] = new SqlParameter
                {
                    ParameterName = "@orderJSON",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFListOrDBNull(dto.Sorting)
                };

                sqlParams[5] = new SqlParameter
                {
                    ParameterName = "@outputCode",
                    DbType = DbType.Int32,
                    Size = -1,
                    Direction = ParameterDirection.Output,
                };

                sqlParams[6] = new SqlParameter
                {
                    ParameterName = "@outputMsg",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Output,
                    Size = -1,
                };

                response = new MSSQLResponse()
                {
                    Data = await _sqlHelper.FetchData(new ExecuteDataSetRequest()
                    {
                        CommandText = "[dbo].[FormMenu_List]",
                        CommandTimeout = Constant.Common.SQLCommandTimeOut,
                        CommandType = CommandType.StoredProcedure,
                        ConnectionProperties = _serviceContext.MSSQLConnectionModel,
                        IsMultipleTables = false,
                        Parameters = sqlParams
                    }),
                    RowsAffected = null,
                    OutputParameters = sqlParams.AsEnumerable().Where(r => r.Direction == ParameterDirection.Output)?.ToArray()

                };
            }
            catch (Exception ex) { throw new Exception(ex.Message, ex); }
            return response;
        }

        public async Task<MSSQLResponse> FormMenuMasterInsert(FormMenuInsertRequest request)
        {
            MSSQLResponse? response = null;
            SqlParameter[] sqlParams = new SqlParameter[12];
            sqlParams[0] = new SqlParameter
            {
                ParameterName = "@fmm_id",
                SqlDbType = SqlDbType.VarChar,
                Direction = ParameterDirection.Input,
                Size = -1,
                Value = Utils.IIFStringOrDBNull(request.fmm_id)
            };
            sqlParams[1] = new SqlParameter
            {
                ParameterName = "@fmm_name",
                SqlDbType = SqlDbType.VarChar,
                Direction = ParameterDirection.Input,
                Size = -1,
                Value = Utils.IIFStringOrDBNull(request.fmm_name)
            };
            sqlParams[2] = new SqlParameter
            {
                ParameterName = "@fmm_link",
                SqlDbType = SqlDbType.VarChar,
                Direction = ParameterDirection.Input,
                Size = -1,
                Value = Utils.IIFStringOrDBNull(request.fmm_link)
            };
            sqlParams[3] = new SqlParameter
            {
                ParameterName = "@fmm_parent_id",
                SqlDbType = SqlDbType.VarChar,
                Direction = ParameterDirection.Input,
                Size = -1,
                Value = Utils.IIFStringOrDBNull(request.fmm_parent_id)
            };
            sqlParams[4] = new SqlParameter
            {
                ParameterName = "@fmm_sequence",
                SqlDbType = SqlDbType.VarChar,
                Direction = ParameterDirection.Input,
                Size = -1,
                Value = Utils.IIFStringOrDBNull(request.fmm_sequence)
            };
            sqlParams[5] = new SqlParameter
            {
                ParameterName = "@fmm_app_id",
                SqlDbType = SqlDbType.VarChar,
                Direction = ParameterDirection.Input,
                Size = -1,
                Value = Utils.IIFStringOrDBNull(request.fmm_app_id)
            };
            sqlParams[6] = new SqlParameter
            {
                ParameterName = "@fafa_icon",
                SqlDbType = SqlDbType.VarChar,
                Direction = ParameterDirection.Input,
                Size = -1,
                Value = Utils.IIFStringOrDBNull(request.fafa_icon)
            };

            sqlParams[7] = new SqlParameter
            {
                ParameterName = "@created_user",
                SqlDbType = SqlDbType.VarChar,
                Direction = ParameterDirection.Input,
                Size = -1,
                Value = Utils.IIFStringOrDBNull(request.created_user)
            };
            sqlParams[8] = new SqlParameter
            {
                ParameterName = "@active",
                SqlDbType = SqlDbType.VarChar,
                Direction = ParameterDirection.Input,
                Size = -1,
                Value = Utils.IIFStringOrDBNull(request.Active)
            };
            sqlParams[9] = new SqlParameter
            {
                ParameterName = "@insert_update_flag",
                SqlDbType = SqlDbType.VarChar,
                Direction = ParameterDirection.Input,
                Size = -1,
                Value = Utils.IIFStringOrDBNull(request.insert_update_flag)
            };
            sqlParams[10] = new SqlParameter
            {
                ParameterName = "@outputCode",
                SqlDbType = SqlDbType.Int,
                Direction = ParameterDirection.Output
            };
            sqlParams[11] = new SqlParameter
            {
                ParameterName = "@outputMsg",
                SqlDbType = SqlDbType.NVarChar,
                Direction = ParameterDirection.Output,
                Size = -1
            };

            response = new MSSQLResponse()
            {
                RowsAffected = await _sqlHelper.ExecuteNonQuery(new ExecuteNonQueryRequest()
                {
                    CommandText = "[dbo].[FormMenu_Insert]",
                    CommandTimeout = Constant.Common.SQLCommandTimeOut,
                    CommandType = CommandType.StoredProcedure,
                    ConnectionProperties = _serviceContext.MSSQLConnectionModel,
                    Parameters = sqlParams
                }),
                Data = null,
                OutputParameters = sqlParams.AsEnumerable().Where(r => r.Direction == ParameterDirection.Output)?.ToArray()
            };
            return response;
        }
        #endregion
    }
}
