using System.ComponentModel.DataAnnotations;
using System.Data;
using BERGER_ONE_PORTAL_API.CustomAttribute;
using Newtonsoft.Json;

namespace BERGER_ONE_PORTAL_API.Dtos.RequestDto.Protecton
{
    public class EpcaRequestDto
    {

    }

    public class pcaStatusRequestDto
    {
        [Required]
        public long? app_id { get; set; }
    }

    public class pcaDealersRequestDto
    {
        [Required]
        public string? depot_code { get; set; }
        public string? terr_code { get; set; }
        public string? sbl_code { get; set; }
    }

    public class pcaProjectRequestDto
    {
        [Required]
        public string? depot_code { get; set; }
        public string? terr_code { get; set; }
        public string? srch { get; set; }
    }

    public class GetSKUListRequestDto
    {
        public int app_id { get; set; }
        [Required]
        public string? PrefixText { get; set; }

    }

    public class GetBillToRequestDto
    {
        public string? depot_code { get; set; }
        public string? terr_code { get; set; }
        public string? dealer_code { get; set; }
        public string? sbl_code { get; set; }
        public string? pd_appl_yn { get; set; }
    }

    public class GetMinRateBySkuRequestDto
    {
        public string? sku_code { get; set; }
        public string? bill_to { get; set; }

    }

    public class GetPcaDetailsStatusRequestDto
    {
        public Decimal? billto_code { get; set; }
        public string? sku_code { get; set; }
        public DateTime? valid_from { get; set; }

    }

    public class GetPcaDetailsRequestDto
    {
        public Decimal? billto_code { get; set; }
        public string? aprv_status { get; set; }
        public string? main_status { get; set; }

    }

    public class PcaCancellationRequestDto
    {
        public int app_id { get; set; }
        public string? DepotCode { get; set; }
        public string? TerrCode { get; set; }
        public string? BilltoCode { get; set; }
        public string? DealerCode { get; set; }
        public string DealerName { get; set; } = "";
        public string? AprvStatus { get; set; }
        public string? MainStatus { get; set; }
        public string? frm_date { get; set; }
        public string? to_date { get; set; }
        public int? PageNumber { get; set; }
        public int? PageSize { get; set; }

    }

    public class CanclePcaRequestDto
    {
        public Decimal auto_id { get; set; }

    }

    public class GetFactoryRequestDto
    {
        public string? sku_code { get; set; }
        public int? app_id { get; set; }

    }

    public class DeletePCARequestDto
    {
        public Decimal? auto_id { get; set; }

    }

    public class TlvStatusRequestDto
    {
        public string? status { get; set; }
        public string? type { get; set; }

    }

    public class TlvRSMApprovalRequestDto
    {
        public string? DepotCode { get; set; }  
        public string? TerrCode { get; set; }   
        public string? BillToCode { get; set; } 
        public string? DealerCode { get; set; } 
        public string? DealerName { get; set; } 
        public string? MainStatus { get; set; } 
        public string? AprvStatus { get; set; } 
    }

    public class TlvTermDetailsRequestDto
    {
        public string? DepotCode { get; set; }
        public string? BillToCode { get; set; }
    }

    public class TlvRevisionLogRequestDto
    {
        public string? auto_id { get; set; }
    }

    public class TlvApprovalRequestDto
    {
        public string? tlv_id { get; set; }
        public string? approval_status { get; set; }
        public string? remarks { get; set; }
        public string? term_id { get; set; }
        public string? Proposed_tlv { get; set; }
        public string? proposed_credit_days { get; set; }
    }


    public class GetePCAListRequestDto
    {
        public int app_id { get; set; }
        public string? DepotCode { get; set; }
        public string? TerritoryCode { get; set; }
        public string? BillToCode { get; set; }
        public string? AcctNo { get; set; }
        public string? DealerName { get; set; }
        public string? SblCode { get; set; }
        public string? ApprovedStatus { get; set; }
        public string? MainStatus { get; set; }
    }

    public class GetePCADepotApprovalListRequestDto
    {
        public string? DepotCode { get; set; }
        public string? TerritoryCode { get; set; }
        public string? BillToCode { get; set; }
        public string? DealerCode { get; set; }
        public string? DealerName { get; set; }
        public string? SblCode { get; set; }
        public string? ApprovedStatus { get; set; }
        public string? MainStatus { get; set; }
    }

    public class GetePCADepotApprovalDetailsRequestDto
    {
        public string? DepotCode { get; set; }
        public string? TerritoryCode { get; set; }
        public string? BillToCode { get; set; }
        public string? DealerCode { get; set; }
        public string? DealerName { get; set; }
        public string? SblCode { get; set; }
        public string? ApprovedStatus { get; set; }
        public string? MainStatus { get; set; }
    }

    public class ePCADetailsViewRequestDto
    {
        public string? SkuCode { get; set; }
        public string? AutoId { get; set; }
    }

    public class PcaInsertRequestDto
    {
        public decimal? auto_id { get; set; }
        public decimal? billto_code { get; set; }
        public string? sku_id { get; set; }
        public string? factory { get; set; }
        public decimal? rate { get; set; }
        public int? qty { get; set; }
        public DateTime? valid_from { get; set; }
        public DateTime? valid_till { get; set; }
        public string? status { get; set; }
        public string? remarks { get; set; }
        public string? app_name { get; set; }
        public string? user_id { get; set; }
        public decimal? mrp { get; set; }
        public long? projectid { get; set; }
        public string? project_appl_yn { get; set; }
        public string? end_client_name { get; set; }
        public string? project_name { get; set; }
        public string? project_type { get; set; }
    }

    public class PcaApprovalInsertRequestDto
    {
        public List<PcaApprovalRequestModel>? Pca_Request_Dtl_List { get; set; }
    }

    public class PcaApprovalRequestModel
    {
        public long AutoId { get; set; }
        public long BillTo { get; set; }
        public string SkuCode { get; set; }
        public string FactoryCode { get; set; }
        public int Nop { get; set; }
        public decimal RatePerPack { get; set; }
        public DateTime ValidFrom { get; set; }
        public DateTime ValidTill { get; set; }
        public string CurrentStatus { get; set; }
        public string RejectionRemarks { get; set; }
    }

    public class PcaGpGcRateRequestDto
    {
        public string? SkuCode { get; set; }
        public string? MonthYr { get; set; }
        public string? YrMonthWAV { get; set; }
        public string? OrgCode { get; set; }
    }

    public class PcaHoApprovalInsertRequestDto
    {
        public List<PcaHoApprovalRequestModel>? Pca_Request_Dtl_List { get; set; }
    }

    public class PcaHoApprovalRequestModel
    {
        public long AutoId { get; set; }
        public long BillTo { get; set; }
        public string SkuCode { get; set; }
        public string FactoryCode { get; set; }
        public int Nop { get; set; }
        public decimal RatePerPack { get; set; }
        public DateTime ValidFrom { get; set; }
        public DateTime ValidTill { get; set; }
        public string CurrentStatus { get; set; }
        public string RejectionRemarks { get; set; }

        public string LpoYrMonth { get; set; }
        public decimal LpoMaterialCost { get; set; }
        public decimal LpoPackingCost { get; set; }
        public decimal LpoFreightCost { get; set; }
        public string WavYrMonth { get; set; }
        public decimal WavMaterialCost { get; set; }
        public decimal WavPackingCost { get; set; }
        public decimal WavOverheadCost { get; set; }
        public decimal WavFreightCost { get; set; }
    }


    public class TlvDetailsSubmitRequestDto
    {
        private string? _depotCode;
        private decimal? _proposedTlv;
        private string? _fullName;
        private string? _aadharNo;
        private string? _aadharDoc;
        private string? _panNo;
        private string? _panDoc;
        private string? _increaseReason;
        private string? _customerName;
        private decimal? _orderVol;
        private decimal? _orderVal;
        private string? _lcbgApplYn;
        private DateTime? _lcbgOpeningDate;
        private DateTime? _lcbgExpiryDate;
        private decimal? _lcbgAmount;
        private string? _lcbgDoc;
        private DateTime? _osCollectionDate1;
        private DateTime? _osCollectionDate2;
        private DateTime? _osCollectionDate3;
        private DateTime? _osCollectionDate4;
        private DateTime? _osCollectionDate5;
        private DateTime? _osCollectionDate6;
        private DateTime? _osCollectionDate7;
        private string? _status;
        private string? _remarks;
        private string? _appName;
        private string? _userId;
        private string? _dealerCode;
        private string? _chequeNo;
        private string? _chequeDoc;
        private decimal? _collectionAmount1;
        private decimal? _collectionAmount2;
        private decimal? _collectionAmount3;
        private decimal? _collectionAmount4;
        private decimal? _collectionAmount5;
        private decimal? _collectionAmount6;
        private decimal? _collectionAmount7;
        private string? _ifscCode;
        private string? _bankName;
        private string? _branchName;
        private string? _chequeStatus;
        private decimal? _billtoCode;
        private decimal? _proposedCrDays;
        private string? _submissionType;
        private string? _fileDoc;

        [CustomSqlParameterName("@depot_code")]
        public string? DepotCode
        {
            get => _depotCode;
            set => _depotCode = (value ?? "").Trim() == "" ? null : value;
        }

        [CustomSqlParameterName("@dealer_code")]
        public string? DealerCode
        {
            get => _dealerCode;
            set => _dealerCode = (value ?? "").Trim() == "" ? null : value;
        }

        [CustomSqlParameterName("@full_name")]
        public string? FullName
        {
            get => _fullName;
            set => _fullName = (value ?? "").Trim() == "" ? null : value;
        }

        [CustomSqlParameterName("@aadhar_no")]
        public string? AadharNo
        {
            get => _aadharNo;
            set => _aadharNo = (value ?? "").Trim() == "" ? null : value;
        }

        [CustomSqlParameterName("@aadhar_doc")]
        public string? AadharDoc
        {
            get => _aadharDoc;
            set => _aadharDoc = (value ?? "").Trim() == "" ? null : value;
        }

        [CustomSqlParameterName("@pan_no")]
        public string? PanNo
        {
            get => _panNo;
            set => _panNo = (value ?? "").Trim() == "" ? null : value;
        }

        [CustomSqlParameterName("@pan_doc")]
        public string? PanDoc
        {
            get => _panDoc;
            set => _panDoc = (value ?? "").Trim() == "" ? null : value;
        }

        [CustomSqlParameterName("@increase_reason")]
        public string? IncreaseReason
        {
            get => _increaseReason;
            set => _increaseReason = (value ?? "").Trim() == "" ? null : value;
        }

        [CustomSqlParameterName("@customer_name")]
        public string? CustomerName
        {
            get => _customerName;
            set => _customerName = (value ?? "").Trim() == "" ? null : value;
        }

        [CustomSqlParameterName("@lcbg_appl_yn")]
        public string? LcbgApplYn
        {
            get => _lcbgApplYn;
            set => _lcbgApplYn = (value ?? "").Trim() == "" ? null : value;
        }

        [CustomSqlParameterName("@lcbg_doc")]
        public string? LcbgDoc
        {
            get => _lcbgDoc;
            set => _lcbgDoc = (value ?? "").Trim() == "" ? null : value;
        }

        [CustomSqlParameterName("@td_blank_chq_no")]
        public string? ChequeNo
        {
            get => _chequeNo;
            set => _chequeNo = (value ?? "").Trim() == "" ? null : value;
        }

        [CustomSqlParameterName("@td_ifsc_code")]
        public string? IfscCode
        {
            get => _ifscCode;
            set => _ifscCode = (value ?? "").Trim() == "" ? null : value;
        }

        [CustomSqlParameterName("@td_bank_name")]
        public string? BankName
        {
            get => _bankName;
            set => _bankName = (value ?? "").Trim() == "" ? null : value;
        }

        [CustomSqlParameterName("@td_branch_name")]
        public string? BranchName
        {
            get => _branchName;
            set => _branchName = (value ?? "").Trim() == "" ? null : value;
        }

        [CustomSqlParameterName("@td_blank_chq_doc")]
        public string? ChequeDoc
        {
            get => _chequeDoc;
            set => _chequeDoc = (value ?? "").Trim() == "" ? null : value;
        }

        [CustomSqlParameterName("@td_blank_chq_status")]
        public string? ChequeStatus
        {
            get => _chequeStatus;
            set => _chequeStatus = (value ?? "").Trim() == "" ? null : value;
        }

        [CustomSqlParameterName("@status")]
        public string? Status
        {
            get => _status;
            set => _status = (value ?? "").Trim() == "" ? null : value;
        }

        [CustomSqlParameterName("@remarks")]
        public string? Remarks
        {
            get => _remarks;
            set => _remarks = (value ?? "").Trim() == "" ? null : value;
        }

        [CustomSqlParameterName("@submission_type")]
        public string? SubmissionType
        {
            get => _submissionType;
            set => _submissionType = (value ?? "").Trim() == "" ? null : value;
        }

        [CustomSqlParameterName("@app_name"), JsonIgnore]
        public string? AppName
        {
            get => _appName;
            set => _appName = (value ?? "").Trim() == "" ? null : value;
        }

        [JsonIgnore]
        [CustomSqlParameterName("@user_id")]
        public string? UserId
        {
            get => _userId;
            set => _userId = (value ?? "").Trim() == "" ? null : value;
        }

        [CustomSqlParameterName("@file_doc")]
        public string? FileDoc
        {
            get => _fileDoc;
            set => _fileDoc = (value ?? "").Trim() == "" ? null : value;
        }

        [CustomSqlParameterName("@billto_code")]
        public decimal? BilltoCode
        {
            get => _billtoCode;
            set => _billtoCode = (value ?? decimal.MinValue) == decimal.MinValue ? null : value;
        }

        [CustomSqlParameterName("@proposed_cr_days")]
        public decimal? ProposedCrDays
        {
            get => _proposedCrDays;
            set => _proposedCrDays =
                (value ?? decimal.MinValue) == decimal.MinValue || _billtoCode == null ? null : value;
        }

        [CustomSqlParameterName("@proposed_tlv")]
        public decimal? ProposedTlv
        {
            get => _proposedTlv;
            set => _proposedTlv = (value ?? decimal.MinValue) == decimal.MinValue ? null : value;
        }

        [CustomSqlParameterName("@order_vol")]
        public decimal? OrderVol
        {
            get => _orderVol;
            set => _orderVol = (value ?? decimal.MinValue) == decimal.MinValue ? null : value;
        }

        [CustomSqlParameterName("@order_val")]
        public decimal? OrderVal
        {
            get => _orderVal;
            set => _orderVal = (value ?? decimal.MinValue) == decimal.MinValue ? null : value;
        }

        [CustomSqlParameterName("@lcbg_amount")]
        public decimal? LcbgAmount
        {
            get => _lcbgAmount;
            set => _lcbgAmount = (value ?? decimal.MinValue) == decimal.MinValue ? null : value;
        }

        [CustomSqlParameterName("@os_collection_amount1")]
        public decimal? CollectionAmount1
        {
            get => _collectionAmount1;
            set => _collectionAmount1 = (value ?? decimal.MinValue) == decimal.MinValue ? null : value;
        }

        [CustomSqlParameterName("@os_collection_amount2")]
        public decimal? CollectionAmount2
        {
            get => _collectionAmount2;
            set => _collectionAmount2 = (value ?? decimal.MinValue) == decimal.MinValue ? null : value;
        }

        [CustomSqlParameterName("@os_collection_amount3")]
        public decimal? CollectionAmount3
        {
            get => _collectionAmount3;
            set => _collectionAmount3 = (value ?? decimal.MinValue) == decimal.MinValue ? null : value;
        }

        [CustomSqlParameterName("@os_collection_amount4")]
        public decimal? CollectionAmount4
        {
            get => _collectionAmount4;
            set => _collectionAmount4 = (value ?? decimal.MinValue) == decimal.MinValue ? null : value;
        }

        [CustomSqlParameterName("@os_collection_amount5")]
        public decimal? CollectionAmount5
        {
            get => _collectionAmount5;
            set => _collectionAmount5 = (value ?? decimal.MinValue) == decimal.MinValue ? null : value;
        }

        [CustomSqlParameterName("@os_collection_amount6")]
        public decimal? CollectionAmount6
        {
            get => _collectionAmount6;
            set => _collectionAmount6 = (value ?? decimal.MinValue) == decimal.MinValue ? null : value;
        }

        [CustomSqlParameterName("@os_collection_amount7")]
        public decimal? CollectionAmount7
        {
            get => _collectionAmount7;
            set => _collectionAmount7 = (value ?? decimal.MinValue) == decimal.MinValue ? null : value;
        }

        [CustomSqlParameterName("@lcbg_opening_date")]
        public DateTime? LcbgOpeningDate
        {
            get => _lcbgOpeningDate;
            set => _lcbgOpeningDate = (value ?? DateTime.MinValue) == DateTime.MinValue ? null : value;
        }

        [CustomSqlParameterName("@lcbg_expiry_date")]
        public DateTime? LcbgExpiryDate
        {
            get => _lcbgExpiryDate;
            set => _lcbgExpiryDate = (value ?? DateTime.MinValue) == DateTime.MinValue ? null : value;
        }

        [CustomSqlParameterName("@os_collection_date1")]
        public DateTime? OsCollectionDate1
        {
            get => _osCollectionDate1;
            set => _osCollectionDate1 = (value ?? DateTime.MinValue) == DateTime.MinValue ? null : value;
        }

        [CustomSqlParameterName("@os_collection_date2")]
        public DateTime? OsCollectionDate2
        {
            get => _osCollectionDate2;
            set => _osCollectionDate2 = (value ?? DateTime.MinValue) == DateTime.MinValue ? null : value;
        }

        [CustomSqlParameterName("@os_collection_date3")]
        public DateTime? OsCollectionDate3
        {
            get => _osCollectionDate3;
            set => _osCollectionDate3 = (value ?? DateTime.MinValue) == DateTime.MinValue ? null : value;
        }

        [CustomSqlParameterName("@os_collection_date4")]
        public DateTime? OsCollectionDate4
        {
            get => _osCollectionDate4;
            set => _osCollectionDate4 = (value ?? DateTime.MinValue) == DateTime.MinValue ? null : value;
        }

        [CustomSqlParameterName("@os_collection_date5")]
        public DateTime? OsCollectionDate5
        {
            get => _osCollectionDate5;
            set => _osCollectionDate5 = (value ?? DateTime.MinValue) == DateTime.MinValue ? null : value;
        }

        [CustomSqlParameterName("@os_collection_date6")]
        public DateTime? OsCollectionDate6
        {
            get => _osCollectionDate6;
            set => _osCollectionDate6 = (value ?? DateTime.MinValue) == DateTime.MinValue ? null : value;
        }

        [CustomSqlParameterName("@os_collection_date7")]
        public DateTime? OsCollectionDate7
        {
            get => _osCollectionDate7;
            set => _osCollectionDate7 = (value ?? DateTime.MinValue) == DateTime.MinValue ? null : value;
        }

        [CustomSqlParameterName("@auto_id")]
        [CustomSqlParameterDirection(ParameterDirection.Output)]
        [CustomSqlParameterType(DbType.Decimal)]
        [JsonIgnore]
        public decimal? AutoId { get; set; }

        [CustomSqlParameterName("@outputCode")]
        [CustomSqlParameterDirection(ParameterDirection.Output)]
        [JsonIgnore]
        public long? OutputCode { get; set; }

        [CustomSqlParameterName("@outputMsg")]
        [CustomSqlParameterDirection(ParameterDirection.Output)]
        [JsonIgnore]
        public string? OutputMsg { get; set; }
    }

    public class GeteTlvDetailsRequestDto
    {
        public int auto_id { get; set; }
        public string? DepotCode { get; set; }
        public string? BillToCode { get; set; }
        public string? DealerCode { get; set; }
        public string? SblCode { get; set; }
        public string? SubmissionType { get; set; }
        public string? AppName { get; set; }
    }
}
