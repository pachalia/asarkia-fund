module.exports = {
    images: {
        domains: ['andreypachalia.ru'],
        unoptimized: true
    },
    async redirects () {
        return [
            {
                source: '/civil',
                destination: '/civil/1',
                permanent: true,
            },
            {
                source: '/culture',
                destination: '/culture/1',
                permanent: true,
            },
            {
                source: '/blog',
                destination: '/blog/1',
                permanent: true,
            },
            {
                source: '/mobile/civil',
                destination: '/mobile/civil/1',
                permanent: true,
            },
            {
                source: '/mobile/culture',
                destination: '/mobile/culture/1',
                permanent: true,
            },
            {
                source: '/mobile/blog',
                destination: '/mobile/blog/1',
                permanent: true,
            }
        ]
    }
}