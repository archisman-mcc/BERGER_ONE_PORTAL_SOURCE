using BERGER_ONE_PORTAL_API.Core;
using Newtonsoft.Json;
using System.Net;
using System.Net.Http.Headers;
namespace BERGER_ONE_PORTAL_API.Foundation;

public class HttpHelper
{
    private HttpClient? _client;
    private readonly IHttpClientFactory _clientFactory;
    private readonly IServiceContext _serviceContext;
    private readonly ILogger<HttpHelper> _logger;

    public HttpHelper(IHttpClientFactory clientFactory, IServiceContext serviceContext, ILogger<HttpHelper> logger)
    {
        ServicePointManager.SecurityProtocol |= SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls; //Global Scope
        _clientFactory = clientFactory;
        _serviceContext = serviceContext;
        _logger = logger;
    }

    private void CreateLogData(string? httpClientName, string? requestUri, string? payload)
    {
        try
        {
            _logger.LogTrace("QuickOrderUtility " + "Env: " + _serviceContext.CurrentEnvironment.EnvironmentName, string.Concat("ClientName: ", httpClientName, " , Url: ", requestUri, " , Data: ", payload));
        }
        catch (Exception)
        {

        }
    }

    public async Task<HttpResponseMessage> SendAsync(string httpClientName, HttpMethod method, string requestUri, MediaTypeHeaderValue contentType, Dictionary<string, string>? headers = null, Dictionary<string, string>? queryParams = null, HttpContent? content = null)
    {
        _client = _clientFactory.CreateClient(httpClientName);
        _client.Timeout = TimeSpan.FromSeconds(_serviceContext.RequestTimeout);

        var request = new HttpRequestMessage
        {
            Method = method,
            RequestUri = CreateRequestUri(requestUri, queryParams)
        };

        if (request.Content != null)
        {
            request.Content.Headers.ContentType = contentType;
        }

        // Add headers
        if (headers != null)
        {
            foreach (var header in headers)
            {
                request.Headers.Add(header.Key, header.Value);
            }
        }

        // Add content
        request.Content = content;

        CreateLogData(httpClientName, CreateRequestUri(requestUri, queryParams).ToString(), content?.ReadAsStringAsync()?.Result);
        return await _client.SendAsync(request);
    }

    private Uri CreateRequestUri(string requestUri, Dictionary<string, string>? queryParams)
    {
        var uriBuilder = new UriBuilder(requestUri);

        // Add query parameters
        if (queryParams != null)
        {
            var query = string.Join("&", queryParams.Select(kvp => $"{kvp.Key}={kvp.Value}"));
            uriBuilder.Query = query;
        }

        return uriBuilder.Uri;
    }

    public async Task<HttpResponseMessage> GetAsync(string httpClientName, string requestUri, MediaTypeHeaderValue contentType, Dictionary<string, string>? headers = null, Dictionary<string, string>? queryParams = null)
    {
        _client = _clientFactory.CreateClient(httpClientName);
        _client.Timeout = TimeSpan.FromSeconds(_serviceContext.RequestTimeout);

        var request = new HttpRequestMessage
        {
            Method = HttpMethod.Get,
            RequestUri = CreateRequestUri(requestUri, queryParams)
        };

        if (request.Content != null)
        {
            request.Content.Headers.ContentType = contentType;
        }

        // Add headers
        if (headers != null)
        {
            foreach (var header in headers)
            {
                request.Headers.Add(header.Key, header.Value);
            }
        }

        CreateLogData(httpClientName, CreateRequestUri(requestUri, queryParams).ToString(), JsonConvert.SerializeObject(queryParams));

        return await _client.SendAsync(request);
    }

    public async Task<HttpResponseMessage> PostAsync(string httpClientName, string requestUri, MediaTypeHeaderValue contentType, Dictionary<string, string>? headers = null, Dictionary<string, string>? queryParams = null, HttpContent? content = null)
    {
        _client = _clientFactory.CreateClient(httpClientName);
        _client.Timeout = TimeSpan.FromSeconds(_serviceContext.RequestTimeout);

        var request = new HttpRequestMessage
        {
            Method = HttpMethod.Post,
            RequestUri = CreateRequestUri(requestUri, queryParams)
        };

        if (request.Content != null)
        {
            request.Content.Headers.ContentType = contentType;
        }

        // Add headers
        (headers ?? new Dictionary<string, string>()).ToList().ForEach(header =>
        {
            request.Headers.Add(header.Key, header.Value);
        });

        // Add content
        request.Content = content;

        CreateLogData(httpClientName, CreateRequestUri(requestUri, queryParams).ToString(), content?.ReadAsStringAsync()?.Result);

        return await _client.SendAsync(request).ConfigureAwait(false);
    }

    public async Task<HttpResponseMessage> PutAsync(string httpClientName, string requestUri, MediaTypeHeaderValue contentType, Dictionary<string, string>? headers = null, Dictionary<string, string>? queryParams = null, HttpContent? content = null)
    {
        _client = _clientFactory.CreateClient(httpClientName);
        _client.Timeout = TimeSpan.FromSeconds(_serviceContext.RequestTimeout);

        var request = new HttpRequestMessage
        {
            Method = HttpMethod.Put,
            RequestUri = CreateRequestUri(requestUri, queryParams)
        };

        if (request.Content != null)
        {
            request.Content.Headers.ContentType = contentType;
        }

        // Add headers
        if (headers != null)
        {
            foreach (var header in headers)
            {
                request.Headers.Add(header.Key, header.Value);
            }
        }

        // Add content
        request.Content = content;

        CreateLogData(httpClientName, CreateRequestUri(requestUri, queryParams).ToString(), content?.ReadAsStringAsync()?.Result);

        return await _client.SendAsync(request);
    }

    public async Task<HttpResponseMessage> DeleteAsync(string httpClientName, string requestUri, MediaTypeHeaderValue contentType, Dictionary<string, string>? headers = null, Dictionary<string, string>? queryParams = null, HttpContent? content = null)
    {
        _client = _clientFactory.CreateClient(httpClientName);
        _client.Timeout = TimeSpan.FromSeconds(_serviceContext.RequestTimeout);

        var request = new HttpRequestMessage
        {
            Method = HttpMethod.Delete,
            RequestUri = CreateRequestUri(requestUri, queryParams)
        };

        if (request.Content != null)
        {
            request.Content.Headers.ContentType = contentType;
        }

        // Add headers
        if (headers != null)
        {
            foreach (var header in headers)
            {
                request.Headers.Add(header.Key, header.Value);
            }
        }

        // Add content
        request.Content = content;

        CreateLogData(httpClientName, CreateRequestUri(requestUri, queryParams).ToString(), content?.ReadAsStringAsync()?.Result);

        return await _client.SendAsync(request);
    }
}