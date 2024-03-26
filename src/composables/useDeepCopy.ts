export function useDeepCopy(obj: any) {
  return JSON.parse(JSON.stringify(obj))
}