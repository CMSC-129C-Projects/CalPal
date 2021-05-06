export default async function getObjectId() {
  const res = await fetch(`cards/new-oid.json`);
  const result = await res.json();
  return result.new_object_id;
}
