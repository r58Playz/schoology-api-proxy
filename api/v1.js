import fetch from "node-fetch";

const handler = async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  const { apiAddress } = req.query;

  let url = `https://api.schoology.com/v1/${apiAddress}`;

  try {
    //console.log("req.headers " + req.headers["Authorization"]);
    console.log("req.getHeaders() " + request.getHeader("Authorization"));
    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
        Authorization: req.headers["Authorization"],
      },
    });

    if (!response.ok) {
      res.status(response.status).json(response.statusText);
      return;
    }
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

export default handler;
