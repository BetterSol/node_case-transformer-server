const http = require('http');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const requestedUrl = req.url.slice(1);

    const textToConvert = requestedUrl.split('?')[0];
    let queryString = '';

    if (requestedUrl.split('?').length > 1) {
      queryString = requestedUrl.split('?')[1];
    }

    const params = new URLSearchParams(queryString);

    if (params.getAll('toCase').length !== 1) {
      res.setHeader('Content-Type', 'application/json');

      res.statusCode = 400;

      const errorMessage = {
        errors: [
          {
            message: '"toCase" query param is required.'
              + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>"',
          },
        ],
      };

      res.end(JSON.stringify(errorMessage));

      return;
    };

    const toCase = params.get('toCase');

    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 200;

    res.write(textToConvert);
    res.write('\n');
    res.write(toCase);

    res.end();
  });

  return server;
};

module.exports = {
  createServer,
};
