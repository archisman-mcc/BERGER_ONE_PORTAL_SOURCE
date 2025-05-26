namespace BERGER_ONE_PORTAL_API.Dtos.RequestDto.Protecton
{
    public class UserTrackingRequestDto
    {
        public string asOnDate { get; set; }
        public string repType { get; set; }
        public string SelectedUser { get; set; }
    }

    public class DSRRegionCatRequestDto
    {
        public string asOnDate { get; set; }
        public string repType { get; set; }
        public string SelectedUser { get; set; }
        public string regn { get; set; }
    }

    public class GetHistoryRequestDto
    {
        public string UserId { get; set; }
        public string Date { get; set; }
    }

    public class UserCollectionListRequestDto
    {
        public string SelectedUser { get; set; }
        public string asOnDate { get; set; }
    }
    public class GetVisitHistoryUserwiseRequestDto
    {
        public string SelectedUser { get; set; }
        public string asOnDate { get; set; }
    }
    public class GetVisitHistoryLocationRequestDto
    {
        public string SelectedUser { get; set; }
        public string asOnDate { get; set; }
    }
}
