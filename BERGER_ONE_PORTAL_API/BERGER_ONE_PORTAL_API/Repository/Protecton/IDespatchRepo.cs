using BERGER_ONE_PORTAL_API.Dtos.RequestDto.Protecton;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto;

namespace BERGER_ONE_PORTAL_API.Repository.Protecton
{
    public interface IDespatchRepo
    {
        Task<MSSQLResponse?> GetDespatchDetails(DespatchDetailsRequestDto? request, string user_id);
    }
}
