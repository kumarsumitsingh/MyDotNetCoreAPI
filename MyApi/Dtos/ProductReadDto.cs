namespace MyApi.Dtos
{
    public class ProductReadDto
    {
        public int Id { get; set; }             // only what you expose
        public string Name { get; set; } = null!;
        public decimal Price { get; set; }
    }
}
