import slugify from "slugify";

export function createSlug(title) {
  let sb = title.replace(/[^a-zA-Z0-9\s]/g, "");
  sb = sb.replace(/\s{2,}/g, " ");
  sb = slugify(sb).toLowerCase();
  return sb;
}
