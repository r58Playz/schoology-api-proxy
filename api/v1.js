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

const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, Access-Control-Allow-Origin, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
}

module.exports = allowCors(handler);
