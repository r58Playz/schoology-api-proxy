const fetch = require('node-fetch');

const handler = async (req, res) => {
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

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default handler;
