import navData from "../../data/nav";

export default async function nav(req: any, res: any) {
  try {
    res.json(navData);
  } catch (err) {
    console.error(err);
    res.status(500);
    res.end();
  }
}
