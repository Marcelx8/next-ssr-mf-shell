const page = import("../../real-pages/api/nav");

export default async (req: any, res: any) => {
  return (await page).default(req, res);
};
