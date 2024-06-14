namespace server.Dtos;

public class GameRequestDto
{
  public string? From { get; set; }
  public string? To { get; set; }
  public string? Content { get; set; }
}

public class PrivateTextUpdateDto
{
  public string? From { get; set; }
  public string? To { get; set; }
  public bool IsCorrect { get; set; }
  public int Index { get; set; }
}