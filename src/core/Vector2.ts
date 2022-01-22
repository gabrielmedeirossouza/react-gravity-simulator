export interface IVector2 {
  x: number;
  y: number;
}

export class Vector2 {
  public x: number;

  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public static up(): Vector2 {
    return new Vector2(0, -1);
  }

  public static down(): Vector2 {
    return new Vector2(0, 1);
  }

  public static left(): Vector2 {
    return new Vector2(-1, 0);
  }

  public static right(): Vector2 {
    return new Vector2(1, 0);
  }

  public magnitude(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  public normalize(): Vector2 {
    const magnitude = this.magnitude();
    return new Vector2(this.x / magnitude, this.y / magnitude);
  }
}
