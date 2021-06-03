export default async function getObjectId() {
  const res = await fetch(`/api/card/oid`);
  const result = await res.text();
  return result;
}
