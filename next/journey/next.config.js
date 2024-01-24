const path = require('path');
const nextConfig = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    experimental: {
        swcPlugins: [["@swc-jotai/react-refresh", {}]],
    },
};

module.exports = nextConfig;
