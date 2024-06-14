namespace server.Dtos;

public class TextUpdate
{
  public string Sender { get; set; }
  public string Receiver { get; set; }
  public int CharIndex { get; set; }
  public bool IsCorrect { get; set; }
}
