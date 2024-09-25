using System.Net.Http.Headers;

namespace BERGER_ONE_PORTAL_API.Foundation;

public interface IHttpHelper
{
    Task<HttpResponseMessage> SendAsync(string httpClientName, HttpMethod method, string requestUri, MediaTypeHeaderValue contentType, Dictionary<string, string>? headers, Dictionary<string, string>? queryParams, HttpContent? content);
    Task<HttpResponseMessage> GetAsync(string httpClientName, string requestUri, MediaTypeHeaderValue contentType, Dictionary<string, string>? headers, Dictionary<string, string>? queryParams);
    Task<HttpResponseMessage> PostAsync(string httpClientName, string requestUri, MediaTypeHeaderValue contentType, Dictionary<string, string>? headers, Dictionary<string, string>? queryParams, HttpContent? content);
    Task<HttpResponseMessage> PutAsync(string httpClientName, string requestUri, MediaTypeHeaderValue contentType, Dictionary<string, string>? headers, Dictionary<string, string>? queryParams, HttpContent? content);
    Task<HttpResponseMessage> DeleteAsync(string httpClientName, string requestUri, MediaTypeHeaderValue contentType, Dictionary<string, string>? headers, Dictionary<string, string>? queryParams, HttpContent? content);
}