import { CollectionConfig } from "payload";
import { USERS_SLUG } from "../constants";

const Users: CollectionConfig = {
  slug: USERS_SLUG,
  auth: true,
  fields: [],
} as const;

export default Users;
