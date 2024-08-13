using BERGER_ONE_PORTAL_API.Dtos.RequestDto.Protecton;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto;

namespace BERGER_ONE_PORTAL_API.Repository.Protecton
{
    public interface IEpcaRepo
    {
        Task<MSSQLResponse?> GetPcaStatusList(pcaStatusRequestDto dto);
        Task<MSSQLResponse?> GetePCAList(GetePCAListRequestDto request, string user_id);
        Task<MSSQLResponse?> GetPcaDealersList(pcaDealersRequestDto dto);
        Task<MSSQLResponse?> GetPcaProjectListByDepotTerr(pcaProjectRequestDto dto);
        Task<MSSQLResponse?> GetSKUList(GetSKUListRequestDto dto);
        Task<MSSQLResponse?> GetPcaBillToList(GetBillToRequestDto dto);
        Task<MSSQLResponse?> GetFactoryListBySKU(GetFactoryRequestDto dto, string User_id);
    }
}
