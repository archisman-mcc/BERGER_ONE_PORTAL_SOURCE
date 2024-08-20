using BERGER_ONE_PORTAL_API.Common;
using BERGER_ONE_PORTAL_API.Core;
using BERGER_ONE_PORTAL_API.Dtos.RequestDto;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto;
using MSSQL_HELPER.Model;
using MSSQL_HELPER.MSSQLHelper;
using System.Data;
using Microsoft.Data.SqlClient;
using BERGER_ONE_PORTAL_API.Dtos.RequestDto.Protecton;
using BERGER_ONE_PORTAL_API.Common.Utilty;
using Azure.Core;

namespace BERGER_ONE_PORTAL_API.Repository.Protecton
{
    public class EpcaRepo : IEpcaRepo
    {
        private readonly ISqlHelper _sqlHelper;
        private readonly IServiceContext _serviceContext;
        public EpcaRepo(ISqlHelper sqlHelper, IServiceContext serviceContext)
        {
            _sqlHelper = sqlHelper;
            _serviceContext = serviceContext;
        }

        public async Task<MSSQLResponse?> GetPcaStatusList(pcaStatusRequestDto dto)
        {
            MSSQLResponse? response = null;
            SqlParameter[] sqlParams = new SqlParameter[1];
            try
            {
                sqlParams[0] = new SqlParameter
                {
                    ParameterName = "@app_id",
                    DbType = DbType.Int32,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFLongOrDBNull(dto.app_id)
                };

                response = new MSSQLResponse()
                {
                    Data = await _sqlHelper.FetchData(new ExecuteDataSetRequest()
                    {
                        CommandText = "[protecton].[PCA_Status_getList]",
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

        public async Task<MSSQLResponse?> GetePCAList(GetePCAListRequestDto request, string user_id)
        {
            MSSQLResponse? response = null;
            SqlParameter[] sqlParams = new SqlParameter[10];
            try
            {
                sqlParams[0] = new SqlParameter
                { 
                    ParameterName = "@user_id",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(user_id)
                };
                sqlParams[1] = new SqlParameter
                {
                    ParameterName = "@depot_code",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(request.DepotCode)
                };

                sqlParams[2] = new SqlParameter
                {
                    ParameterName = "@terr_code",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(request.TerritoryCode)
                };

                sqlParams[3] = new SqlParameter
                {
                    ParameterName = "@billto_code",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(request.BillToCode)
                };

                sqlParams[4] = new SqlParameter
                {
                    ParameterName = "@dealer_code",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(request.AcctNo)
                };

                sqlParams[5] = new SqlParameter
                {
                    ParameterName = "@dealer_name",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(request.DealerName)
                };

                sqlParams[6] = new SqlParameter
                {
                    ParameterName = "@main_status",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(request.MainStatus)
                };

                sqlParams[7] = new SqlParameter
                {
                    ParameterName = "@aprv_status",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(request.ApprovedStatus)
                };

                sqlParams[8] = new SqlParameter
                {
                    ParameterName = "@sbl_code",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(request.SblCode)
                };

                sqlParams[9] = new SqlParameter
                {
                    ParameterName = "@app_id",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFIntegerOrDBNull(request.app_id)
                };

                response = new MSSQLResponse()
                {
                    Data = await _sqlHelper.FetchData(new ExecuteDataSetRequest()
                    {
                        CommandText = "[protecton].[PCA_Details_getList]",
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

        public async Task<MSSQLResponse?> GetPcaDealersList(pcaDealersRequestDto dto)
        {
            MSSQLResponse? response = null;
            SqlParameter[] sqlParams = new SqlParameter[3];
            try
            {
                sqlParams[0] = new SqlParameter
                {
                    ParameterName = "@depot_code",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(dto.depot_code)
                };

                sqlParams[1] = new SqlParameter
                {
                    ParameterName = "@terr_code",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(dto.terr_code)
                };

                sqlParams[2] = new SqlParameter
                {
                    ParameterName = "@sbl_code",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(dto.sbl_code)
                };

                response = new MSSQLResponse()
                {
                    Data = await _sqlHelper.FetchData(new ExecuteDataSetRequest()
                    {
                        CommandText = "[protecton].[PCA_Details_getDealer]",
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

        public async Task<MSSQLResponse?> GetPcaProjectListByDepotTerr(pcaProjectRequestDto dto)
        {
            MSSQLResponse? response = null;
            SqlParameter[] sqlParams = new SqlParameter[3];
            try
            {
                sqlParams[0] = new SqlParameter
                {
                    ParameterName = "@depot_code",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(dto.depot_code)
                };

                sqlParams[1] = new SqlParameter
                {
                    ParameterName = "@terr_code",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(dto.terr_code)
                };

                sqlParams[2] = new SqlParameter
                {
                    ParameterName = "@srch",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(dto.srch)
                };


                response = new MSSQLResponse()
                {
                    Data = await _sqlHelper.FetchData(new ExecuteDataSetRequest()
                    {
                        CommandText = "[protecton].[PCA_getProjectList_by_depot_terr]",
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

        public async Task<MSSQLResponse?> GetSKUList(GetSKUListRequestDto dto)
        {
            MSSQLResponse? response = null;
            SqlParameter[] sqlParams = new SqlParameter[3];
            try
            {
                sqlParams[0] = new SqlParameter
                {
                    ParameterName = "@srch_str",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(dto.PrefixText)
                };

                sqlParams[1] = new SqlParameter
                {
                    ParameterName = "@sbl_code",
                    DbType = DbType.Int32,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = 4
                };

                sqlParams[2] = new SqlParameter
                {
                    ParameterName = "@app_id",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFIntegerOrDBNull(dto.app_id)
                };

                response = new MSSQLResponse()
                {
                    Data = await _sqlHelper.FetchData(new ExecuteDataSetRequest()
                    {
                        CommandText = "[protecton].[PCA_Details_getSKU]",
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

        public async Task<MSSQLResponse?> GetPcaBillToList(GetBillToRequestDto dto)
        {
            MSSQLResponse? response = null;
            SqlParameter[] sqlParams = new SqlParameter[3];
            try
            {
                sqlParams[0] = new SqlParameter
                {
                    ParameterName = "@depot_code",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(dto.depot_code)
                };

                sqlParams[1] = new SqlParameter
                {
                    ParameterName = "@dealer_code",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(dto.dealer_code)
                };

                sqlParams[2] = new SqlParameter
                {
                    ParameterName = "@sbl_code",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = "4"
                };

                response = new MSSQLResponse()
                {
                    Data = await _sqlHelper.FetchData(new ExecuteDataSetRequest()
                    {
                        CommandText = "[protecton].[PCA_Details_getBillTo]",
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

        public async Task<MSSQLResponse?> GetFactoryListBySKU(GetFactoryRequestDto dto,string User_id)
        {
            MSSQLResponse? response = null;
            SqlParameter[] sqlParams = new SqlParameter[4];
            try
            {
                sqlParams[0] = new SqlParameter
                {
                    ParameterName = "@user_id",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = User_id
                };

                sqlParams[1] = new SqlParameter
                {
                    ParameterName = "@sku_code",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(dto.sku_code)
                };

                sqlParams[2] = new SqlParameter
                {
                    ParameterName = "@sbl_code",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = "4"
                };
                sqlParams[3] = new SqlParameter
                {
                    ParameterName = "@app_id",
                    DbType = DbType.Int32,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFIntegerOrDBNull(dto.app_id)
                };

                response = new MSSQLResponse()
                {
                    Data = await _sqlHelper.FetchData(new ExecuteDataSetRequest()
                    {
                        CommandText = "[protecton].[PCA_Details_getFactoryBySKU]",
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

        public async Task<MSSQLResponse?> GetPcaMinRateBySku_Vr1(GetMinRateBySkuRequestDto dto)
        {
            MSSQLResponse? response = null;
            SqlParameter[] sqlParams = new SqlParameter[2];
            try
            {
                sqlParams[0] = new SqlParameter
                {
                    ParameterName = "@sku_code",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = dto.sku_code
                };

                sqlParams[1] = new SqlParameter
                {
                    ParameterName = "@bill_to",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = dto.bill_to
                };

                
                response = new MSSQLResponse()
                {
                    Data = await _sqlHelper.FetchData(new ExecuteDataSetRequest()
                    {
                        CommandText = "[protecton].[PCA_Get_Min_Rate_By_SKU_Vr1]",
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


        public async Task<MSSQLResponse?> PcaDetailsGetStatus(GetPcaDetailsStatusRequestDto dto)
        {
            MSSQLResponse? response = null;
            SqlParameter[] sqlParams = new SqlParameter[3];
            try
            {
                sqlParams[0] = new SqlParameter
                {
                    ParameterName = "@billto_code",
                    DbType = DbType.Decimal,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = dto.billto_code
                };

                sqlParams[1] = new SqlParameter
                {
                    ParameterName = "@sku_code",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = dto.sku_code
                };

                sqlParams[2] = new SqlParameter
                {
                    ParameterName = "@valid_from",
                    DbType = DbType.DateTime,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = dto.valid_from
                };


                response = new MSSQLResponse()
                {
                    Data = await _sqlHelper.FetchData(new ExecuteDataSetRequest()
                    {
                        CommandText = "[protecton].[PCA_Details_getStatus_for_Portal]",
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

        public async Task<MSSQLResponse?> PcaDetailsGetDtl(GetPcaDetailsRequestDto dto, string User_id)
        {
            MSSQLResponse? response = null;
            SqlParameter[] sqlParams = new SqlParameter[6];
            try
            {
                sqlParams[0] = new SqlParameter
                {
                    ParameterName = "@billto_code",
                    DbType = DbType.Decimal,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value =  dto.billto_code
                };

                sqlParams[1] = new SqlParameter
                {
                    ParameterName = "@aprv_status",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = dto.aprv_status
                };

                sqlParams[2] = new SqlParameter
                {
                    ParameterName = "@sbl_code",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = "4"
                };

                sqlParams[3] = new SqlParameter
                {
                    ParameterName = "@app_name",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = "PROTECTON"
                };

                sqlParams[4] = new SqlParameter
                {
                    ParameterName = "@user_id",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = User_id
                };

                sqlParams[5] = new SqlParameter
                {
                    ParameterName = "@main_status",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = dto.main_status
                };


                response = new MSSQLResponse()
                {
                    Data = await _sqlHelper.FetchData(new ExecuteDataSetRequest()
                    {
                        CommandText = "[protecton].[PCA_Details_getDtls_Vr1]",
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


        public async Task<MSSQLResponse> InsertePcaDetails_Vr1(PcaInsertRequestDto request,string User_id)
        {
            MSSQLResponse? response = null;
            SqlParameter[] sqlParams = new SqlParameter[16];
            sqlParams[0] = new SqlParameter
            {
                ParameterName = "@auto_id",
                SqlDbType = SqlDbType.Decimal,
                Direction = ParameterDirection.Input,
                Size = -1,
                Value = Utils.IIFDecimalOrDBNull(request.auto_id)
            };
            sqlParams[1] = new SqlParameter
            {
                ParameterName = "@billto_code",
                SqlDbType = SqlDbType.Decimal,
                Direction = ParameterDirection.Input,
                Size = -1,
                Value = Utils.IIFDecimalOrDBNull(request.billto_code)
            };
            sqlParams[2] = new SqlParameter
            {
                ParameterName = "@sku_id",
                SqlDbType = SqlDbType.VarChar,
                Direction = ParameterDirection.Input,
                Size = -1,
                Value = Utils.IIFStringOrDBNull(request.sku_id)
            };
            sqlParams[3] = new SqlParameter
            {
                ParameterName = "@factory",
                SqlDbType = SqlDbType.VarChar,
                Direction = ParameterDirection.Input,
                Size = -1,
                Value = Utils.IIFStringOrDBNull(request.factory)
            };
            sqlParams[4] = new SqlParameter
            {
                ParameterName = "@rate",
                SqlDbType = SqlDbType.VarChar,
                Direction = ParameterDirection.Input,
                Size = -1,
                Value = Utils.IIFDecimalOrDBNull(request.rate)
            };
            sqlParams[5] = new SqlParameter
            {
                ParameterName = "@qty",
                SqlDbType = SqlDbType.VarChar,
                Direction = ParameterDirection.Input,
                Size = -1,
                Value = Utils.IIFDecimalOrDBNull(request.qty)
            };

            sqlParams[6] = new SqlParameter
            {
                ParameterName = "@valid_from",
                SqlDbType = SqlDbType.DateTime,
                Direction = ParameterDirection.Input,
                Size = -1,
                Value = Utils.IIFDateTimeOrDBNull(request.valid_from)
            };
            sqlParams[7] = new SqlParameter
            {
                ParameterName = "@valid_till",
                SqlDbType = SqlDbType.DateTime,
                Direction = ParameterDirection.Input,
                Size = -1,
                Value = Utils.IIFDateTimeOrDBNull(request.valid_till)
            };
            sqlParams[8] = new SqlParameter
            {
                ParameterName = "@status",
                SqlDbType = SqlDbType.VarChar,
                Direction = ParameterDirection.Input,
                Size = -1,
                Value = Utils.IIFStringOrDBNull(request.status)
            };
            sqlParams[9] = new SqlParameter
            {
                ParameterName = "@remarks",
                SqlDbType = SqlDbType.VarChar,
                Direction = ParameterDirection.Input,
                Size = -1,
                Value = Utils.IIFStringOrDBNull(request.remarks)
            };

            sqlParams[10] = new SqlParameter
            {
                ParameterName = "@app_name",
                SqlDbType = SqlDbType.VarChar,
                Direction = ParameterDirection.Input,
                Size = -1,
                Value = Utils.IIFStringOrDBNull(request.app_name)
            };

            sqlParams[11] = new SqlParameter
            {
                ParameterName = "@user_id",
                SqlDbType = SqlDbType.VarChar,
                Direction = ParameterDirection.Input,
                Size = -1,
                Value = User_id
            };

            sqlParams[12] = new SqlParameter
            {
                ParameterName = "@mrp",
                SqlDbType = SqlDbType.Decimal,
                Direction = ParameterDirection.Input,
                Size = -1,
                Value = Utils.IIFDecimalOrDBNull(request.mrp)
            };

            sqlParams[13] = new SqlParameter
            {
                ParameterName = "@projectid",
                SqlDbType = SqlDbType.BigInt,
                Direction = ParameterDirection.Input,
                Size = -1,
                Value = Utils.IIFLongOrDBNull(request.projectid)
            };

            sqlParams[14] = new SqlParameter
            {
                ParameterName = "@outputCode",
                SqlDbType = SqlDbType.Int,
                Direction = ParameterDirection.Output
            };
            sqlParams[15] = new SqlParameter
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
                    CommandText = "[protecton].[PCA_Details_Submit_Vr1]",
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

        public async Task<MSSQLResponse> DeletePcaDetails(DeletePCARequestDto request, string User_id)
        {
            MSSQLResponse? response = null;
            SqlParameter[] sqlParams = new SqlParameter[4];
            sqlParams[0] = new SqlParameter
            {
                ParameterName = "@auto_id",
                SqlDbType = SqlDbType.Decimal,
                Direction = ParameterDirection.Input,
                Size = -1,
                Value = Utils.IIFDecimalOrDBNull(request.auto_id)
            };
            sqlParams[1] = new SqlParameter
            {
                ParameterName = "@user_id",
                SqlDbType = SqlDbType.VarChar,
                Direction = ParameterDirection.Input,
                Size = -1,
                Value = User_id
            };

            sqlParams[2] = new SqlParameter
            {
                ParameterName = "@outputCode",
                SqlDbType = SqlDbType.Int,
                Direction = ParameterDirection.Output
            };
            sqlParams[3] = new SqlParameter
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
                    CommandText = "[protecton].[PCA_Details_delete_by_auto_id]",
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
    }
}
