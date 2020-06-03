/* eslint-disable camelcase */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'

export default async (req, res) => {
    console.log(req.query)
    const { data: { access_token } } = await fetchAuth(req)
    res.statusCode = 200
    res.writeHead(302, {
        Location: `/auth?access_token=${access_token}`,
    })
    res.end()
}

async function fetchAuth(req) {
    return axios.post('https://github.com/login/oauth/access_token', {
        client_id: '109ecf07022e6ce12f4e',
        client_secret: '548b4f28facb78ce2eca6428bb3c377e23b66194',
        code: req.query.code,
        Accept: 'application/json',
    }, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            Accept: 'application/json',
        },
    })
}
