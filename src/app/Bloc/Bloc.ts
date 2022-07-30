import ShortUniqueId from "short-unique-id";


export function GenApplicationID() {
  let uId = new ShortUniqueId({length:10});

  return `HL-${uId.randomUUID()}`;
}
