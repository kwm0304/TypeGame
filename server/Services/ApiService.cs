using System.Text.Json;

namespace server.Services;

public class ApiService
{
  private readonly HttpClient _http;

  public ApiService(HttpClient http)
  {
    _http = http;
  }

  public async Task<T> GetTextAsync<T>()
  {
    string url = "https://baconipsum.com/api/?type=all-meat&sentences=2&format=text";
    try
    {
      var response = await _http.GetAsync(url);
      response.EnsureSuccessStatusCode();
      var content = await response.Content.ReadAsStringAsync();
      return JsonSerializer.Deserialize<T>(content);
    }
    catch (Exception ex)
    {
      Console.WriteLine(ex.Message);
      return default;
    }
  }
}