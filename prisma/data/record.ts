interface IRecord {
  start: Date
  end: Date
}

export const records: IRecord[] = [
  { start: new Date(2024, 8, 12), end: new Date(2024, 8, 18) },
  { start: new Date(2024, 8, 19), end: new Date(2024, 8, 25) },
  { start: new Date(2024, 8, 26), end: new Date(2024, 9, 1) },
]
