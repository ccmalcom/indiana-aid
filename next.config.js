/** @type {import('next').NextConfig} */
module.exports = {
    experimental: {
        serverActions: {
            bodySizeLimit: '10mb',
        },
    },
    turbopack: {
        root: '/Users/chasemalcom/Documents/code/indiana-aid',
    },
}
