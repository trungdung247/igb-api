module.exports = {
    urlDB: process.env.DB_URL,
    port: process.env.SERVER_PORT,
    local_client_app: process.env.LOCAL_CLIENT_APP,
    remote_client_app: process.env.REMOTE_CLIENT_APP,
    allowedDomains: (
        process.env.NODE_ENV === 'production' ? 
            [
                process.env.REMOTE_CLIENT_APP,
                process.env.REMOTE_SERVER_API
            ] 
        : 
            [
                process.env.LOCAL_CLIENT_APP,
                process.env.LOCAL_SERVER_API
            ]
    ),
    pathImage: (process.env.NODE_ENV === 'production' ? process.env.REMOTE_SERVER_API : process.env.LOCAL_SERVER_API),
    listLanguages: ["vi", "en"]
}