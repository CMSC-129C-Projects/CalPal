import ObjectID from "../../../node_modules/bson-objectid";

export default function getObjectId() {
  const result = new ObjectID();
  return result.toHexString();
}
