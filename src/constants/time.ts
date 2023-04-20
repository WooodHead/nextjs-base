export enum Time {
  Second = 1000,
  Minute = Time.Second * 60,
  Hour = Time.Minute * 60,
  Day = Time.Hour * 24,
}

export const JWT_MAX_AGE = 30 * 24 * 60 * 60; // 30 days
