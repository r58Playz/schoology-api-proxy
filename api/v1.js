import fetch from "node-fetch";

const handler = async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  const { apiAddress } = req.query;

  let url = `https://api.schoology.com/v1/${apiAddress}`;

  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
        Authorization: req.headers["Authorization"],
      },
    });

    if (!response.ok) {
      res.status(response.status).json(response.statusText);
    }
    const data = await response.json();

    res.status(200).end(data);
  } catch (error) {
    res.status(500).end(error);
  }
};

export default handler;
