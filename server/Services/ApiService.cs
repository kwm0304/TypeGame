using System.Text.Json;
using server.Interfaces;

namespace server.Services;

public class ApiService : IApiService
{
  private readonly HttpClient _http;

  public ApiService(HttpClient http)
  {
    _http = http;
  }

  public async Task<string> GetTextAsync()
  {
    string url = "https://baconipsum.com/api/?type=all-meat&sentences=5&format=text";
    try
    {
      var response = await _http.GetAsync(url);
      response.EnsureSuccessStatusCode();
      var content = await response.Content.ReadAsStringAsync();
      Console.WriteLine(content);
      return content;
    }
    catch (Exception ex)
    {
      Console.WriteLine(ex.Message);
      return default;
    }
  }
}