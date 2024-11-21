using System;
using MongoDB.Bson.Serialization.Attributes;

namespace assets_rebalance_backend.src.Domain;

public class Entity
{
    [BsonId]
    public Guid Id { get; set; } = Guid.NewGuid();
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime? UpdatedAt { get; set; }
    public bool Enabled { get; set; } = true;
    public DateTime? DisabledAt { get; set; }
}
